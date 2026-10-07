import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPdf } from '../src/services/pdfDocument.js';

test('PDF com fotos mantém offsets binários e dimensões proporcionais', () => {
  const data = Uint8Array.from([255, 216, 0, 128, 255, 217]);
  const pdf = Buffer.from(buildPdf('Descrição (teste) \\ foto', [
    { name: 'paisagem.jpg', width: 1200, height: 600, data },
    { name: 'retrato.png', width: 400, height: 800, data }
  ]));
  const text = pdf.toString('latin1');
  assert.match(text, /\/Count 3/);
  assert.equal((text.match(/\/Subtype \/Image/g) || []).length, 2);
  assert.match(text, /q 505\.00 0 0 252\.50/);
  const dimensions = [...text.matchAll(/q (\d+\.\d+) 0 0 (\d+\.\d+) [\d.]+ [\d.]+ cm \/Photo/g)];
  assert.equal(dimensions.length, 2);
  assert.ok(Math.abs(Number(dimensions[1][1]) / Number(dimensions[1][2]) - 0.5) < 0.001);
  assert.ok(pdf.includes(Buffer.from(data)));
  const xref = Number(/startxref\n(\d+)/.exec(text)[1]);
  assert.equal(text.slice(xref, xref + 4), 'xref');
  const entries = text.slice(xref).split('\n').slice(3).filter(line => /^\d{10} 00000 n/.test(line));
  entries.forEach((entry, index) => assert.ok(text.slice(Number(entry.slice(0, 10))).startsWith(`${index + 1} 0 obj\n`)));
  assert.ok(text.includes('Descrição \\(teste\\) \\\\ foto'));
});

test('Texto longo gera múltiplas páginas sem imagens', () => {
  const text = Buffer.from(buildPdf(Array.from({ length: 100 }, (_, i) => `Linha ${i}`).join('\n'))).toString('latin1');
  assert.match(text, /\/Count 3/);
  assert.ok(!text.includes('/Subtype /Image'));
  assert.ok(text.includes('Linha 99'));
});

test('Imagem sem dimensões é rejeitada', () => {
  assert.throws(() => buildPdf('Teste', [{ width: 0, height: 20, data: new Uint8Array([1]) }]), /Imagem inválida/);
});

test('Relatório formatado mantém identificação, protocolo e seções em textos longos', () => {
  const pdf = Buffer.from(buildPdf({
    title: 'Vistoria de descarte irregular', kind: 'RELATÓRIO TÉCNICO',
    metadata: [['Documento', 'REL-42'], ['Protocolo', 'SIGMA-123']],
    sections: [{ title: 'Observações da vistoria', text: 'Evidência registrada. '.repeat(900) }, { title: 'Parecer técnico', text: 'Encaminhamento para análise.' }]
  })).toString('latin1');
  const count = Number(/\/Count (\d+)/.exec(pdf)[1]);
  assert.ok(count > 1);
  assert.ok(pdf.includes('SIGMA-123'));
  assert.ok(pdf.includes('Parecer técnico'));
  assert.ok(pdf.includes(`Página ${count} de ${count}`));
  assert.equal((pdf.match(/\(SIGMA\)/g) || []).length, count);
});
