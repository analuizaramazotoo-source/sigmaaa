function save(name, bytes, type) {
  const url = URL.createObjectURL(new Blob([bytes], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function downloadReport(report, format = 'pdf') {
  const fields = [['Título', report.titulo], ['Data', report.data_criacao], ['Ocorrência', report.id_ocorrencia], ['Tipo', report.tipo], ['Observações', report.observacoes], ['Parecer', report.parecer]];
  if (format === 'excel') {
    const csv = '\ufeffCampo;Valor\r\n' + fields.map(([key, value]) => [key, value ?? ''].map(v => '"' + String(v).replaceAll('"', '""') + '"').join(';')).join('\r\n');
    save(`relatorio-${report.id_relatorio}.csv`, csv, 'text/csv;charset=utf-8'); return;
  }
  const text = fields.map(([key, value]) => `${key}: ${value ?? ''}`).join('\n\n');
  const lines = text.split(/\r?\n/).flatMap(line => line.match(/.{1,86}/g) || ['']);
  const pages = []; for (let i = 0; i < lines.length; i += 48) pages.push(lines.slice(i, i + 48));
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', `<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${4 + 2 * i} 0 R`).join(' ')}] >>`, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'];
  pages.forEach((page, index) => {
    const stream = 'BT /F1 10 Tf 14 TL 45 790 Td\n' + page.map(line => `(${line.replace(/[\u0100-\uffff]/g, '?').replace(/([\\()])/g, '\\$1')}) Tj T*`).join('\n') + '\nET';
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${5 + 2 * index} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });
  let pdf = '%PDF-1.4\n', offsets = [0];
  objects.forEach((object, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n` + offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('') + `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  save(`relatorio-${report.id_relatorio}.pdf`, Uint8Array.from(pdf, char => char.charCodeAt(0) & 255), 'application/pdf');
}
