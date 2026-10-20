import { useEffect, useId, useRef, useState } from 'react';
import { api } from '../services/api';
import TupaMap from './TupaMap';
import { coordinatesInTupa } from '../services/mapCoordinates';
import { parseAddress, streetKey, normalizeAddress } from '../services/addressParts';
import './AddressMap.css';

export default function AddressMap({ address, onAddressChange, selectedLocation, onPick, label = 'Endereço em Tupã *', height = 280, showMap = true }) {
  const id = useId(), input = useRef(null), confirmed = useRef(null), generation = useRef(0), pick = useRef(onPick), updateAddress = useRef(onAddressChange), cache = useRef(new Map());
  const [search, setSearch] = useState({ address: '', status: 'idle', results: [] });
  const [expanded, setExpanded] = useState(false), [active, setActive] = useState(-1), [retry, setRetry] = useState(0);
  useEffect(() => { pick.current = onPick; updateAddress.current = onAddressChange; }, [onPick, onAddressChange]);
  useEffect(() => {
    const version = ++generation.current;
    if (confirmed.current === address) return;
    const controller = new AbortController();
    pick.current(null);
    const postal = address.trim().match(/^(\d{5})-?(\d{3})(?:\s*,\s*(\d+[a-z]?))?$/i);
    if (address.trim().length < 3 || (/^[\d-]+$/.test(address.trim()) && !postal)) return () => controller.abort();
    const timer = setTimeout(async () => {
      setSearch({ address, status: 'loading', results: [] });
      try {
        if (postal) {
          const data = await api(`/cep/${postal[1]}${postal[2]}`, { signal: controller.signal });
          if (controller.signal.aborted || generation.current !== version) return;
          updateAddress.current(`${data.street}${postal[3] ? ', ' + postal[3] : ''}`);
          setExpanded(true);
          return;
        }
        const key = normalizeAddress(address), cached = cache.current.get(key);
        const rows = cached || await api(`/geocodificacao?endereco=${encodeURIComponent(address.trim())}`, { signal: controller.signal });
        if (controller.signal.aborted || generation.current !== version) return;
        if (cache.current.size >= 50) cache.current.delete(cache.current.keys().next().value);
        if (!rows.some(row => row.lookupUnavailable)) cache.current.set(key, rows);
        const results = rows.filter(row => coordinatesInTupa(row));
        const parsed = parseAddress(address);
        const exact = results.filter(row => row.approximate === false && row.houseNumber && normalizeAddress(row.houseNumber) === normalizeAddress(parsed.number) && streetKey(row.street || parseAddress(row.address).street) === streetKey(parsed.street));
        if (parsed.number && exact.length === 1) {
          confirmed.current = address; pick.current(exact[0]);
          setSearch({ address, status: 'selected', results }); setExpanded(false);
        } else setSearch({ address, status: results.length ? 'found' : 'empty', results });
        setActive(-1);
      } catch (error) {
        if (!controller.signal.aborted && generation.current === version) setSearch({ address, status: 'error', results: [], message: error.message });
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [address, retry]);
  const incompletePostal = /^[\d-]+$/.test(address.trim()) && !/^\d{5}-?\d{3}$/.test(address.trim());
  const current = search.address === address ? search : { status: incompletePostal ? 'postal' : address.trim().length >= 3 ? 'waiting' : 'idle', results: [] };
  const open = expanded && current.results.length > 0;
  function choose(result) {
    generation.current++;
    const value = result.address || result.label;
    confirmed.current = value;
    onAddressChange(value); onPick(result);
    setSearch({ address: value, status: 'selected', results: current.results });
    input.current?.focus(); setExpanded(false); setActive(-1);
  }
  function change(event) {
    confirmed.current = null; generation.current++;
    onPick(null); onAddressChange(event.target.value); setExpanded(true); setActive(-1);
  }
  function keyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); setExpanded(false); return; }
    if (['ArrowDown', 'ArrowUp'].includes(event.key) && current.results.length) {
      event.preventDefault(); setExpanded(true);
      setActive(i => event.key === 'ArrowDown' ? (i + 1) % current.results.length : (i <= 0 ? current.results.length - 1 : i - 1));
    }
    if (event.key === 'Enter' && open) { event.preventDefault(); choose(current.results[active < 0 ? 0 : active]); }
  }
  return <div className="sigma-address-map">
    <div className="sigma-address-field" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}>
      <label htmlFor={id}>{label}</label>
      <input ref={input} id={id} type="text" required maxLength={220} value={address} onChange={change} onFocus={() => setExpanded(true)} onKeyDown={keyDown} placeholder="Digite a rua e o número ou um CEP de Tupã" autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open && active >= 0 ? `${id}-option-${active}` : undefined} aria-describedby={`${id}-status`} />
      {open && <div id={`${id}-options`} className="sigma-address-options" role="listbox" aria-label="Ruas sugeridas em Tupã">{current.results.map((result, i) => <button id={`${id}-option-${i}`} key={`${result.lat},${result.lng}`} type="button" role="option" tabIndex={-1} aria-selected={active === i} onMouseDown={event => event.preventDefault()} onClick={() => choose(result)}><strong>{result.label}</strong><span>{result.houseNumber ? `Número ${result.houseNumber} encontrado · ` : 'Trecho aproximado da rua · '}{result.postcode && `CEP ${result.postcode} · `}Tupã/SP</span></button>)}</div>}
    </div>
    <p id={`${id}-status`} className="sigma-address-status" role="status" aria-live="polite">
      {current.status === 'idle' && 'Digite pelo menos 3 letras ou um CEP com 8 dígitos. Escolha a rua sugerida, sem clicar no mapa.'}
      {current.status === 'postal' && 'Complete os 8 dígitos do CEP para preencher a rua.'}
      {['waiting', 'loading'].includes(current.status) && 'Buscando ruas de Tupã...'}
      {current.status === 'found' && (current.results.some(row => row.lookupUnavailable) ? 'Serviço de mapas indisponível. As sugestões salvas indicam somente trechos aproximados; o número ainda não foi confirmado.' : parseAddress(address).number && current.results.every(row => row.approximate) ? `O número ${parseAddress(address).number} não foi localizado na base. As sugestões abaixo indicam somente trechos aproximados da rua.` : 'Escolha uma rua na lista de sugestões abaixo do endereço.')}
      {current.status === 'selected' && (selectedLocation?.houseNumber && !selectedLocation.approximate ? `Número ${selectedLocation.houseNumber} localizado. O mapa foi atualizado para o endereço encontrado.` : 'Rua selecionada. A bolinha indica um trecho aproximado: o número exato não está disponível na base.')}
      {current.status === 'empty' && 'Nenhuma rua encontrada em Tupã. Confira o nome ou tente escrever mais letras.'}
      {current.status === 'error' && (current.message || 'Não foi possível buscar as ruas agora. Tente novamente em instantes.')}
    </p>
    {(['error', 'empty'].includes(current.status) || current.results.some(row => row.lookupUnavailable)) && <button className="sigma-address-retry" type="button" onClick={() => { confirmed.current = null; cache.current.delete(normalizeAddress(address)); setExpanded(true); setRetry(r => r + 1); }}>Tentar buscar novamente</button>}
    {showMap && <TupaMap selectedLocation={selectedLocation} height={height} />}
    <small className="sigma-address-credit">Endereços: <a href="https://photon.komoot.io/" target="_blank" rel="noreferrer">Photon</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>. CEP: <a href="https://viacep.com.br/" target="_blank" rel="noreferrer">ViaCEP</a>. Busca restrita a Tupã.</small>
  </div>;
}
