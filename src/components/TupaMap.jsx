import { lazy, Suspense } from 'react';
const MapView = lazy(() => import('./TupaMapView'));
export default function TupaMap(props) {
  return <Suspense fallback={<div style={{ minHeight: props.height || 340, padding: 20 }} role="status">Carregando mapa de Tupã...</div>}><MapView {...props} /></Suspense>;
}
