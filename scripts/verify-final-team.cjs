// Exercita as telas com API simulada; não escreve no banco real.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const photo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4ZkAAAAASUVORK5CYII=';
async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext();
    await context.addInitScript(() => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'teste', usuario: { id_usuario: 75, nome_usuario: 'Projeto TCC – Equipe', tipo_usuario: 'equipe' } })));
    const original = { id_ocorrencia: 101, titulo_ocorrencia: 'Vistoria atribuída ao grupo', nome_categoria: 'Resíduos', protocolo_ocorrencia: 'TESTE-FINAL', status_ocorrencia: 'em_andamento', logradouro_ocorrencia: 'Rua Aimorés, 123', latitude_ocorrencia: -21.933611, longitude_ocorrencia: -50.5125 };
    let records = [{ ...original }], patches = 0;
    await context.route('**/api/**', async route => {
      const req = route.request(), path = new URL(req.url()).pathname.replace(/^\/api/, '');
      let data = [];
      if (path === '/ocorrencias') data = records;
      if (path === '/ocorrencias/101' && req.method() === 'PATCH') { patches++; Object.assign(records[0], req.postDataJSON()); data = records[0]; }
      if (path === '/ocorrencias/101/anexos') data = [{ id_anexo: 201, nome_anexo: 'foto-cidadao.png', tipo_anexo: 'image/png' }];
      if (path === '/anexos/201') data = { nome_anexo: 'foto-cidadao.png', tipo_anexo: 'image/png', conteudo_anexo: photo };
      return route.fulfill({ json: { sucesso: true, dados: data } });
    });
    await context.route('https://tile.openstreetmap.org/**', route => route.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    assert.equal(await page.getByText(/Atendimento: Seg a Sex/).count(), 0);
    await page.goto(base + '/filae');
    await page.getByRole('heading', { name: original.titulo_ocorrencia }).click();
    assert.equal(await page.getByRole('button', { name: 'Iniciar Vistoria' }).isDisabled(), true);
    assert.equal(await page.getByRole('button', { name: 'Marcar como Concluído' }).isEnabled(), true);
    await page.getByRole('button', { name: 'Abrir foto-cidadao.png' }).click();
    const preview = page.getByRole('dialog', { name: 'foto-cidadao.png' });
    await preview.getByRole('img').waitFor();
    await page.keyboard.press('Escape');
    await preview.waitFor({ state: 'detached' });
    await page.getByRole('button', { name: 'Marcar como Concluído' }).click();
    await page.getByRole('button', { name: 'Marcar como Concluído' }).waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.querySelector('button[class*="btnAcaoVerde"]')?.disabled);
    assert.equal(patches, 1);
    records = [];
    await page.evaluate(() => window.dispatchEvent(new Event('sigma:refresh')));
    await page.getByText('Selecione uma vistoria na lista ao lado', { exact: false }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Marcar como Concluído' }).count(), 0);
    await page.goto(base + '/homee');
    await page.getByText('Nenhuma vistoria encaminhada à sua equipe.', { exact: false }).waitFor();
    assert.equal(await page.getByRole('link', { name: 'Perfil da Equipe', exact: true }).count(), 1);
    assert.deepEqual(errors, []);
    console.log('Revisão final: horário removido; foto da ocorrência; conclusão; seleção atualizada; reencaminhamento remove detalhes; orientação de fila vazia. Sem erros de JavaScript ou gravações reais.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
