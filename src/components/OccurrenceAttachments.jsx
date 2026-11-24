import { useEffect, useRef, useState } from 'react';
import { api, useCollection } from '../services/originalScreens';
import './OccurrenceAttachments.css';

export default function OccurrenceAttachments({ occurrenceId }) {
  const [files, , query] = useCollection(`/ocorrencias/${occurrenceId}/anexos`);
  const [preview, setPreview] = useState(null);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null), trigger = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!preview) return;
    const close = event => { if (event.key === 'Escape') { setPreview(null); trigger.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [preview]);
  async function open(file, event) {
    if (opening) return;
    trigger.current = event.currentTarget;
    const controller = new AbortController(); request.current = controller;
    setOpening(true); setError('');
    try {
      const record = await api(`/anexos/${file.id_anexo}`, { signal: controller.signal });
      if (!/^data:(image\/(png|jpeg)|application\/pdf);base64,/.test(record.conteudo_anexo || '')) throw new Error('O arquivo original está indisponível.');
      if (!controller.signal.aborted) setPreview(record);
    } catch (failure) { if (!controller.signal.aborted) setError(failure.message); }
    finally { if (!controller.signal.aborted) setOpening(false); }
  }
  function close() { setPreview(null); trigger.current?.focus(); }
  return <section className="sigma-occurrence-attachments" aria-label="Anexos da ocorrência">
    <strong>Imagens e documentos da ocorrência</strong>
    {query.loading ? <p>Carregando anexos...</p> : query.error ? <p role="alert">Não foi possível carregar os anexos.</p> : !files.length ? <p>Nenhum anexo enviado.</p> : <ul>{files.map(file => <li key={file.id_anexo}><button type="button" disabled={opening} onClick={event => open(file, event)}>Abrir {file.nome_anexo || `anexo ${file.id_anexo}`}</button></li>)}</ul>}
    {opening && <p role="status">Abrindo arquivo...</p>}
    {error && <p role="alert">{error}</p>}
    {preview && <div className="sigma-occurrence-file-overlay" onClick={close}>
      <div role="dialog" aria-modal="true" aria-label={preview.nome_anexo} className="sigma-occurrence-file-dialog" onClick={event => event.stopPropagation()}>
        <button type="button" autoFocus onClick={close}>Fechar arquivo</button>
        <p>{preview.nome_anexo}</p>
        {preview.tipo_anexo?.startsWith('image/') ? <img src={preview.conteudo_anexo} alt={preview.nome_anexo} /> : <a href={preview.conteudo_anexo} download={preview.nome_anexo}>Baixar PDF</a>}
      </div>
    </div>}
  </section>;
}
