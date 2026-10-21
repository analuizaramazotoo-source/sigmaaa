// Revisão do cidadão com API simulada; não altera contas ou registros reais.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const user = { id_usuario: 1, nome_usuario: 'Cidadão teste', email_usuario: 'cidadao@example.com', telefone_usuario: '14999999999', cpf_usuario: '12345678901', tipo_usuario: 'cidadao', status_usuario: 'ativo' };
async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const writes = [], errors = [];
  let statusMode = 'records';
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  await context.route('**/api/**', async route => {
    const req = route.request(), resource = new URL(req.url()).pathname.replace(/^\/api/, '');
    let data = [];
    if (resource === '/usuarios/me') {
      data = user;
      if (req.method() === 'PATCH') {
        writes.push(req.postDataJSON());
        await new Promise(resolve => setTimeout(resolve, 250));
        data = { ...user, ...req.postDataJSON() };
        delete data.senha_usuario; delete data.senha_atual;
      }
    }
    if (resource === '/auth/login' || resource === '/auth/cadastro') {
      writes.push(req.postDataJSON()); data = { token: 'teste-cidadao', usuario: user };
    }
    if (resource === '/ocorrencias') {
      if (statusMode === 'error') return route.fulfill({ status: 503, json: { sucesso: false, mensagem: 'Falha simulada na consulta' } });
      data = statusMode === 'empty' ? [] : ['aberta', 'em_analise', 'em_andamento', 'resolvida', 'arquivada'].map((status, i) => ({ id_ocorrencia: i + 1, titulo_ocorrencia: `Relato ${i + 1}`, protocolo_ocorrencia: `TESTE-${i + 1}`, status_ocorrencia: status, logradouro_ocorrencia: 'Rua Aimorés, 123', latitude_ocorrencia: -21.933611, longitude_ocorrencia: -50.5125 }));
    }
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const dialogs = [];
  page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.accept(); });
  try {
    await page.goto(base + '/logincidadao');
    await page.getByRole('heading', { name: 'Acesse sua Conta' }).waitFor();
    await page.getByRole('link', { name: 'Esqueceu a senha?' }).click();
    await page.getByText('A recuperação por e-mail ainda não está disponível.', { exact: false }).waitFor();
    await page.goto(base + '/cadastro');
    await page.getByLabel('Nome Completo *', { exact: true }).fill(user.nome_usuario);
    await page.getByLabel('E-mail *', { exact: true }).fill(user.email_usuario);
    await page.getByLabel('Celular *', { exact: true }).fill(user.telefone_usuario);
    await page.getByLabel('CPF *', { exact: true }).fill(user.cpf_usuario);
    for (const label of ['Senha *', 'Confirmar Senha *']) {
      const input = page.getByLabel(label, { exact: true });
      assert.equal(await input.getAttribute('minlength'), '8');
      await input.fill('Teste-Senha123');
    }
    await page.getByRole('button', { name: 'FINALIZAR CADASTRO' }).click();
    await page.waitForURL('**/cidadao');
    assert.equal(writes[0].senha_usuario, 'Teste-Senha123');
    assert.equal(writes[0].tipo_usuario, undefined, 'Cadastro público não escolhe privilégios');
    await page.goto(base + '/perfil');
    await page.getByLabel('Nome Completo *').fill('Nome atualizado');
    const before = writes.length;
    await page.getByRole('button', { name: 'Salvar Alterações', exact: true }).dblclick();
    await page.getByRole('status').getByText('Perfil atualizado com sucesso!').waitFor();
    assert.equal(writes.length, before + 1, 'Perfil não envia duas alterações por clique duplo');
    await page.getByRole('link', { name: 'Alterar minha senha' }).click();
    assert.equal(await page.locator('.sigma-sidebar').count(), 0);
    const back = page.getByRole('button', { name: 'Voltar', exact: true });
    assert.equal(await back.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(251, 192, 45)');
    await page.getByLabel('Senha Atual', { exact: true }).fill('Anterior-123');
    await page.getByLabel('Nova Senha', { exact: true }).fill('Nova-Senha123');
    await page.getByLabel('Confirmar Nova Senha', { exact: true }).fill('Diferente-123');
    const passwordBefore = writes.length;
    await page.getByRole('button', { name: 'Salvar Nova Senha' }).click();
    assert.equal(writes.length, passwordBefore);
    assert.ok(dialogs.includes('As senhas não coincidem.'));
    await page.getByLabel('Confirmar Nova Senha', { exact: true }).fill('Nova-Senha123');
    await page.getByRole('button', { name: 'Mostrar nova senha', exact: true }).click();
    assert.equal(await page.getByLabel('Nova Senha', { exact: true }).getAttribute('type'), 'text');
    await page.getByRole('button', { name: 'Ocultar nova senha', exact: true }).click();
    await page.getByRole('button', { name: 'Salvar Nova Senha' }).click();
    await page.waitForFunction(() => document.querySelector('#nova-senha').value === '');
    assert.deepEqual(writes.at(-1), { senha_usuario: 'Nova-Senha123', senha_atual: 'Anterior-123' });
    fs.mkdirSync('artifacts/cidadao', { recursive: true });
    await page.screenshot({ path: 'artifacts/cidadao/senha-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 360, height: 800 });
    await page.screenshot({ path: 'artifacts/cidadao/senha-mobile.png', fullPage: true });
    await back.click(); await page.waitForURL('**/perfil');
    await page.goto(base + '/status');
    const select = page.getByRole('combobox', { name: 'Solicitação' });
    for (const [id, message] of [['1', 'Sua solicitação foi enviada com sucesso.'], ['2', 'Sua solicitação está sendo analisada pela equipe.'], ['3', 'Sua solicitação está em atendimento pela equipe responsável.'], ['4', 'Problema resolvido com sucesso. Obrigado!'], ['5', 'Solicitação arquivada.']]) {
      await select.selectOption(id); await page.getByText(message, { exact: true }).waitFor();
    }
    assert.equal(await page.getByText(/Uso Restrito a Servidores/).count(), 0);
    statusMode = 'empty'; await page.reload();
    await page.getByRole('link', { name: 'Registrar meu primeiro relato' }).waitFor();
    statusMode = 'error'; await page.reload();
    await page.getByText('O andamento está indisponível no momento. Tente atualizar a página.').waitFor();
    assert.equal(await page.getByRole('link', { name: 'Registrar meu primeiro relato' }).count(), 0);
    assert.equal(errors.length, 0);
    console.log({ cadastro: 'OK', loginAntigo: 'OK', perfil: 'OK', senha: 'OK', voltarAmarelo: 'OK', status: '5 estados + vazio + erro OK', errors, realWrites: 0 });
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
