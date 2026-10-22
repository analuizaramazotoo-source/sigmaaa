// Baixa documentos com fotos através da interface e inspeciona os arquivos produzidos.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.UI_BASE_URL || 'http://127.0.0.1:5174';
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j4ZkAAAAASUVORK5CYII=';
const occurrence = { id_ocorrencia: 1, titulo_ocorrencia: 'Ocorrência com foto', protocolo_ocorrencia: 'TESTE-1', logradouro_ocorrencia: 'Rua Aimorés, 123', status_ocorrencia: 'em_andamento', latitude_ocorrencia: -21.933611, longitude_ocorrencia: -50.5125 };
const report = { id_relatorio: 7, id_ocorrencia: 1, titulo: 'Relatório com foto e CSV', data_criacao: '2026-10-22T12:00:00', tipo: 'Vistoria de Campo', observacoes: '=2+2', parecer: 'Descrição da vistoria com "aspas"; e acentos.' };
async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  await context.addInitScript(() => sessionStorage.setItem('sigma_session', JSON.stringify({ token: 'teste-documentos', usuario: { id_usuario: 1, nome_usuario: 'Gestão teste', tipo_usuario: 'gestao' } })));
  await context.route('**/api/**', async route => {
    const resource = new URL(route.request().url()).pathname.replace(/^\/api/, '');
    let data = [];
    if (resource === '/relatorios') data = [report];
    if (resource === '/ocorrencias') data = [occurrence];
    if (resource === '/ocorrencias/1') data = occurrence;
    if (resource === '/ocorrencias/1/anexos') data = [{ id_anexo: 17, nome_anexo: 'foto.png', tipo_anexo: 'image/png' }];
    if (resource === '/anexos/17') data = { id_anexo: 17, nome_anexo: 'foto.png', tipo_anexo: 'image/png', conteudo_anexo: image };
    await route.fulfill({ json: { sucesso: true, dados: data } });
  });
  const page = await context.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const folder = path.resolve('artifacts/documentos'); fs.mkdirSync(folder, { recursive: true });
  try {
    await page.goto(base + '/relatorios-tecnicos-gestao');
    const pdfPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'PDF', exact: true }).click();
    const pdf = await pdfPromise, pdfPath = path.join(folder, pdf.suggestedFilename()); await pdf.saveAs(pdfPath);
    const bytes = fs.readFileSync(pdfPath).toString('latin1');
    assert.ok(bytes.startsWith('%PDF-'));
    assert.match(bytes, /\/Subtype \/Image/);
    assert.match(bytes, /\/Width 1 \/Height 1/);
    assert.match(bytes, /TESTE-1/);
    const csvPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'CSV', exact: true }).click();
    const csv = await csvPromise, csvPath = path.join(folder, csv.suggestedFilename()); await csv.saveAs(csvPath);
    const text = fs.readFileSync(csvPath, 'utf8');
    assert.ok(text.startsWith('\ufeffCampo;Valor'));
    assert.ok(text.includes('"\'=2+2"'), 'Texto que começa como fórmula é exportado como literal');
    assert.ok(text.includes('""aspas""'));
    assert.equal(errors.length, 0);
    console.log({ pdf: 'Foto embutida e protocolo presentes', csv: 'Acentos, aspas e fórmula como texto', errors, realWrites: 0 });
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
