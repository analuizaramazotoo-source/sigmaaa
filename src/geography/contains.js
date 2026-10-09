// GeoJSON usa [longitude, latitude]. Inclui pontos sobre o limite.
function ringContains(ring, x, y) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[j], [bx, by] = ring[i];
    const cross = (x - ax) * (by - ay) - (y - ay) * (bx - ax);
    if (Math.abs(cross) < 1e-12 && x >= Math.min(ax, bx) && x <= Math.max(ax, bx) && y >= Math.min(ay, by) && y <= Math.max(ay, by)) return true;
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside;
  }
  return inside;
}
function contains(geojson, latitude, longitude) {
  if (!['number', 'string'].includes(typeof latitude) || !['number', 'string'].includes(typeof longitude) || String(latitude).trim() === '' || String(longitude).trim() === '') return false;
  const y = Number(latitude), x = Number(longitude);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  return geojson.features.some(({ geometry }) => {
    const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.type === 'MultiPolygon' ? geometry.coordinates : [];
    return polygons.some(([outer, ...holes]) => ringContains(outer, x, y) && !holes.some(hole => ringContains(hole, x, y)));
  });
}
export { contains };

