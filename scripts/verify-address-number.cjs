// Usa coordenadas fictícias/interceptadas para testar estados e concorrência da interface.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const street = { lat: -21.933611, lng: -50.5125, label: 'Rua Aimorés, Tupã/SP', street: 'Rua Aimorés', address: 'Rua Aimorés', approximate: true, houseNumber: null };
async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.UI_BROWSER_CHANNEL || 'msedge' });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'teste', usuario: { id_usuario: 1, nome_usuario: 'Teste', tipo_usuario: 'gestao' } })));
  await context.route('**/api/**', async route => {
    const url = new URL(route.request().url()); let data = [];
    if (url.pathname.endsWith('/cep/17602664')) data = { cep: '17602-664', street: 'Rua Ferroviário José Jardim', city: 'Tupã', state: 'SP' };
    if (url.pathname.endsWith('/cep/01001000')) return route.fulfill({ status: 400, json: { sucesso: false, mensagem: 'Informe um CEP do município de Tupã/SP.' } });
    if (url.pathname.endsWith('/geocodificacao')) {
      const q = url.searchParams.get('endereco'), number = q.includes('124') ? '124' : q.includes('123') ? '123' : q.includes('999') ? '999' : '';
      if (number === '123') await new Promise(resolve => setTimeout(resolve, 1000));
      data = number && number !== '999' ? [{ ...street, lat: number === '123' ? -21.934 : -21.9341, lng: number === '123' ? -50.513 : -50.5131, label: `Rua Aimorés, ${number}, Tupã/SP`, address: `Rua Aimorés, ${number}`, houseNumber: number, requestedNumber: number, approximate: false }] : [{ ...street, requestedNumber: number, address: number ? `Rua Aimorés, ${number}` : street.address }];
      if (q.includes('Ferroviário')) data = [{ ...street, street: 'Rua Ferroviário José Jardim', address: 'Rua Ferroviário José Jardim', label: 'Rua Ferroviário José Jardim, Tupã/SP' }];
    }
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  const page = await context.newPage(), errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const path of ['/relatar-problema', '/solicitar', '/denuncia', '/homeg']) {
      await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      if (path === '/homeg') await page.getByRole('button', { name: 'Novo Registro Interno' }).click();
      const input = page.getByRole('combobox', { name: /Endereço/ });
      await input.fill('Aimo');
      await page.getByRole('option', { name: /Rua Aimorés/ }).click();
      await page.getByText('Local marcado: -21.933611, -50.512500').waitFor();
      // Digitar o número deve mover o ponto sem escolher outra sugestão ou clicar no mapa.
      await input.fill('123 Rua Aimorés');
      await page.getByText('Número 123 localizado. O mapa foi atualizado para o endereço encontrado.').waitFor();
      await page.getByText('Local marcado: -21.934000, -50.513000').waitFor();
      await input.fill('Rua Aimorés, 124');
      await page.getByText('Número 124 localizado. O mapa foi atualizado para o endereço encontrado.').waitFor();
      await page.getByText('Local marcado: -21.934100, -50.513100').waitFor();
      // A resposta lenta do número anterior não pode recolocar o ponto antigo.
      await input.fill('123 Rua Aimorés'); await page.waitForTimeout(750);
      await input.fill('124 Rua Aimorés');
      await page.getByText('Local marcado: -21.934100, -50.513100').waitFor();
      await page.waitForTimeout(1100);
      assert.equal(await page.getByText('Local marcado: -21.934000, -50.513000').count(), 0);
      await input.fill('Rua Aimorés, 999');
      await page.getByText(/O número 999 não foi localizado na base/).waitFor();
      assert.equal(await page.getByText(/Local marcado:/).count(), 0, 'Sem imóvel encontrado, não apresenta um ponto exato');
      assert.equal(await page.locator('.sigma-map-canvas').last().isVisible(), true);
      await input.fill('17602');
      await page.getByText('Complete os 8 dígitos do CEP para preencher a rua.').waitFor();
      await input.fill('17602-664');
      await page.waitForFunction(() => document.querySelector('[role="combobox"]').value === 'Rua Ferroviário José Jardim');
      await page.getByRole('option', { name: /Rua Ferroviário José Jardim/ }).click();
      await page.getByText('Local marcado: -21.933611, -50.512500').waitFor();
      await input.fill('01001000');
      await page.getByText('Informe um CEP do município de Tupã/SP.').waitFor();
      assert.equal(await page.getByText(/Local marcado:/).count(), 0);
      console.log('Número/rua, resposta antiga, CEP e restrição a Tupã:', path, 'OK');
    }
    assert.equal(errors.length, 0); console.log({ forms: 4, mapClicks: 0, numberSelectionClicks: 0, errors });
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
