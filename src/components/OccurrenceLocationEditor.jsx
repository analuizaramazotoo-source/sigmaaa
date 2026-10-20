import { useState } from 'react';
import AddressMap from './AddressMap';
import { api, refreshScreens } from '../services/originalScreens';
import { coordinateBody, coordinatesInTupa } from '../services/mapCoordinates';
import './OccurrenceLocationEditor.css';

export default function OccurrenceLocationEditor({ occurrence, onSaved }) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(occurrence.logradouro_ocorrencia || '');
  const [location, setLocation] = useState(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  if (!open) return <div className="sigma-location-editor">
    {!coordinatesInTupa(occurrence) && <p>Esta ocorrência precisa de uma localização válida em Tupã antes de ser encaminhada.</p>}
    <button type="button" onClick={() => setOpen(true)}>Corrigir endereço / localização</button>
  </div>;
  async function save(event) {
    event.preventDefault(); if (busy) return;
    if (!coordinatesInTupa(location)) { setError('Escolha um endereço de Tupã na lista de sugestões.'); return; }
    setBusy(true); setError('');
    try {
      const row = await api(`/ocorrencias/${occurrence.id_ocorrencia}`, { method: 'PATCH', body: { logradouro_ocorrencia: address, ...coordinateBody(location) } });
      onSaved(row); refreshScreens(); setOpen(false);
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  return <form className="sigma-location-editor" onSubmit={save}>
    <fieldset disabled={busy} style={{ border: 0, padding: 0, minWidth: 0 }}>
      <legend>Corrigir localização da ocorrência</legend>
      <AddressMap address={address} onAddressChange={setAddress} selectedLocation={location} onPick={setLocation} label="Novo endereço em Tupã *" height={240} />
      {error && <p role="alert">{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
        <button type="submit" disabled={busy || !location}>{busy ? 'Salvando...' : 'Salvar localização'}</button>
        <button type="button" onClick={() => setOpen(false)}>Cancelar correção</button>
      </div>
    </fieldset>
  </form>;
}
