// Fluxo no navegador com API interceptada; nenhum registro real é criado.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4ZkAAAAASUVORK5CYII=', 'base64');
const photo = name => ({ name, mimeType: 'image/png', buffer: image });
const user = { id_usuario: 1, nome_usuario: 'Teste', email_usuario: 'teste@example.com', tipo_usuario: 'gestao', status_usuario: 'ativo' };
async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.UI_BROWSER_CHANNEL || 'msedge' });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(u => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'teste-ui', usuario: u })), user);
  const created = [], uploads = [], errors = [];
  let failOnce = true;
  await context.route('**/api/**', async route => {
    const req = route.request(), url = new URL(req.url()), resource = url.pathname.replace(/^\/api/, '');
    let data = [];
    if (resource === '/categorias') data = [{ id_categoria: 1, nome_categoria: 'Descarte de resíduos' }, { id_categoria: 2, nome_categoria: 'Outros' }];
    if (resource === '/usuarios/me') data = user;
    if (resource === '/geocodificacao') {
      const q = url.searchParams.get('endereco');
      const address = q.includes('123') ? 'Rua Aimorés, 123' : 'Rua Aimorés';
      data = [{ lat: -21.933611, lng: -50.5125, address, label: 'Rua Aimorés, Tupã/SP', approximate: true, postcode: '17600-000' }];
    }
    if (resource === '/ocorrencias' && req.method() === 'POST') {
      data = { ...req.postDataJSON(), id_ocorrencia: 101 + created.length, protocolo_ocorrencia: `TESTE-${created.length + 1}` };
      created.push(data);
    }
    if (/\/ocorrencias\/\d+\/anexos$/.test(resource) && req.method() === 'POST') {
      const body = req.postDataJSON();
      if (body.nome_anexo === 'segunda.png' && failOnce) {
        failOnce = false;
        return route.fulfill({ status: 503, json: { sucesso: false, mensagem: 'Falha simulada no segundo anexo' } });
      }
      assert.match(body.conteudo, /^data:image\/png;base64,/);
      assert.deepEqual(Buffer.from(body.conteudo.split(',')[1], 'base64'), image);
      uploads.push({ path: resource, name: body.nome_anexo });
      data = { id_anexo: uploads.length };
    }
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', dialog => dialog.accept());
  try {
    for (const route of ['/relatar-problema', '/solicitar', '/denuncia', '/homeg']) {
      console.log('Testando autocomplete e fotos:', route);
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      if (route === '/homeg') await page.getByRole('button', { name: 'Novo Registro Interno' }).click();
      const address = page.getByRole('combobox', { name: /Endereço/ });
      await page.locator('.sigma-map-canvas').last().waitFor({ state: 'visible' });
      await address.fill('Aimo');
      await page.getByRole('option', { name: /Rua Aimorés/ }).waitFor();
      assert.equal(await page.getByText(/Local marcado:/).count(), 0);
      if (route === '/relatar-problema') {
        fs.mkdirSync('artifacts/endereco-fotos', { recursive: true });
        await page.screenshot({ path: 'artifacts/endereco-fotos/sugestoes.png', fullPage: true });
      }
      await page.getByRole('option', { name: /Rua Aimorés/ }).click();
      assert.equal(await address.inputValue(), 'Rua Aimorés');
      await page.getByText(/Local marcado:/).waitFor();
      await address.fill('Rua Aimorés, 123');
      await page.getByRole('option', { name: /Rua Aimorés/ }).waitFor();
      await address.press('ArrowDown'); await address.press('Enter');
      assert.equal(await address.inputValue(), 'Rua Aimorés, 123');
      await page.getByText(/Local marcado:/).waitFor();
      const files = page.getByLabel('Anexar imagens da ocorrência (opcional)');
      await files.setInputFiles(photo('primeira.png'));
      await page.getByRole('img', { name: 'Prévia de primeira.png' }).waitFor();
      assert.equal(await page.getByRole('img', { name: 'Prévia de primeira.png' }).evaluate(el => el.naturalWidth > 0), true);
      const thumbnail = await page.getByRole('img', { name: 'Prévia de primeira.png' }).boundingBox();
      assert.ok(thumbnail.width <= 80 && thumbnail.height <= 80, 'Prévia é uma miniatura pequena');
      await page.getByRole('button', { name: 'Abrir foto primeira.png' }).click();
      await page.getByRole('dialog', { name: 'Foto primeira.png' }).waitFor();
      await page.getByRole('img', { name: 'Foto ampliada: primeira.png' }).waitFor();
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('dialog', { name: 'Foto primeira.png' }).count(), 0);
      await page.getByRole('button', { name: 'Abrir foto primeira.png' }).click();
      await page.getByRole('button', { name: 'Fechar foto' }).click();
      assert.equal(await page.getByRole('dialog', { name: 'Foto primeira.png' }).count(), 0);
      await files.setInputFiles({ name: 'invalido.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF') });
      await page.getByText('Escolha imagens JPG ou PNG com até 5 MB cada.').waitFor();
      await files.setInputFiles(photo('temporaria.png'));
      await page.getByRole('button', { name: 'Remover imagem temporaria.png' }).click();
      if (route === '/relatar-problema') await files.setInputFiles(photo('segunda.png'));
      if (route === '/relatar-problema') await page.screenshot({ path: 'artifacts/endereco-fotos/fotos-e-mapa.png', fullPage: true });
      if (route === '/relatar-problema') {
        await page.getByLabel('Título do Relato *').fill('Teste com endereço e imagem');
        await page.getByLabel('Categoria do Problema *').selectOption('1');
        await page.getByLabel('Data da Ocorrência *').fill('2026-10-19');
      } else if (route === '/solicitar') {
        await page.getByLabel('Problema / Serviço *').fill('Serviço de teste');
        await page.getByLabel('Descrição Detalhada *').fill('Descrição do teste');
      } else if (route === '/denuncia') {
        await page.getByLabel('Tipo de Crime / Emergência *').selectOption('queimada_grave');
        await page.getByLabel('Descrição da Situação *').fill('Descrição do teste');
      } else await page.getByLabel('Título da Demanda').fill('Ocorrência de teste');
      const submit = page.getByRole('button', { name: route === '/denuncia' ? 'Enviar Denúncia Urgente' : route === '/homeg' ? 'Salvar ocorrência' : 'Enviar Relato', exact: true });
      const before = created.length;
      await submit.click();
      if (route === '/relatar-problema') {
        await page.getByText('Falha simulada no segundo anexo').waitFor();
        assert.equal(created.length, before + 1);
        assert.equal(await page.getByRole('img', { name: 'Prévia de primeira.png' }).count(), 0);
        await page.getByRole('button', { name: 'Fechar', exact: true }).click();
        await submit.click();
      }
      if (route === '/homeg') await page.getByText('Novo Registro de Ocorrência Interna', { exact: true }).waitFor({ state: 'hidden' });
      else if (route === '/denuncia') await page.getByText(/TESTE-3/).waitFor();
      else await page.waitForURL('**/status');
      assert.equal(created.length, before + 1, 'Uma única ocorrência é criada, inclusive ao tentar novamente');
      assert.equal(created.at(-1).latitude_ocorrencia, -21.933611);
      assert.equal(created.at(-1).longitude_ocorrencia, -50.5125);
      assert.equal(created.at(-1).logradouro_ocorrencia, 'Rua Aimorés, 123');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), true);
    }
    assert.equal(uploads.length, 5, 'Fotos enviadas uma vez, sem repetir a primeira ao tentar novamente');
    assert.equal(errors.length, 0);
    const result = { forms: 4, records: created.length, photos: uploads.length, mapClicks: 0, errors };
    fs.writeFileSync(path.resolve('artifacts/endereco-fotos/resultado.json'), JSON.stringify(result, null, 2));
    console.log(result);
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
