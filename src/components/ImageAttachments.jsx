import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FileText, X } from 'lucide-react';
import './ImageAttachments.css';

function Preview({ file, enlarged = false }) {
  const image = useRef(null);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    image.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return <img ref={image} alt={enlarged ? `Foto ampliada: ${file.name}` : `Prévia de ${file.name}`} />;
}
function PhotoDialog({ file, onClose }) {
  const dialog = useRef(null);
  useEffect(() => { dialog.current.showModal(); }, []);
  return createPortal(<dialog ref={dialog} className="sigma-photo-dialog" aria-label={`Foto ${file.name}`} onCancel={onClose} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className="sigma-photo-dialog-content"><header><strong>{file.name}</strong><button type="button" onClick={onClose} aria-label="Fechar foto"><X size={22} /></button></header><Preview file={file} enlarged /></div>
  </dialog>, document.body);
}
function PdfPreview({ file }) {
  const link = useRef(null);
  useEffect(() => {
    const url = URL.createObjectURL(file); link.current.href = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return <a ref={link} className="sigma-image-thumb sigma-file-pdf" target="_blank" rel="noopener noreferrer" aria-label={`Abrir PDF ${file.name}`}><FileText size={28} /> PDF</a>;
}
export default function ImageAttachments({ files, onChange, disabled = false, allowDocuments = false }) {
  const id = useId(), [error, setError] = useState('');
  const input = useRef(null);
  const [opened, setOpened] = useState(null);
  function select(event) {
    const incoming = Array.from(event.target.files || []);
    event.target.value = '';
    add(incoming);
  }
  function add(incoming) {
    if (disabled) return;
    const types = allowDocuments ? ['image/jpeg', 'image/png', 'application/pdf'] : ['image/jpeg', 'image/png'];
    if (incoming.some(file => !types.includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setError(allowDocuments ? 'Escolha arquivos JPG, PNG ou PDF com até 5 MB cada.' : 'Escolha imagens JPG ou PNG com até 5 MB cada.'); return;
    }
    setError('');
    const combined = [...files];
    for (const file of incoming) if (!combined.some(f => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)) combined.push(file);
    onChange(combined);
  }
  return <section className={`sigma-image-attachments${allowDocuments ? ' sigma-document-attachments' : ''}`} aria-label={allowDocuments ? 'Anexos do documento' : 'Fotos da ocorrência'}>
    <input ref={input} aria-label={allowDocuments ? 'Anexar imagens' : 'Anexar imagens da ocorrência (opcional)'} hidden id={id} type="file" accept={allowDocuments ? 'image/jpeg,image/png,application/pdf' : 'image/jpeg,image/png'} multiple disabled={disabled} onChange={select} />
    <button type="button" className="sigma-file-dropzone" disabled={disabled} onClick={() => input.current?.click()} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); add(Array.from(event.dataTransfer.files || [])); }}>Escolher arquivos</button>
    {error && <p role="alert" className="sigma-image-error">{error}</p>}
    {files.length > 0 && <ul>{files.map((file, i) => <li key={`${file.name}-${file.size}-${file.lastModified}`}>{file.type === 'application/pdf' ? <PdfPreview file={file} /> : <button className="sigma-image-thumb" type="button" aria-label={`Abrir foto ${file.name}`} onClick={() => setOpened(file)}><Preview file={file} /></button>}<span>{file.name}</span><button className="sigma-image-remove" type="button" disabled={disabled} aria-label={`Remover ${allowDocuments ? 'arquivo' : 'imagem'} ${file.name}`} onClick={() => onChange(files.filter((_, index) => index !== i))}><X size={16} /> Remover</button></li>)}</ul>}
    {opened && <PhotoDialog file={opened} onClose={() => setOpened(null)} />}
  </section>;
}
