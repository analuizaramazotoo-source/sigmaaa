import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../services/api';
export function Guard({ children, roles }) {
  const user = getSession()?.usuario;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.tipo_usuario)) return <Navigate to={user.tipo_usuario === 'gestao' ? '/homeg' : user.tipo_usuario === 'equipe' ? '/homee' : '/cidadao'} replace />;
  return children;
}
export function ConnectionFeedback() {
  const [error, setError] = useState('');
  useEffect(() => { const show = event => setError(event.detail); window.addEventListener('sigma:error', show); return () => window.removeEventListener('sigma:error', show); }, []);
  if (!error) return null;
  return <div role="alert" style={{ position: 'fixed', bottom: 20, right: 20, maxWidth: 420, background: '#fff', border: '1px solid #ef4444', borderRadius: 8, padding: 16, color: '#b91c1c', zIndex: 10000 }}>{error}<button onClick={() => setError('')} style={{ marginLeft: 12 }}>Fechar</button></div>;
}
