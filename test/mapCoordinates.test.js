import test from 'node:test';
import assert from 'node:assert/strict';
import { coordinatesOf, coordinatesInTupa, coordinateBody, TUPA_CENTER } from '../src/services/mapCoordinates.js';
test('Coordenadas do banco e do clique produzem o mesmo ponto', () => {
  const location = { lat: TUPA_CENTER[0], lng: TUPA_CENTER[1] };
  const body = coordinateBody(location);
  assert.deepEqual(coordinatesOf(body), TUPA_CENTER);
  assert.deepEqual(coordinatesOf({ latitude_ocorrencia: String(body.latitude_ocorrencia), longitude_ocorrencia: String(body.longitude_ocorrencia) }), TUPA_CENTER);
});
test('Localização ausente, incompleta ou inválida não vira marcador', () => {
  for (const value of [null, {}, { lat: '', lng: '' }, { lat: ' ', lng: 0 }, { lat: 10 }, { lat: 91, lng: 0 }, { lat: 0, lng: 181 }, { lat: 'abc', lng: 0 }, { lat: true, lng: false }]) {
    assert.equal(coordinatesOf(value), null); assert.throws(() => coordinateBody(value), /Tupã/);
  }
  assert.deepEqual(coordinatesOf({ lat: 0, lng: 0 }), [0, 0]);
});
test('Aceita Tupã e rejeita outros municípios, inclusive dentro da caixa do mapa', () => {
  for (const point of [[-21.933611, -50.5125], [-22, -50.6]]) assert.deepEqual(coordinatesInTupa({ lat: point[0], lng: point[1] }), point);
  for (const point of [[0, 0], [-22.217, -49.95], [-21.921, -50.735], [-21.81, -50.7]]) {
    const value = { lat: point[0], lng: point[1] };
    assert.equal(coordinatesInTupa(value), null); assert.throws(() => coordinateBody(value), /Tupã/);
  }
});
