import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ImagePlus, X } from 'lucide-react';
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
export default function ImageAttachments({ files, onChange, disabled = false }) {
  const id = useId(), [error, setError] = useState('');
  const [opened, setOpened] = useState(null);
  function select(event) {
    const incoming = Array.from(event.target.files || []);
    event.target.value = '';
    if (incoming.some(file => !['image/jpeg', 'image/png'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setError('Escolha imagens JPG ou PNG com até 5 MB cada.'); return;
    }
    setError('');
    const combined = [...files];
    for (const file of incoming) if (!combined.some(f => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)) combined.push(file);
    onChange(combined);
  }
  return <section className="sigma-image-attachments" aria-label="Fotos da ocorrência">
    <label htmlFor={id}><ImagePlus size={20} /> Anexar imagens da ocorrência (opcional)</label>
    <p id={`${id}-help`}>Escolha fotos da galeria ou tire uma foto pelo celular. JPG ou PNG, até 5 MB por imagem.</p>
    <input id={id} type="file" accept="image/jpeg,image/png" multiple disabled={disabled} onChange={select} aria-describedby={`${id}-help`} />
    {error && <p role="alert" className="sigma-image-error">{error}</p>}
    {files.length > 0 && <ul>{files.map((file, i) => <li key={`${file.name}-${file.size}-${file.lastModified}`}><button className="sigma-image-thumb" type="button" aria-label={`Abrir foto ${file.name}`} onClick={() => setOpened(file)}><Preview file={file} /></button><span>{file.name}</span><button className="sigma-image-remove" type="button" disabled={disabled} aria-label={`Remover imagem ${file.name}`} onClick={() => onChange(files.filter((_, index) => index !== i))}><X size={16} /> Remover</button></li>)}</ul>}
    {opened && <PhotoDialog file={opened} onClose={() => setOpened(null)} />}
  </section>;
}
