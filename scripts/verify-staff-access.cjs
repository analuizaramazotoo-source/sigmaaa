// API simulada: verifica a navegação pública e institucional sem alterar contas reais.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const user = role => ({ id_usuario: 1, nome_usuario: 'Pessoa de teste', email_usuario: 'teste@example.com', tipo_usuario: role, status_usuario: 'ativo' });
async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const created = [], logins = [], errors = [];
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  await context.route('**/api/**', async route => {
    const req = route.request(), resource = new URL(req.url()).pathname.replace(/^\/api/, '');
    const role = (req.headers().authorization || '').replace('Bearer teste-', '');
    let data = [];
    if (resource === '/auth/login') {
      const body = req.postDataJSON(); logins.push(body);
      data = { token: `teste-${body.perfil}`, usuario: user(body.perfil) };
    }
    if (resource === '/usuarios/me') data = user(role);
    if (resource === '/equipes/minha') data = null;
    if (resource === '/usuarios' && req.method() === 'POST') {
      assert.equal(role, 'gestao');
      created.push(req.postDataJSON()); data = { id_usuario: created.length + 1 };
    }
    if (resource === '/usuarios' && req.method() === 'GET') data = created.map((u, i) => ({ ...u, id_usuario: i + 2 }));
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
  async function signIn(role) {
    await page.goto(base + (role === 'cidadao' ? '/login' : '/acesso-servidor'));
    if (role !== 'cidadao') await page.getByRole('button', { name: role === 'gestao' ? 'Gestão' : 'Equipe', exact: true }).click();
    await page.getByLabel('CPF ou E-mail *').fill('teste@example.com');
    await page.getByLabel('Senha de Acesso *').fill('Senha-Teste123');
    await page.getByRole('button', { name: 'ENTRAR NO SISTEMA' }).click();
    await page.waitForURL('**/' + ({ cidadao: 'cidadao', equipe: 'homee', gestao: 'homeg' }[role]));
    assert.equal(logins.at(-1).perfil, role);
  }
  try {
    fs.mkdirSync('artifacts/acesso', { recursive: true });
    await page.goto(base + '/');
    assert.equal(await page.locator('a[href="/cadastrog"], a[href="/cadastroeq"]').count(), 0);
    assert.equal(await page.getByRole('heading', { name: 'Equipe', exact: true }).count(), 0);
    assert.equal(await page.getByRole('heading', { name: 'Gestão', exact: true }).count(), 0);
    assert.equal(await page.getByRole('link', { name: 'Criar minha conta' }).getAttribute('href'), '/cadastro');
    assert.equal(await page.locator('footer').getByRole('link', { name: 'Acesso de servidores' }).count(), 1);
    await page.screenshot({ path: 'artifacts/acesso/home-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 360, height: 800 });
    await page.screenshot({ path: 'artifacts/acesso/home-mobile.png', fullPage: true });
    await page.goto(base + '/login');
    for (const name of ['Gestão', 'Equipe']) assert.equal(await page.getByRole('button', { name, exact: true }).count(), 0);
    assert.equal(await page.getByRole('link', { name: 'Cadastre-se' }).count(), 1);
    await page.goto(base + '/acesso-servidor');
    assert.equal(await page.getByRole('link', { name: 'Cadastre-se' }).count(), 0);
    assert.equal(await page.locator('a[href="/cadastro"], a[href="/cadastrog"], a[href="/cadastroeq"]').count(), 0);
    await page.screenshot({ path: 'artifacts/acesso/login-servidor-mobile.png', fullPage: true });
    for (const route of ['/config', '/cadastroeq', '/cadastrog']) {
      await page.goto(base + route); await page.waitForURL('**/acesso-servidor');
    }
    for (const role of ['cidadao', 'equipe']) {
      await signIn(role);
      for (const route of ['/config', '/cadastroeq', '/cadastrog']) {
        await page.goto(base + route); await page.waitForURL('**/' + (role === 'cidadao' ? 'cidadao' : 'homee'));
      }
    }
    await signIn('gestao');
    await page.goto(base + '/config');
    await page.getByRole('heading', { name: 'Cadastrar servidor' }).waitFor();
    for (const role of ['equipe', 'gestao']) {
      await page.getByLabel('Nome completo *', { exact: true }).fill(`Servidor ${role}`);
      await page.getByLabel('E-mail *', { exact: true }).fill(`${role}@example.com`);
      await page.getByRole('combobox').selectOption(role);
      await page.getByLabel('Senha inicial * (mínimo 8 caracteres)', { exact: true }).fill('Senha-Teste123');
      await page.getByRole('button', { name: 'Criar conta', exact: true }).click();
      await page.getByRole('status').getByText('Salvo com sucesso.').waitFor();
    }
    assert.deepEqual(created.map(u => u.tipo_usuario), ['equipe', 'gestao']);
    assert.equal(errors.length, 0);
    console.log({ publicHome: 'Somente cidadão', logins: logins.map(l => l.perfil), protectedRoutes: 'Visitante, cidadão e equipe bloqueados', managerCreates: created.map(u => u.tipo_usuario), errors, realWrites: 0 });
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
