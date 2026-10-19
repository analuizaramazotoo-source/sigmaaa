// Verifica a interface com dados de teste; não grava no banco.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5173';
const out = path.resolve('artifacts/responsividade');
fs.mkdirSync(out, { recursive: true });
const user = { id_usuario: 1, nome_usuario: 'Pessoa de teste com nome completo', email_usuario: 'teste@example.com', tipo_usuario: 'gestao', telefone_usuario: '14999999999', cpf_usuario: '12345678901', status_usuario: 'ativo' };
const occurrence = { id_ocorrencia: 1, titulo_ocorrencia: 'Descarte de resíduos em Tupã', protocolo_ocorrencia: 'TESTE-001', nome_categoria: 'Resíduos', id_categoria: 1, logradouro_ocorrencia: 'Rua Aimorés, 123, Centro, Tupã/SP', descricao_ocorrencia: 'Registro fictício para verificar a interface.', status_ocorrencia: 'aberta', data_ocorrencia: '2026-10-19', latitude_ocorrencia: -21.933611, longitude_ocorrencia: -50.5125 };
const team = { id_equipe: 1, nome_equipe: 'Equipe de teste', especialidade_equipe: 'Ambiental', status_equipe: 'disponivel', membros: [] };
const place = { lat: -21.933611, lng: -50.5125, label: 'Rua Aimorés, Tupã/SP', approximate: true, postcode: '17600-000' };
const routes = (process.env.UI_ROUTES || '/,/login,/logincidadao,/cadastro,/esqueci-senha,/cidadao,/relatar-problema,/solicitar,/status,/denuncia,/perfil,/alterar,/chat,/homeg,/geoprocessamento,/fila-fiscalizacao,/autos-notificacoes-gestao,/relatorios-tecnicos-gestao,/legislacao,/perfilg,/cadastrog,/config,/homee,/autoe,/filae,/leise,/relatorioe,/perfile,/cadastroeq').split(',');
const widths = (process.env.UI_WIDTHS || '360,390,768,1024,1440').split(',').map(Number);
async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.UI_BROWSER_CHANNEL || 'msedge' });
  const context = await browser.newContext();
  await context.addInitScript(value => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'ui-test-only', usuario: value })), user);
  await context.route('**/api/**', async route => {
    const url = new URL(route.request().url()), resource = url.pathname.replace(/^\/api/, '');
    let data = [];
    if (resource === '/usuarios/me') data = user;
    if (resource === '/usuarios') data = [user];
    if (resource === '/ocorrencias') data = [occurrence];
    if (resource === '/categorias') data = [{ id_categoria: 1, nome_categoria: 'Resíduos' }];
    if (resource === '/equipes') data = [team];
    if (resource === '/equipes/minha') data = team;
    if (resource === '/membros-equipe') data = [];
    if (resource === '/configuracoes') data = {};
    if (resource === '/geocodificacao') {
      const address = url.searchParams.get('endereco');
      await new Promise(resolve => setTimeout(resolve, address.includes('Antiga') ? 1800 : 30));
      data = address.includes('Inexistente') ? [] : [{ ...place, label: address + ', Tupã/SP', address }];
    }
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  // Os testes de layout não precisam baixar imagens de ruas de todas as telas.
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  const page = await context.newPage(), errors = [], failures = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const width of widths) {
      console.log(`Verificando largura ${width}px...`);
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(180);
        const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, body: document.body.scrollWidth, elements: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width && r.right > innerWidth + 2 && s.position !== 'fixed' && s.visibility !== 'hidden' && !el.closest('[hidden]'); }).slice(0, 8).map(el => ({ tag: el.tagName, class: String(el.className).slice(0, 80), right: Math.round(el.getBoundingClientRect().right) })) }));
        if (Math.max(layout.scroll, layout.body) > width + 2) {
          failures.push({ route, width, ...layout });
          console.log('Overflow', route, width, await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el => { const r=el.getBoundingClientRect(); return r.width && r.right>innerWidth+2 && getComputedStyle(el).position!=='fixed'; }).slice(0,5).map(el=>el.outerHTML.slice(0,350))));
          await page.screenshot({ path: path.join(out, `overflow-${route.replaceAll('/', '') || 'home'}-${width}.png`), fullPage:true });
        }
        const menu = page.getByRole('button', { name: 'Abrir menu', exact: true });
        if (await page.locator('.sigma-sidebar').count()) {
          if (width <= 1024 || ['/chat', '/alterar'].includes(route)) {
            assert.equal(await menu.count(), 1, `${route}: um botão de menu`);
            await menu.click(); await page.getByRole('dialog', { name: 'Menu lateral' }).waitFor({ state: 'visible' });
            assert.equal(await page.locator('#root').evaluate(el => el.inert), true);
            await page.keyboard.press('Escape');
            assert.equal(await menu.getAttribute('aria-expanded'), 'false');
            assert.equal(await page.locator('#root').evaluate(el => el.inert), false);
          } else assert.equal(await menu.count(), 0);
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/relatar-problema');
    await page.getByLabel('Endereço / Localização do Ocorrido *').fill('Rua Aimorés, 123');
    await page.getByRole('option', { name: /Rua Aimorés, 123, Tupã/ }).click();
    await page.getByText(/Local marcado:/).waitFor();
    await page.screenshot({ path: path.join(out, 'cadastro-mobile.png'), fullPage: true });
    await page.getByLabel('Endereço / Localização do Ocorrido *').fill('Rua Antiga');
    await page.waitForTimeout(1150);
    await page.getByLabel('Endereço / Localização do Ocorrido *').fill('Rua Nova');
    await page.getByRole('option', { name: /Rua Nova, Tupã/ }).waitFor();
    await page.waitForTimeout(1800);
    assert.equal(await page.getByRole('option', { name: /Rua Antiga, Tupã/ }).count(), 0);
    await page.getByLabel('Endereço / Localização do Ocorrido *').fill('Rua Inexistente');
    await page.getByText(/Nenhuma rua encontrada em Tupã/).waitFor();
    assert.equal(await page.getByText(/Local marcado:/).count(), 0, 'Endereço alterado não mantém o ponto anterior');
    for (const [route, label] of [['/solicitar', 'Endereço / Localização *'], ['/denuncia', 'Endereço Exato / Ponto de Localização *'], ['/homeg', 'Endereço / Localização']]) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      if (route === '/homeg') await page.getByRole('button', { name: 'Novo Registro Interno' }).click();
      await page.getByLabel(label, { exact: true }).fill('Rua Aimorés, 123');
      await page.getByRole('option', { name: /Rua Aimorés, 123, Tupã/ }).click();
      await page.getByText(/Local marcado:/).waitFor();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), true, `Mapa do formulário ${route} cabe no celular`);
    }
    await page.goto(base + '/homeg');
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.screenshot({ path: path.join(out, 'menu-mobile.png'), fullPage: true });
    await page.getByRole('link', { name: 'Geoprocessamento', exact: true }).first().click();
    await page.waitForURL('**/geoprocessamento');
    assert.equal(await page.getByRole('button', { name: 'Abrir menu', exact: true }).getAttribute('aria-expanded'), 'false');
    fs.writeFileSync(path.join(out, 'resultado.json'), JSON.stringify({ routes: routes.length, widths, errors, failures }, null, 2));
    console.log(JSON.stringify({ routes: routes.length, widths, errors, failures }, null, 2));
    assert.equal(errors.length, 0, 'Sem erros de renderização');
    assert.equal(failures.length, 0, 'Sem rolagem horizontal da página');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
