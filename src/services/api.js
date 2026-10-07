const baseURL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3333')).replace(/\/$/, '');
export const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem('sigma_session') || 'null'); }
  catch { sessionStorage.removeItem('sigma_session'); return null; }
};
export const setSession = value => sessionStorage.setItem('sigma_session', JSON.stringify(value));
export async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(`${baseURL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(getSession()?.token ? { Authorization: `Bearer ${getSession().token}` } : {}), ...options.headers },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000),
    });
  } catch { throw new Error('Não foi possível conectar ao servidor. Verifique se o back-end está iniciado.'); }
  const result = await response.json().catch(() => ({ mensagem: 'Resposta inválida do servidor.' }));
  if (response.status === 401 && !path.startsWith('/auth/')) {
    sessionStorage.removeItem('sigma_session'); window.location.assign('/login');
  }
  if (!response.ok || !result.sucesso) throw new Error(result.mensagem || 'Não foi possível concluir a operação.');
  return result.dados;
}
export async function logout() {
  try { await api('/auth/logout', { method: 'POST' }); } finally { sessionStorage.removeItem('sigma_session'); }
}
