const normalizeAddress = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const ignored = new Set(['r', 'rua', 'av', 'avenida', 'alameda', 'travessa', 'estrada', 'rodovia', 'praca', 'de', 'da', 'do', 'das', 'dos', 'e']);
const streetWords = value => normalizeAddress(value).split(' ').filter(word => word && !ignored.has(word));
const streetKey = value => streetWords(value).join(' ');
function parseAddress(value) {
  const text = String(value || '').trim().replace(/\s+/g, ' ');
  const leading = text.match(/^(?:n[º°.o]?\s*)?(\d+[a-z]?)\s*(?:[,;-]\s*|\s+)([a-zÀ-ÿ].*)$/i);
  const namedDate = /^\d+\s+de\s+(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s|,|$)/.test(normalizeAddress(text));
  if (leading && !namedDate) return { street: leading[2].split(',')[0].trim(), number: leading[1] };
  const parts = text.split(',');
  let street = parts[0].trim();
  const afterComma = parts[1]?.trim().match(/^(?:n[º°.o]?\s*|n[uú]mero\s*)?(\d+[a-z]?)(?:\s|$)/i);
  if (afterComma) return { street, number: afterComma[1] };
  const explicit = street.match(/^(.*?)\s+(?:n[º°.o]?\s*|n[uú]mero\s*)(\d+[a-z]?)\s*$/i);
  if (explicit) return { street: explicit[1].trim(), number: explicit[2] };
  const trailing = street.match(/^(.*?)\s+(\d+[a-z]?)\s*$/i);
  // "Rua 7" pode ser o nome; "Rua 7 de Setembro, 123" tem número 123.
  if (trailing && streetKey(trailing[1])) return { street: trailing[1].trim(), number: trailing[2] };
  return { street, number: '' };
}
export { normalizeAddress, streetWords, streetKey, parseAddress };

