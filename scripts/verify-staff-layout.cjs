// Regressões visuais e de navegação com API simulada, sem gravações reais.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const user = { id_usuario: 1, nome_usuario: 'Projeto TCC - Gestão', email_usuario: 'teste@example.com', tipo_usuario: 'gestao', status_usuario: 'ativo' };
async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(u => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'teste-layout', usuario: u })), user);
  let logoutRequests = 0, populated = false;
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  await context.route('**/api/**', async route => {
    const resource = new URL(route.request().url()).pathname.replace(/^\/api/, '');
    let data = [];
    if (resource === '/usuarios/me') data = user;
    if (resource === '/equipes/minha') data = null;
    if (resource === '/usuarios') data = [user, { id_usuario: 2, nome_usuario: 'Servidor da equipe', email_usuario: 'equipe@example.com', tipo_usuario: 'equipe' }];
    if (resource === '/equipes') data = [{ id_equipe: 1, nome_equipe: 'Equipe ambiental', status_equipe: 'disponivel' }];
    if (resource === '/membros-equipe') data = [{ id_membro: 1, id_equipe: 1, id_usuario: 2, funcao_na_equipe: 'Fiscal' }];
    if (resource === '/auth/logout') logoutRequests++;
    if (resource === '/ocorrencias' && populated) data = [{ id_ocorrencia: 1, titulo_ocorrencia: 'Relato do teste', protocolo_ocorrencia: 'TESTE-1', status_ocorrencia: 'aberta', logradouro_ocorrencia: 'Rua Aimorés', latitude_ocorrencia: -21.933611, longitude_ocorrencia: -50.5125 }];
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  const page = await context.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const menuMetrics = () => page.locator('.sigma-sidebar').evaluate(el => {
    const nav = el.querySelector('nav'), item = nav.querySelector('a, button'), css = getComputedStyle(item), navCss = getComputedStyle(nav);
    return { width: el.getBoundingClientRect().width, font: css.fontSize, padding: css.padding, icon: item.querySelector('svg').getAttribute('width'), navPadding: navCss.padding, gap: navCss.gap };
  });
  try {
    fs.mkdirSync('artifacts/padronizacao', { recursive: true });
    await page.goto(base + '/status');
    await page.getByText('Nenhuma solicitação cadastrada.', { exact: true }).waitFor();
    assert.equal(await page.getByRole('combobox', { name: 'Solicitação' }).count(), 0);
    populated = true; await page.reload();
    await page.getByRole('combobox', { name: 'Solicitação' }).waitFor();
    assert.equal(await page.getByRole('combobox', { name: 'Solicitação' }).inputValue(), '1');
    await page.goto(base + '/perfile');
    assert.equal(await page.getByRole('button', { name: /Sair/ }).count(), 0);
    const team = await menuMetrics();
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.waitForURL('**/homee'); assert.equal(logoutRequests, 0);
    assert.ok(await page.evaluate(() => sessionStorage.getItem('sigma_session')));
    for (const route of ['/homeg', '/geoprocessamento', '/fila-fiscalizacao', '/autos-notificacoes-gestao', '/relatorios-tecnicos-gestao', '/legislacao', '/perfilg', '/config']) {
      await page.goto(base + route);
      assert.deepEqual(await menuMetrics(), team, route + ': menu igual ao da equipe');
      assert.equal(await page.locator('.sigma-sidebar a[aria-current="page"]').count(), 1);
      assert.equal(await page.locator('.sigma-sidebar a[href="/config"]').count(), 1);
    }
    await page.goto(base + '/homeg');
    const profile = page.getByRole('link', { name: 'Projeto TCC - Gestão Gestão', exact: true });
    await profile.waitFor();
    assert.equal(await profile.locator('svg').count(), 1, 'Avatar é ícone, sem seta de dropdown');
    assert.equal(await profile.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(244, 251, 247)');
    await page.screenshot({ path: 'artifacts/padronizacao/gestao-desktop.png', fullPage: true });
    await profile.click(); await page.waitForURL('**/perfilg');
    await page.waitForFunction(() => { const el = document.querySelector('a[title="Acessar meu perfil"]'); return el && getComputedStyle(el).backgroundColor === 'rgb(220, 252, 231)'; });
    await page.screenshot({ path: 'artifacts/padronizacao/perfil-gestao.png', fullPage: true });
    await page.goto(base + '/config');
    const back = page.getByRole('link', { name: 'Voltar', exact: true });
    assert.equal(await back.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(251, 192, 45)');
    await page.getByText('Servidor da equipe', { exact: true }).waitFor();
    await page.screenshot({ path: 'artifacts/padronizacao/config-contas-desktop.png', fullPage: true });
    await page.getByRole('button', { name: 'Equipes e integrantes', exact: true }).click();
    await page.getByRole('heading', { name: 'Adicionar integrante', exact: true }).waitFor();
    await page.screenshot({ path: 'artifacts/padronizacao/config-equipes-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 360, height: 800 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), true);
    await page.screenshot({ path: 'artifacts/padronizacao/config-equipes-mobile.png', fullPage: true });
    await page.getByRole('button', { name: 'Contas', exact: true }).click();
    await page.getByRole('heading', { name: 'Cadastrar servidor', exact: true }).waitFor();
    await page.screenshot({ path: 'artifacts/padronizacao/config-contas-mobile.png', fullPage: true });
    await back.click(); await page.waitForURL('**/homeg');
    assert.equal(errors.length, 0);
    console.log({ emptySelect: 'oculto', filledSelect: 'preservado', teamBack: 'homee sem logout', managementMenus: 8, teamMetrics: team, profile: 'mesmo padrão da equipe', errors });
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
