import { api } from './api';
import { buildPdf } from './pdfDocument';

function save(name, bytes, type) {
  const url = URL.createObjectURL(new Blob([bytes], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function imageForPdf(attachment) {
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error(`Não foi possível abrir a imagem ${attachment.nome_anexo}.`));
    image.src = attachment.conteudo_anexo;
  });
  const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Não foi possível preparar as imagens do PDF.');
  context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const binary = atob(canvas.toDataURL('image/jpeg', 0.92).split(',')[1]);
  return { name: attachment.nome_anexo, width: canvas.width, height: canvas.height, data: Uint8Array.from(binary, char => char.charCodeAt(0)) };
}

export async function downloadReport(report, format = 'pdf') {
  try { return await createDownload(report, format); }
  catch (error) {
    window.dispatchEvent(new CustomEvent('sigma:error', { detail: error.message || 'Não foi possível baixar o PDF.' }));
    return false;
  }
}

async function createDownload(report, format) {
  const fields = [['Título', report.titulo], ['Data', report.data_criacao], ['Ocorrência', report.id_ocorrencia], ['Tipo', report.tipo], ['Observações', report.observacoes], ['Parecer', report.parecer]];
  if (format === 'excel') {
    const csv = '\ufeffCampo;Valor\r\n' + fields.map(([key, value]) => [key, value ?? ''].map(v => '"' + String(v).replaceAll('"', '""') + '"').join(';')).join('\r\n');
    save(`relatorio-${report.id_relatorio}.csv`, csv, 'text/csv;charset=utf-8'); return true;
  }
  const images = [], attachments = [];
  if (report.id_ocorrencia) {
    const records = await api(`/ocorrencias/${report.id_ocorrencia}/anexos`);
    for (const record of records) {
      attachments.push(record.nome_anexo || `Anexo ${record.id_anexo}`);
      if (!['image/png', 'image/jpeg'].includes(record.tipo_anexo)) continue;
      const attachment = await api(`/anexos/${record.id_anexo}`);
      if (attachment.conteudo_anexo) images.push(await imageForPdf(attachment));
      else attachments[attachments.length - 1] += ' (arquivo original indisponível)';
    }
  }
  const occurrence = report.id_ocorrencia ? await api(`/ocorrencias/${report.id_ocorrencia}`) : null;
  const date = report.data_criacao ? new Date(report.data_criacao).toLocaleString('pt-BR') : 'Não informado';
  const isAuto = report.documento === 'auto', isLaw = report.tipo === 'Legislação';
  const sections = [
    ...(isAuto ? [{ title: 'Identificação do autuado', text: `${report.autuado_nome || 'Não informado'}\nDocumento: ${report.autuado_documento || 'Não informado'}\nLocal: ${report.local_infracao || occurrence?.logradouro_ocorrencia || 'Não informado'}` }] : []),
    { title: isAuto ? 'Descrição da ocorrência / infração' : isLaw ? 'Resumo de consulta' : 'Observações da vistoria', text: report.observacoes },
    { title: isAuto ? 'Fundamentação legal' : isLaw ? 'Fonte oficial' : 'Parecer técnico', text: report.parecer },
    ...(isAuto ? [{ title: 'Valor e situação', text: `Multa informada: ${Number(report.valor_multa || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\nSituação: ${report.status || 'Não informado'}` }] : []),
    ...(attachments.length ? [{ title: 'Anexos vinculados à ocorrência', text: attachments.join('\n') }] : [])
  ];
  const metadata = isLaw ? [['Registro', report.id_relatorio], ['Conteúdo', 'Resumo com fonte oficial']] : [['Documento', `${isAuto ? 'AUTO' : 'REL'}-${report.id_relatorio}`], ['Data do registro', date], ['Protocolo', occurrence?.protocolo_ocorrencia || report.id_ocorrencia || 'Não informado'], ['Tipo', report.tipo || (isAuto ? 'Auto / Notificação' : 'Relatório técnico')]];
  const name = `${isAuto ? 'auto' : 'relatorio'}-${report.id_relatorio}.pdf`;
  save(name, buildPdf({ title: report.titulo, kind: isAuto ? 'AUTO / NOTIFICAÇÃO' : isLaw ? 'LEGISLAÇÃO AMBIENTAL' : 'RELATÓRIO TÉCNICO', metadata, sections }, images), 'application/pdf');
  return true;
}
