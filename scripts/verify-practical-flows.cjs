// Navegador com API interceptada: nenhum registro real é alterado.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const user = { id_usuario: 1, nome_usuario: 'Pessoa de teste', email_usuario: 'teste@example.com', tipo_usuario: 'gestao' };
const place = { lat: -21.933611, lng: -50.5125, street: 'Rua Aimorés', address: 'Rua Aimorés, 123', label: 'Rua Aimorés, Tupã/SP', approximate: true };
const records = ['aberta', 'em_analise', 'arquivada', 'aberta'].map((status, i) => ({ id_ocorrencia: 11 + i, titulo_ocorrencia: ['Descarte inicial', 'Análise de descarte', 'Registro arquivado', 'Legado sem localização'][i], protocolo_ocorrencia: `TESTE-${11 + i}`, status_ocorrencia: status, id_categoria: 1, nome_categoria: 'Resíduos', descricao_ocorrencia: 'Descrição sem o logradouro', logradouro_ocorrencia: 'Rua Aimorés, 123', data_ocorrencia: '2026-10-20', latitude_ocorrencia: i === 3 ? null : i === 1 ? -21.934 : place.lat, longitude_ocorrencia: i === 3 ? null : i === 1 ? -50.513 : place.lng }));
const image = name => ({ name, mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4ZkAAAAASUVORK5CYII=', 'base64') });

async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.UI_BROWSER_CHANNEL || 'msedge' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(value => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'teste-ui', usuario: value })), user);
  const documents = [], uploads = [], patches = [], errors = [];
  let failPhoto = true;
  await context.route('https://tile.openstreetmap.org/**', route => route.abort());
  await context.route('**/api/**', async route => {
    const req = route.request(), url = new URL(req.url()), resource = url.pathname.replace(/^\/api/, '');
    let data = [];
    if (resource === '/usuarios/me') data = user;
    if (resource === '/ocorrencias') data = records;
    if (/^\/ocorrencias\/\d+$/.test(resource)) {
      data = records.find(r => String(r.id_ocorrencia) === resource.split('/')[2]);
      if (req.method() === 'PATCH') { patches.push(req.postDataJSON()); Object.assign(data, req.postDataJSON()); }
    }
    if (resource === '/categorias') data = [{ id_categoria: 1, nome_categoria: 'Resíduos' }];
    if (resource === '/geocodificacao') data = [place];
    if (resource === '/equipes') data = [{ id_equipe: 1, nome_equipe: 'Equipe ativa', status_equipe: 'disponivel' }];
    if (resource === '/equipes/minha') data = null;
    if (resource === '/legislacao') data = [{ id_lei: 1, titulo: 'Norma cadastrada para o teste', conteudo: 'Resumo do teste', url_oficial: 'https://example.com' }];
    if (['/relatorios', '/autos'].includes(resource)) {
      if (req.method() === 'POST') {
        await new Promise(resolve => setTimeout(resolve, 150));
        data = { ...req.postDataJSON(), id_relatorio: 99, id_auto: 99 }; documents.push({ resource, ...data });
      } else if (resource === '/relatorios') data = [{ id_relatorio: 1, id_ocorrencia: 11, titulo: 'Relatório de outro ano', data_criacao: '2025-01-10', observacoes: 'Vistoria anterior' }];
    }
    if (/\/ocorrencias\/\d+\/anexos$/.test(resource) && req.method() === 'POST') {
      const body = req.postDataJSON();
      if (body.nome_anexo === 'segunda.png' && failPhoto) {
        failPhoto = false;
        return route.fulfill({ status: 503, json: { sucesso: false, mensagem: 'Falha simulada na segunda foto do relatório' } });
      }
      uploads.push(body.nome_anexo); data = { id_anexo: uploads.length };
    }
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', dialog => dialog.accept());
  fs.mkdirSync('artifacts/praticidade', { recursive: true });
  try {
    await page.goto(base + '/cidadao');
    assert.equal(await page.getByRole('heading', { name: 'Solicitar Serviço', exact: true }).count(), 0);
    assert.equal(await page.getByRole('link', { name: 'ENVIAR RELATO', exact: true }).count(), 1);
    await page.screenshot({ path: 'artifacts/praticidade/cidadao-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'artifacts/praticidade/cidadao-mobile.png', fullPage: true });
    await page.goto(base + '/solicitar'); await page.waitForURL('**/relatar-problema');
    await page.goto(base + '/status');
    await page.getByRole('combobox', { name: 'Solicitação' }).selectOption('12');
    assert.equal(await page.getByText('Equipe a caminho', { exact: true }).count(), 0);
    assert.equal(await page.locator('a[href^="/chat"]').count(), 0);
    await page.goto(base + '/chat');
    await page.getByRole('heading', { name: 'Página não encontrada' }).waitFor();
    console.log('Painel unificado, rota antiga e acompanhamento: OK');

    await page.goto(base + '/fila-fiscalizacao');
    await page.getByText('Análise de descarte', { exact: false }).waitFor();
    assert.equal(await page.getByText('Registro arquivado', { exact: true }).count(), 0);
    await page.getByRole('button', { name: /Ver Detalhes|Detalhes/ }).first().click();
    await page.getByText('20/10/2026', { exact: true }).last().waitFor();
    await page.getByRole('button', { name: 'Fechar', exact: true }).click();
    await page.getByRole('searchbox', { name: 'Buscar chamados' }).fill('TESTE-12');
    await page.getByText('Análise de descarte', { exact: false }).waitFor();
    assert.equal(await page.getByText('Descarte inicial', { exact: false }).count(), 0);
    await page.getByRole('searchbox', { name: 'Buscar chamados' }).fill('aimores');
    await page.getByText('Análise de descarte', { exact: false }).waitFor();
    await page.goto(base + '/filae');
    await page.getByRole('textbox', { name: 'Buscar vistorias' }).fill('TESTE-12');
    await page.getByRole('heading', { name: 'Análise de descarte', exact: true }).click();
    await page.getByText('Localização / Endereço:', { exact: true }).locator('..').getByText('Rua Aimorés, 123', { exact: true }).waitFor();
    assert.equal(await page.getByRole('heading', { name: 'Descarte inicial', exact: true }).count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Iniciar Vistoria', exact: true }).isEnabled(), true);
    assert.equal(await page.getByRole('button', { name: 'Marcar como Concluído' }).isDisabled(), true);
    await page.getByRole('textbox', { name: 'Buscar vistorias' }).fill('aimores');
    await page.getByRole('heading', { name: 'Registro arquivado', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Iniciar Vistoria', exact: true }).isDisabled(), true);
    await page.goto(base + '/relatorios-tecnicos-gestao');
    await page.getByRole('heading', { name: 'Relatório de outro ano' }).waitFor();
    assert.equal(await page.getByRole('heading', { name: 'Relatório de outro ano' }).count(), 1);
    assert.equal(await page.getByRole('button', { name: 'PDF', exact: true }).count(), 1);
    assert.equal(await page.getByRole('button', { name: 'CSV', exact: true }).count(), 1);
    await page.screenshot({ path: 'artifacts/praticidade/relatorios-mobile.png', fullPage: true });
    console.log('Fila em análise, data sem recuo de dia e relatório sem duplicação: OK');

    await page.goto(base + '/relatorioe?ocorrencia=12');
    await page.waitForFunction(() => document.querySelector('[aria-label="Título do Relatório"]').value.includes('Análise de descarte'));
    assert.equal(await page.getByRole('combobox', { name: 'Vistoria / Ocorrência Correspondente', exact: true }).inputValue(), '12');
    assert.equal(await page.getByRole('textbox', { name: 'Constatações de Campo' }).inputValue(), '');
    assert.equal(await page.getByRole('combobox', { name: 'Parecer Conclusivo do Fiscal' }).inputValue(), '');
    await page.getByRole('textbox', { name: 'Constatações de Campo' }).fill('Constatação informada pelo fiscal para o teste.');
    await page.getByRole('combobox', { name: 'Parecer Conclusivo do Fiscal' }).selectOption('Improcedente - Denúncia Não Confirmada');
    assert.equal(await page.locator('input[type="file"]').isVisible(), false);
    const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.getByRole('button', { name: 'Escolher arquivos' }).click()]);
    await chooser.setFiles([image('preview.png'), { name: 'documento.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 teste') }]);
    const thumbnail = await page.getByRole('img', { name: 'Prévia de preview.png' }).boundingBox();
    assert.ok(thumbnail.width <= 80 && thumbnail.height <= 80);
    await page.getByRole('button', { name: 'Abrir foto preview.png' }).click();
    await page.getByRole('dialog', { name: 'Foto preview.png' }).waitFor();
    await page.getByRole('button', { name: 'Fechar foto' }).click();
    assert.match(await page.getByRole('link', { name: 'Abrir PDF documento.pdf' }).getAttribute('href'), /^blob:/);
    await page.locator('.sigma-image-attachments').screenshot({ path: 'artifacts/praticidade/anexos-equipe.png' });
    await page.getByRole('button', { name: 'Remover arquivo preview.png' }).click();
    await page.getByRole('button', { name: 'Remover arquivo documento.pdf' }).click();
    await page.getByRole('button', { name: 'Escolher arquivos' }).evaluate(element => {
      const transfer = new DataTransfer();
      transfer.items.add(new File(['%PDF-1.4 teste'], 'arrastado.pdf', { type: 'application/pdf' }));
      element.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: transfer }));
    });
    await page.getByRole('link', { name: 'Abrir PDF arrastado.pdf' }).waitFor();
    await page.getByRole('button', { name: 'Remover arquivo arrastado.pdf' }).click();
    await page.locator('input[type="file"]').setInputFiles([image('primeira.png'), image('segunda.png')]);
    await page.getByRole('button', { name: 'Enviar Relatório à Gestão' }).click();
    await page.getByText('Falha simulada na segunda foto do relatório').waitFor();
    assert.equal(await page.getByRole('textbox', { name: 'Título do Relatório' }).isDisabled(), true);
    await page.getByText('Relatório REL-99 registrado.', { exact: false }).waitFor();
    await page.getByRole('button', { name: 'Fechar', exact: true }).click();
    await page.getByRole('button', { name: 'Enviar Relatório à Gestão' }).click();
    await page.getByText('Relatório enviado com sucesso à Secretaria do Meio Ambiente!').waitFor();
    assert.equal(documents.filter(d => d.resource === '/relatorios').length, 1);
    assert.equal(await page.getByRole('combobox', { name: 'Parecer Conclusivo do Fiscal' }).inputValue(), '');
    assert.deepEqual(uploads, ['primeira.png', 'segunda.png']);
    console.log('Relatório vinculado, parecer explícito e retomada de anexos sem repetir: OK');

    await page.goto(base + '/autoe?ocorrencia=12');
    await page.waitForFunction(() => document.querySelector('[aria-label="Local do Fato / Endereço Completo"]').value === 'Rua Aimorés, 123');
    assert.equal(await page.getByRole('combobox', { name: 'Vistoria / Ocorrência Vinculada', exact: true }).inputValue(), '12');
    assert.equal(await page.getByRole('button', { name: 'Salvar Rascunho' }).count(), 0);
    assert.equal(await page.getByRole('link', { name: 'Consultar legislação cadastrada' }).count(), 0);
    assert.equal(await page.locator('input[type="file"]').isVisible(), false);
    assert.equal(await page.getByText('Código Ambiental do Município - Art. 12', { exact: true }).count(), 0);
    await page.getByPlaceholder('Ex: João da Silva ou Empresa XYZ Ltda').fill('Autuado do teste');
    await page.getByRole('combobox', { name: 'Fundamentação Legal / Legislação Aplicada', exact: true }).fill('Norma cadastrada para o teste');
    await page.getByPlaceholder('Descreva minuciosamente as irregularidades encontradas no local...').fill('Constatação descrita pelo fiscal para testar o envio.');
    await page.locator('input[type="file"]').setInputFiles(image('foto-auto.png'));
    await page.getByRole('button', { name: 'Emitir e Registrar' }).dblclick();
    await page.getByText(/Documento emitido e registrado|Documento emitido com sucesso|Documento registrado com sucesso/).waitFor();
    assert.equal(documents.filter(d => d.resource === '/autos').length, 1);
    assert.equal(documents.find(d => d.resource === '/autos').id_ocorrencia, 12);
    assert.deepEqual(uploads, ['primeira.png', 'segunda.png', 'foto-auto.png']);

    await page.goto(base + '/autos-notificacoes-gestao');
    await page.getByRole('button', { name: 'Novo Auto / Notificação', exact: true }).click();
    await page.getByRole('combobox', { name: 'Ocorrência vinculada *' }).selectOption('12');
    await page.getByRole('textbox', { name: 'Infrator / Razão Social' }).fill('Autuado do teste da gestão');
    await page.getByRole('textbox', { name: 'Descrição / Fundamentação *' }).fill('Constatação descrita pela gestão para o teste.');
    await page.getByRole('button', { name: 'Emitir Documento', exact: true }).dblclick();
    await page.getByText('Documento AUTO-99 salvo.', { exact: true }).waitFor();
    assert.equal(documents.filter(d => d.resource === '/autos').length, 2, 'Um auto da equipe e outro da gestão, sem repetição por clique duplo');

    await page.goto(base + '/homee');
    const selectedCard = page.getByRole('button', { name: 'Ver vistoria 12 no mapa: Análise de descarte', exact: true });
    await selectedCard.click();
    await page.locator('.leaflet-popup-content').getByText('TESTE-12', { exact: true }).waitFor();
    await page.getByText('Local marcado: -21.934000, -50.513000').waitFor();
    assert.equal(await selectedCard.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.leaflet-overlay-pane path.leaflet-interactive').count(), 3, 'Realça o marcador existente, sem duplicá-lo');
    assert.equal(await page.getByRole('heading', { name: 'Vistoria #12', exact: true }).count(), 0, 'Selecionar a lista mantém o mapa visível');
    await page.locator('.leaflet-popup-close-button').click();
    await page.locator('.leaflet-popup-content').waitFor({ state: 'detached' });
    assert.equal(await selectedCard.getAttribute('aria-pressed'), 'false', 'O X desfaz a seleção da lista');
    assert.equal(await page.getByText(/Local marcado:/).count(), 0, 'O mapa volta à visão geral');
    assert.equal(await page.locator('.leaflet-overlay-pane path[stroke-width="3"]').count(), 0, 'O destaque do marcador foi removido');
    await selectedCard.click();
    await page.locator('.leaflet-popup-content').getByText('TESTE-12', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Ver detalhes', exact: true }).click();
    await page.getByRole('heading', { name: 'Vistoria #12', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Fechar detalhes da vistoria', exact: true }).click();
    assert.equal(await selectedCard.getAttribute('aria-pressed'), 'false');
    await page.getByRole('button', { name: 'Ver vistoria 14 no mapa: Legado sem localização', exact: true }).click();
    await page.getByText('A vistoria #14 ainda não tem localização válida em Tupã.', { exact: false }).waitFor();
    await page.locator('.leaflet-popup-content').waitFor({ state: 'detached' });
    assert.equal(await page.locator('.leaflet-popup-content').count(), 0);
    const firstCard = page.getByRole('button', { name: 'Ver vistoria 11 no mapa: Descarte inicial', exact: true });
    await firstCard.focus(); await firstCard.press('Enter');
    await page.locator('.leaflet-popup-content').getByText('TESTE-11', { exact: true }).waitFor();
    await page.screenshot({ path: 'artifacts/praticidade/vistoria-selecionada-no-mapa.png', fullPage: true });
    console.log('Vistoria da lista abre o marcador correto, seleção repetida, teclado e ponto ausente: OK');

    await page.goto(base + '/perfile');
    assert.equal(await page.getByRole('link', { name: 'Alterar minha senha' }).count(), 0);
    await page.goto(base + '/perfil');
    assert.equal(await page.locator('input[type="password"]').count(), 0);
    await page.getByRole('link', { name: 'Alterar minha senha' }).click();
    await page.getByLabel('Nova Senha', { exact: true }).waitFor();
    assert.equal(await page.locator('.sigma-sidebar').count(), 0);
    assert.equal(await page.getByRole('button', { name: /Abrir menu/ }).count(), 0);
    await page.screenshot({ path: 'artifacts/praticidade/alterar-senha.png', fullPage: true });
    assert.equal(await page.getByLabel('Nova Senha', { exact: true }).getAttribute('minlength'), '8');
    await page.goto(base + '/perfilg');
    assert.equal(await page.getByRole('button', { name: 'Alterar Foto' }).count(), 0);
    await page.goto(base + '/endereco-inexistente');
    await page.getByRole('heading', { name: 'Página não encontrada' }).waitFor();
    assert.equal(await page.getByRole('link', { name: 'Voltar ao painel' }).getAttribute('href'), '/homeg');

    await page.goto(base + '/homeg');
    await page.getByText('Legado sem localização', { exact: true }).last().click();
    await page.getByRole('button', { name: 'Corrigir endereço / localização' }).click();
    await page.getByRole('combobox', { name: 'Novo endereço em Tupã *' }).fill('Rua Aimorés, 123');
    await page.getByRole('option', { name: /Rua Aimorés/ }).click();
    await page.getByRole('button', { name: 'Salvar localização' }).click();
    await page.getByRole('button', { name: 'Corrigir endereço / localização' }).waitFor();
    assert.equal(patches.length, 1); assert.equal(patches[0].latitude_ocorrencia, place.lat); assert.equal(patches[0].longitude_ocorrencia, place.lng);
    assert.equal(errors.length, 0);
    console.log('Autos com contexto, senha única, página inexistente e correção de localização: OK');
    console.log({ errors, reports: documents.filter(d => d.resource === '/relatorios').length, autos: documents.filter(d => d.resource === '/autos').length, photos: uploads.length, locationCorrections: patches.length, realWrites: 0 });
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
