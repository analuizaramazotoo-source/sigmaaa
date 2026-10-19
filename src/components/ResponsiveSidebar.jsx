import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import './ResponsiveSidebar.css';

const query = '(max-width: 1024px)';
const subscribe = callback => { const media = window.matchMedia(query); media.addEventListener('change', callback); return () => media.removeEventListener('change', callback); };
const getMobile = () => window.matchMedia(query).matches;
export default function ResponsiveSidebar({ children, className = '', style, alwaysCollapsed = false }) {
  const smallScreen = useSyncExternalStore(subscribe, getMobile, () => false);
  const mobile = smallScreen || alwaysCollapsed;
  const [open, setOpen] = useState(false);
  const id = useId(), panel = useRef(null), trigger = useRef(null);
  useEffect(() => {
    const media = window.matchMedia(query), close = () => setOpen(false);
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  useEffect(() => {
    if (!mobile || !open) return;
    const root = document.getElementById('root'), previousInert = root.inert, overflow = document.body.style.overflow, button = trigger.current;
    root.inert = true; document.body.style.overflow = 'hidden';
    const focusable = () => [...panel.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"]')].filter(el => el.getClientRects().length);
    focusable()[0]?.focus();
    const keydown = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const list = focusable(), first = list[0], last = list.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { root.inert = previousInert; document.body.style.overflow = overflow; document.removeEventListener('keydown', keydown); button?.focus(); };
  }, [mobile, open]);
  const aside = <aside id={id} ref={panel} className={`${className} sigma-sidebar ${mobile ? 'sigma-sidebar-mobile' : ''}`} style={style} hidden={mobile && !open} role={mobile ? 'dialog' : undefined} aria-modal={mobile && open ? true : undefined} aria-label="Menu lateral" onClick={event => { if (mobile && event.target.closest('a[href]')) setOpen(false); }}>
    {mobile && <div className="sigma-sidebar-heading"><strong>Menu</strong><button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu"><X size={22} /></button></div>}
    {children}
  </aside>;
  if (!mobile) return aside;
  return <>
    <div className="sigma-menu-bar"><button ref={trigger} type="button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open} aria-controls={id}><Menu size={24} /></button></div>
    {createPortal(<>{open && <button type="button" tabIndex={-1} className="sigma-sidebar-backdrop" onClick={() => setOpen(false)} aria-label="Fechar menu lateral" />}{aside}</>, document.body)}
  </>;
}
