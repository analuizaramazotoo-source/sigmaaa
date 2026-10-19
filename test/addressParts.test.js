import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAddress, streetKey } from '../src/services/addressParts.js';
test('Número do imóvel é reconhecido antes e depois da rua', () => {
  for (const address of ['123 Rua Aimorés', '123, Rua Aimorés', 'Rua Aimorés 123', 'Rua Aimorés, 123', 'Rua Aimorés nº 123']) assert.deepEqual(parseAddress(address), { street: 'Rua Aimorés', number: '123' });
  assert.equal(streetKey('R. Aimorés'), streetKey('Rua AIMORES'));
});
test('Nome numerado da rua e datas não viram números do imóvel', () => {
  assert.deepEqual(parseAddress('Rua 7'), { street: 'Rua 7', number: '' });
  assert.deepEqual(parseAddress('Rua 7 de Setembro, 123A'), { street: 'Rua 7 de Setembro', number: '123A' });
});
