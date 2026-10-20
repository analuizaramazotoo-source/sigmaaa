import { Link } from 'react-router-dom';
import { getSession } from '../services/api';

export default function NotFound() {
  const role = getSession()?.usuario.tipo_usuario;
  const home = role === 'gestao' ? '/homeg' : role === 'equipe' ? '/homee' : role === 'cidadao' ? '/cidadao' : '/';
  return <main style={{ margin: '48px auto', padding: 24, maxWidth: 560, color: '#064e3b' }}>
    <h1>Página não encontrada</h1>
    <p>Este endereço não está disponível. Use o painel para continuar.</p>
    <Link to={home}>Voltar ao painel</Link>
  </main>;
}
