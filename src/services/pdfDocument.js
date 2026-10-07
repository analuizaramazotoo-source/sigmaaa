const bytes = value => Uint8Array.from(value, char => char.charCodeAt(0) & 255);
const join = parts => {
  const result = new Uint8Array(parts.reduce((size, part) => size + part.length, 0));
  let offset = 0;
  for (const part of parts) { result.set(part, offset); offset += part.length; }
  return result;
};
const escapeText = value => String(value).replace(/[\u0100-\uffff]/g, '?').replace(/([\\()])/g, '\\$1');
const streamObject = (content, properties = '') => join([bytes(`<< ${properties} /Length ${content.length} >>\nstream\n`), content, bytes('\nendstream')]);

// Aproxima as métricas da Helvetica para quebrar por palavras, inclusive URLs longas.
function textWidth(text, size) {
  return Array.from(text).reduce((width, char) => width + (char.codePointAt(0) > 255 ? 0.56 : /[ilI.,:;'!| ]/.test(char) ? 0.28 : /[MW@%]/.test(char) ? 0.86 : /[A-Z0-9]/.test(char) ? 0.64 : 0.54) * size, 0);
}
function wrap(text, width, size) {
  return String(text ?? '').split(/\r?\n/).flatMap(paragraph => {
    const lines = [], words = paragraph.split(/\s+/).filter(Boolean);
    let line = '';
    for (let word of words) {
      if (line && textWidth(`${line} ${word}`, size) > width) { lines.push(line); line = ''; }
      while (textWidth(word, size) > width) {
        let length = 1;
        while (length < word.length && textWidth(word.slice(0, length + 1), size) <= width) length++;
        lines.push(word.slice(0, length)); word = word.slice(length);
      }
      line = line ? `${line} ${word}` : word;
    }
    lines.push(line); return lines;
  });
}
const drawText = (text, x, y, size = 10.5, bold = false, color = '0.12 0.18 0.22') => `${color} rg BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapeText(text)}) Tj ET\n`;

export function buildPdf(document, images = []) {
  const model = typeof document === 'string' ? { title: 'Documento ambiental', sections: [{ title: 'Informações do registro', text: document }] } : document;
  const objects = [null, null, bytes('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'), bytes('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')];
  const pageContents = [];
  const pages = [];
  const addPage = (content, resources = '') => {
    const pageId = objects.length + 1;
    pages.push(pageId);
    objects.push(bytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> ${resources} >> /Contents ${pageId + 1} 0 R >>`));
    pageContents.push({ index: objects.length, content }); objects.push(null);
  };
  const header = () => {
    let content = '0.02 0.36 0.27 rg 0 772 595 70 re f\n';
    content += drawText('SIGMA', 44, 803, 23, true, '1 1 1');
    content += drawText('GESTÃO AMBIENTAL', 355, 806, 10, true, '1 1 1');
    content += drawText('Registro e acompanhamento', 355, 790, 9, false, '0.8 0.94 0.88');
    content += drawText(model.kind || 'DOCUMENTO AMBIENTAL', 44, 748, 9, true, '0.02 0.43 0.32');
    let y = 722;
    for (const line of wrap(model.title || 'Documento ambiental', 507, 18)) { content += drawText(line, 44, y, 18, true); y -= 23; }
    return { content, y: y - 8 };
  };
  let current = header();
  const nextPage = () => { addPage(current.content); current = header(); };
  const ensureSpace = height => { if (current.y - height < 66) nextPage(); };
  for (let i = 0; i < (model.metadata || []).length; i += 2) {
    const row = model.metadata.slice(i, i + 2).map(([label, value]) => ({ label, lines: wrap(value || 'Não informado', 228, 10.5) }));
    const height = Math.max(...row.map(cell => cell.lines.length)) * 14 + 33;
    ensureSpace(height);
    row.forEach((cell, index) => {
      const x = 44 + index * 260;
      current.content += `0.95 0.97 0.96 rg ${x} ${current.y - height} 247 ${height - 7} re f\n`;
      current.content += drawText(cell.label.toUpperCase(), x + 10, current.y - 19, 8, true, '0.32 0.43 0.4');
      cell.lines.forEach((line, n) => { current.content += drawText(line, x + 10, current.y - 35 - n * 14, 10.5, true); });
    });
    current.y -= height;
  }
  current.y -= 14;
  for (const section of model.sections || []) {
    ensureSpace(54);
    current.content += drawText(section.title, 44, current.y, 11, true, '0.02 0.43 0.32');
    current.content += `0.78 0.87 0.82 RG 0.7 w 44 ${current.y - 8} m 551 ${current.y - 8} l S\n`;
    current.y -= 28;
    for (const line of wrap(section.text || 'Não informado.', 507, 10.5)) {
      ensureSpace(15);
      current.content += drawText(line, 44, current.y); current.y -= line ? 15 : 8;
    }
    current.y -= 22;
  }
  addPage(current.content);
  for (const image of images) {
    if (!(image.width > 0 && image.height > 0 && image.data?.length)) throw new Error('Imagem inválida para o PDF.');
    const imageId = objects.length + 1;
    objects.push(streamObject(image.data, `/Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`));
    const photoPage = header();
    const caption = wrap(image.name || 'Imagem', 507, 10);
    let content = photoPage.content + drawText('Registro fotográfico da ocorrência', 44, photoPage.y, 11, true, '0.02 0.43 0.32');
    let y = photoPage.y - 23;
    for (const line of caption) { content += drawText(line, 44, y, 10); y -= 14; }
    y -= 12;
    const maxHeight = y - 78;
    const scale = Math.min(505 / image.width, maxHeight / image.height);
    const width = image.width * scale, height = image.height * scale;
    const x = (595 - width) / 2, bottom = y - height;
    content += `0.84 0.89 0.86 RG 0.7 w ${(x - 1).toFixed(2)} ${(bottom - 1).toFixed(2)} ${(width + 2).toFixed(2)} ${(height + 2).toFixed(2)} re S\nq ${width.toFixed(2)} 0 0 ${height.toFixed(2)} ${x.toFixed(2)} ${bottom.toFixed(2)} cm /Photo Do Q`;
    addPage(content, `/XObject << /Photo ${imageId} 0 R >>`);
  }
  pageContents.forEach((page, index) => {
    const footer = '0.8 0.85 0.82 RG 0.6 w 44 47 m 551 47 l S\n' + drawText('Documento gerado pelo SIGMA', 44, 31, 8, false, '0.4 0.46 0.44') + drawText(`Página ${index + 1} de ${pages.length}`, 478, 31, 8, false, '0.4 0.46 0.44');
    objects[page.index] = streamObject(bytes(page.content + '\n' + footer));
  });
  objects[0] = bytes('<< /Type /Catalog /Pages 2 0 R >>');
  objects[1] = bytes(`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map(id => `${id} 0 R`).join(' ')}] >>`);
  const chunks = [bytes('%PDF-1.4\n')], offsets = [0];
  let size = chunks[0].length;
  objects.forEach((object, index) => {
    offsets.push(size);
    const chunk = join([bytes(`${index + 1} 0 obj\n`), object, bytes('\nendobj\n')]);
    chunks.push(chunk); size += chunk.length;
  });
  chunks.push(bytes(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n` + offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('') + `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${size}\n%%EOF`));
  return join(chunks);
}
