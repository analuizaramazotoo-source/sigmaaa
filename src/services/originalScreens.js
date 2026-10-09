import { useEffect, useRef, useState } from 'react';
import { api, getSession, logout, setSession } from './api';
import { coordinatesInTupa } from './mapCoordinates';
export { api, getSession, logout, setSession };
export function refreshScreens() { window.dispatchEvent(new Event('sigma:refresh')); }
export function reportError(error) { window.dispatchEvent(new CustomEvent('sigma:error', { detail: error.message || String(error) })); }
export async function perform(action) { try { return await action(); } catch (error) { reportError(error); return null; } }
export function useCollection(path, mapper = value => value) {
  const [items, setItems] = useState([]);
  const mapperRef = useRef(mapper);
  useEffect(() => { mapperRef.current = mapper; });
  useEffect(() => {
    if (!path) return;
    let active = true, reported = false;
    const read = async () => {
      try { const rows = await api(path); if (active) { setItems(rows.map(mapperRef.current)); reported = false; } }
      catch (error) { if (active && !reported) { reportError(error); reported = true; } }
    };
    read(); const timer = setInterval(read, 15000);
    window.addEventListener('focus', read); window.addEventListener('sigma:refresh', read);
    return () => { active = false; clearInterval(timer); window.removeEventListener('focus', read); window.removeEventListener('sigma:refresh', read); };
  }, [path]);
  return [items, setItems];
}
export const userName = () => getSession()?.usuario?.nome_usuario || '';
export const statusLabels = { aberta: 'Pendente triagem', em_analise: 'Em análise', em_andamento: 'Em campo', resolvida: 'Fiscalizado', arquivada: 'Arquivado' };
export function occurrenceView(o) {
  const urgent = o.titulo_ocorrencia.startsWith('[URGENTE]');
  const type = /queimad|fumaça/i.test(o.nome_categoria || o.titulo_ocorrencia) ? 'queimada' : /água|hídric|esgoto/i.test(o.nome_categoria || '') ? 'agua' : /sonor/i.test(o.nome_categoria || '') ? 'som' : /desmat|poda/i.test(o.nome_categoria || '') ? 'desmatamento' : 'descarte';
  const stateType = o.status_ocorrencia === 'resolvida' ? 'resolvida' : o.status_ocorrencia === 'em_andamento' ? 'andamento' : o.status_ocorrencia === 'arquivada' ? 'naoAtendida' : 'analise';
  const color = stateType === 'resolvida' ? 'verde' : stateType === 'andamento' ? 'amarelo' : 'vermelho';
  const hasCoordinates = Boolean(coordinatesInTupa(o));
  const date = o.data_ocorrencia ? new Date(o.data_ocorrencia).toLocaleDateString('pt-BR') : '';
  return { ...o, id: o.id_ocorrencia, title: o.titulo_ocorrencia, titulo: o.titulo_ocorrencia, address: o.logradouro_ocorrencia || '', endereco: o.logradouro_ocorrencia || '', local: o.logradouro_ocorrencia || '', descricao: o.descricao_ocorrencia || '', date, data: date, status: statusLabels[o.status_ocorrencia] || o.status_ocorrencia, statusType: stateType, corStatus: color, prioridade: urgent ? 'Alta' : 'Média', urgente: urgent, tipo: type, hasCoordinates, cor: color === 'verde' ? '#10b981' : color === 'amarelo' ? '#f59e0b' : '#ef4444' };
}
export function canonicalStatus(label) {
  if (/fiscalizado|conclu|visitado|resolvid/i.test(label)) return 'resolvida';
  if (/campo|andamento/i.test(label)) return 'em_andamento';
  if (/arquiv/i.test(label)) return 'arquivada';
  if (/análise|analise/i.test(label)) return 'em_analise';
  return 'aberta';
}
export async function categoryId(key) {
  const categories = await api('/categorias');
  const pattern = { lixo: /lixo|entulho|resíduo/i, descarte: /lixo|entulho|resíduo/i, esgoto: /esgoto|vazamento/i, desmatamento: /desmatamento|poda/i, queimada: /queimada/i, agua: /hídric|água/i, som: /sonora/i, queimada_grave: /queimada/i, vazamento_quimico: /hídric|água/i, descarte_perigoso: /lixo|entulho|resíduo/i, desmatamento_ativo: /desmatamento/i }[key] || /outros/i;
  const category = categories.find(c => pattern.test(c.nome_categoria)) || categories.find(c => /outros/i.test(c.nome_categoria));
  if (!category) throw new Error('Cadastre uma categoria correspondente no back-end.');
  return category.id_categoria;
}
export async function uploadFiles(occurrenceId, files) {
  for (const file of Array.from(files || [])) {
    if (file.size > 5 * 1024 * 1024 || !['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) throw new Error('Anexe JPG, PNG ou PDF até 5 MB.');
    const content = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
    await api(`/ocorrencias/${occurrenceId}/anexos`, { method: 'POST', body: { nome_anexo: file.name, conteudo: content } });
  }
}
export async function saveProfile(body) {
  const usuario = await api('/usuarios/me', { method: 'PATCH', body });
  setSession({ ...getSession(), usuario }); return usuario;
}
export function downloadText(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
