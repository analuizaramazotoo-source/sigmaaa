import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { coordinatesInTupa, TUPA_CENTER, TUPA_BOUNDARY } from '../services/mapCoordinates';
import './TupaMap.css';

const EMPTY = [];
export default function TupaMapView({ occurrences = EMPTY, selectedLocation = null, onPick, onOccurrenceClick, onOccurrenceDetails, onSelectionClear, focusSelectedOccurrence = false, height = 340 }) {
  const host = useRef(null), map = useRef(null), handlers = useRef({});
  const previousSelection = useRef(null);
  const [tileError, setTileError] = useState(false);
  const [locationError, setLocationError] = useState('');
  useEffect(() => { handlers.current = { onPick, onOccurrenceClick, onOccurrenceDetails, onSelectionClear }; }, [onPick, onOccurrenceClick, onOccurrenceDetails, onSelectionClear]);
  useEffect(() => {
    const instance = L.map(host.current, { scrollWheelZoom: false }).setView(TUPA_CENTER, 14);
    map.current = instance;
    const element = host.current;
    const closeSelection = event => {
      if (event.target.closest('.leaflet-popup-close-button')) handlers.current.onSelectionClear?.();
    };
    element.addEventListener('click', closeSelection, true);
    L.geoJSON(TUPA_BOUNDARY, { interactive: false, style: { color: '#059669', weight: 2, fillOpacity: 0.04 } }).addTo(instance);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
    }).addTo(instance);
    tiles.on('tileerror', () => setTileError(true));
    tiles.on('tileload', () => setTileError(false));
    instance.on('click', event => {
      if (!handlers.current.onPick) return;
      const point = { lat: Number(event.latlng.lat.toFixed(6)), lng: Number(event.latlng.lng.toFixed(6)) };
      if (!coordinatesInTupa(point)) { setLocationError('Selecione um ponto dentro do limite de Tupã/SP.'); return; }
      setLocationError(''); handlers.current.onPick(point);
    });
    const observer = new ResizeObserver(() => instance.invalidateSize());
    observer.observe(host.current);
    return () => { element.removeEventListener('click', closeSelection, true); observer.disconnect(); instance.remove(); map.current = null; };
  }, []);
  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const layer = L.layerGroup().addTo(instance);
    let selectedMarker = null;
    const selectedId = selectedLocation?.id_ocorrencia ?? selectedLocation?.id;
    for (const occurrence of occurrences) {
      const coordinates = coordinatesInTupa(occurrence);
      if (!coordinates) continue;
      const color = occurrence.cor || ({ resolvida: '#059669', em_andamento: '#f59e0b', arquivada: '#64748b' }[occurrence.status_ocorrencia] || '#dc2626');
      const marker = L.circleMarker(coordinates, { radius: 9, color: '#fff', weight: 2, fillColor: color, fillOpacity: 1 }).addTo(layer);
      const popup = document.createElement('div');
      for (const text of [occurrence.protocolo_ocorrencia, occurrence.titulo_ocorrencia || occurrence.titulo, occurrence.logradouro_ocorrencia, occurrence.status || occurrence.status_ocorrencia]) {
        if (!text) continue;
        const line = document.createElement('div'); line.textContent = text; popup.appendChild(line);
      }
      if (onOccurrenceDetails) {
        const details = document.createElement('button'); details.type = 'button'; details.textContent = 'Ver detalhes';
        details.className = 'sigma-map-popup-action';
        details.addEventListener('click', () => handlers.current.onOccurrenceDetails?.(occurrence));
        popup.appendChild(details);
      }
      marker.bindPopup(popup);
      if (focusSelectedOccurrence && selectedId != null && String(occurrence.id_ocorrencia ?? occurrence.id) === String(selectedId)) {
        selectedMarker = marker; marker.setStyle({ radius: 12, color: '#065f46', weight: 3 });
      }
      if (onOccurrenceClick) marker.on('click', () => handlers.current.onOccurrenceClick?.(occurrence));
    }
    const selected = coordinatesInTupa(selectedLocation);
    if (focusSelectedOccurrence && previousSelection.current && !selectedLocation) instance.setView(TUPA_CENTER, 14, { animate: false });
    previousSelection.current = selectedLocation;
    if (selected) {
      if (selectedMarker) {
        instance.setView(selected, Math.max(instance.getZoom(), 16), { animate: false });
        selectedMarker.openPopup();
      } else {
        L.circleMarker(selected, { radius: 10, color: '#065f46', weight: 3, fillColor: '#34d399', fillOpacity: 1 }).bindTooltip('Local selecionado').addTo(layer);
        if (selectedLocation?.houseNumber && selectedLocation.approximate === false) instance.setView(selected, 18);
        else instance.panTo(selected);
      }
    }
    return () => { layer.remove(); };
  }, [occurrences, selectedLocation, onOccurrenceClick, onOccurrenceDetails, focusSelectedOccurrence]);
  const missing = occurrences.filter(occurrence => !coordinatesInTupa(occurrence)).length;
  const selected = coordinatesInTupa(selectedLocation);
  return (
    <div className="sigma-map">
      <div className="sigma-map-canvas" ref={host} style={{ height }} aria-label="Mapa de ruas de Tupã, São Paulo" />
      <div className="sigma-map-info">
        <span>{selected ? `Local marcado: ${selected[0].toFixed(6)}, ${selected[1].toFixed(6)}` : onPick ? 'Clique no mapa para marcar o local da ocorrência.' : `${occurrences.length - missing} ocorrência(s) no mapa de Tupã.`}</span>
        <button type="button" onClick={() => { handlers.current.onSelectionClear?.(); map.current?.setView(TUPA_CENTER, 14); }}>Centralizar Tupã</button>
        {onPick && selected && <button type="button" onClick={() => onPick(null)}>Limpar ponto</button>}
      </div>
      {missing > 0 && <p className="sigma-map-note">{missing} ocorrência(s) precisam de localização válida em Tupã. Corrija em Gestão → Geoprocessamento.</p>}
      {locationError && <p className="sigma-map-note" role="alert">{locationError}</p>}
      {tileError && <p className="sigma-map-note" role="status">Não foi possível carregar as ruas. Confira a conexão com a internet.</p>}
    </div>
  );
}
