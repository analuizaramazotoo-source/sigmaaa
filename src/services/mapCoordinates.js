// Centro urbano de Tupã/SP, conforme a localização publicada pela prefeitura.
import boundary from '../geography/tupa.json' with { type: 'json' };
import { contains } from '../geography/contains.js';
export { boundary as TUPA_BOUNDARY };
export const TUPA_CENTER = [-21.933611, -50.5125];
export function coordinatesInTupa(value) {
  const point = coordinatesOf(value);
  return point && contains(boundary, point[0], point[1]) ? point : null;
}
export function coordinatesOf(value) {
  const lat = value?.lat ?? value?.latitude_ocorrencia;
  const lng = value?.lng ?? value?.longitude_ocorrencia;
  if (!['string', 'number'].includes(typeof lat) || !['string', 'number'].includes(typeof lng)) return null;
  if (lat == null || lng == null || String(lat).trim() === '' || String(lng).trim() === '') return null;
  const latitude = Number(lat), longitude = Number(lng);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return null;
  return [latitude, longitude];
}
export function coordinateBody(value) {
  const coordinates = coordinatesInTupa(value);
  if (!coordinates) throw new Error('Marque o local da ocorrência dentro do município de Tupã/SP.');
  return { latitude_ocorrencia: coordinates[0], longitude_ocorrencia: coordinates[1] };
}
