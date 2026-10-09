import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, perform, useCollection, refreshScreens } from '../../../services/originalScreens';
import styles from './configuracoes.module.css';
const emptyTeam = { nome_equipe: '', especialidade_equipe: '', status_equipe: 'disponivel' };
const emptyMember = { id_equipe: '', id_usuario: '', funcao_na_equipe: '' };
const emptyUser = { nome_usuario: '', email_usuario: '', senha_usuario: '', tipo_usuario: 'equipe', matricula_usuario: '', cargo_gestor: '' };
const statuses = { disponivel: 'Disponível', em_campo: 'Em campo', ocupada: 'Ocupada', inativa: 'Inativa' };
export default function Configuracoes() {
  const [equipes] = useCollection('/equipes'), [membros] = useCollection('/membros-equipe'), [usuarios] = useCollection('/usuarios');
  const [tab, setTab] = useState('contas'), [user, setUser] = useState(emptyUser), [team, setTeam] = useState(emptyTeam), [member, setMember] = useState(emptyMember);
  const [busy, setBusy] = useState(false), [message, setMessage] = useState('');
  const staff = usuarios.filter(u => ['gestao', 'equipe'].includes(u.tipo_usuario));
  async function save(e, path, body, reset, editing = false) {
    e.preventDefault(); if (busy) return; setBusy(true); setMessage('');
    try { await perform(async () => { await api(path, { method: editing ? 'PATCH' : 'POST', body }); reset(); refreshScreens(); setMessage('Salvo com sucesso.'); }); }
    finally { setBusy(false); }
  }
  async function remove(path, name, reset) {
    if (busy || !window.confirm(`Excluir ${name}?`)) return;
    setBusy(true); setMessage('');
    try { await perform(async () => { await api(path, { method: 'DELETE' }); reset(); refreshScreens(); setMessage('Registro excluído.'); }); }
    finally { setBusy(false); }
  }
  const input = (label, key, value, setValue, props = {}) => <label>{label}<input {...props} value={value[key] || ''} onChange={e => setValue({ ...value, [key]: e.target.value })} /></label>;
  return <div className={styles.appContainer}>
    <header className={styles.header}><div><h1>Configurações</h1><p>Contas e equipes de Tupã</p></div><Link to="/homeg" className={styles.btnSecondary}>Voltar ao painel</Link></header>
    <main className={styles.mainContent}>
      <nav className={styles.tabs} aria-label="Configurações"><button aria-pressed={tab === 'contas'} onClick={() => { setTab('contas'); setMessage(''); }}>Contas</button><button aria-pressed={tab === 'equipes'} onClick={() => { setTab('equipes'); setMessage(''); }}>Equipes e integrantes</button><Link to="/perfilg">Meu perfil e senha</Link></nav>
      {message && <p className={styles.success} role="status">{message}</p>}
      {tab === 'contas' ? <div className={styles.contentGrid}>
        <section className={styles.cardSection}><h2>Criar conta</h2><p>Cada pessoa precisa de um e-mail próprio. Depois, vincule os integrantes à equipe.</p>
          <form className={styles.modalForm} onSubmit={e => save(e, '/usuarios', user, () => setUser(emptyUser))}>
            {input('Nome completo *', 'nome_usuario', user, setUser, { required: true, autoComplete: 'name' })}
            {input('E-mail *', 'email_usuario', user, setUser, { required: true, type: 'email', autoComplete: 'email' })}
            <label>Perfil *<select value={user.tipo_usuario} onChange={e => setUser({ ...user, tipo_usuario: e.target.value })}><option value="equipe">Equipe — trabalho em campo</option><option value="gestao">Gestão — administração</option></select></label>
            {input('Senha inicial * (mínimo 8 caracteres)', 'senha_usuario', user, setUser, { required: true, type: 'password', minLength: 8, maxLength: 128, autoComplete: 'new-password' })}
            <div className={styles.formRow}>{input('Matrícula (opcional)', 'matricula_usuario', user, setUser, { maxLength: 50 })}{input('Cargo (opcional)', 'cargo_gestor', user, setUser, { maxLength: 100 })}</div>
            <button className={styles.btnPrimaryModal} disabled={busy}>{busy ? 'Aguarde...' : 'Criar conta'}</button>
          </form>
        </section>
        <section className={styles.cardSection}><h2>Contas cadastradas ({staff.length})</h2><ul className={styles.recordList}>{staff.map(u => <li key={u.id_usuario}><strong>{u.nome_usuario}</strong><span>{u.email_usuario}</span><small>{u.tipo_usuario === 'gestao' ? 'Gestão' : 'Equipe'}</small></li>)}</ul>{!staff.length && <p>Nenhuma conta carregada.</p>}</section>
      </div> : <div className={styles.contentGrid}>
        <section className={styles.cardSection}><h2>{team.id_equipe ? 'Editar equipe' : 'Criar equipe'}</h2>
          <form className={styles.modalForm} onSubmit={e => save(e, `/equipes${team.id_equipe ? '/' + team.id_equipe : ''}`, team, () => setTeam(emptyTeam), Boolean(team.id_equipe))}>
            {input('Nome da equipe *', 'nome_equipe', team, setTeam, { required: true })}{input('Especialidade', 'especialidade_equipe', team, setTeam)}
            <label>Status<select value={team.status_equipe} onChange={e => setTeam({ ...team, status_equipe: e.target.value })}>{Object.entries(statuses).map(([v, label]) => <option key={v} value={v}>{label}</option>)}</select></label>
            <div className={styles.actions}><button className={styles.btnPrimaryModal} disabled={busy}>{busy ? 'Aguarde...' : 'Salvar equipe'}</button>{team.id_equipe && <button type="button" className={styles.btnSecondary} disabled={busy} onClick={() => setTeam(emptyTeam)}>Cancelar edição</button>}</div>
          </form>
          <ul className={styles.recordList}>{equipes.map(t => <li key={t.id_equipe}><strong>{t.nome_equipe}</strong><span>{statuses[t.status_equipe]} · {membros.filter(m => m.id_equipe === t.id_equipe).length} integrante(s)</span><div className={styles.actions}><button className={styles.btnSecondary} disabled={busy} onClick={() => setTeam(t)}>Editar</button><button className={styles.btnDanger} disabled={busy} onClick={() => remove(`/equipes/${t.id_equipe}`, `a equipe ${t.nome_equipe}`, () => { if (team.id_equipe === t.id_equipe) setTeam(emptyTeam); })}>Excluir</button></div></li>)}</ul>
        </section>
        <section className={styles.cardSection}><h2>{member.id_membro ? 'Editar integrante' : 'Adicionar integrante'}</h2>
          <form className={styles.modalForm} onSubmit={e => save(e, `/membros-equipe${member.id_membro ? '/' + member.id_membro : ''}`, member, () => setMember(emptyMember), Boolean(member.id_membro))}>
            <label>Equipe *<select required value={member.id_equipe} onChange={e => setMember({ ...member, id_equipe: e.target.value })}><option value="">Selecione a equipe</option>{equipes.map(t => <option key={t.id_equipe} value={t.id_equipe}>{t.nome_equipe}</option>)}</select></label>
            <label>Pessoa *<select required value={member.id_usuario} onChange={e => setMember({ ...member, id_usuario: e.target.value })}><option value="">Selecione uma conta</option>{staff.map(u => <option key={u.id_usuario} value={u.id_usuario}>{u.nome_usuario} — {u.email_usuario}</option>)}</select></label>
            {input('Função', 'funcao_na_equipe', member, setMember)}
            <div className={styles.actions}><button className={styles.btnPrimaryModal} disabled={busy}>{busy ? 'Aguarde...' : 'Salvar integrante'}</button>{member.id_membro && <button type="button" className={styles.btnSecondary} disabled={busy} onClick={() => setMember(emptyMember)}>Cancelar edição</button>}</div>
          </form>
          <ul className={styles.recordList}>{membros.map(m => <li key={m.id_membro}><strong>{staff.find(u => u.id_usuario === m.id_usuario)?.nome_usuario || `Conta ${m.id_usuario}`}</strong><span>{equipes.find(t => t.id_equipe === m.id_equipe)?.nome_equipe || `Equipe ${m.id_equipe}`}{m.funcao_na_equipe && ` · ${m.funcao_na_equipe}`}</span><div className={styles.actions}><button className={styles.btnSecondary} disabled={busy} onClick={() => setMember(m)}>Editar</button><button className={styles.btnDanger} disabled={busy} onClick={() => remove(`/membros-equipe/${m.id_membro}`, 'o vínculo desta pessoa com a equipe', () => { if (member.id_membro === m.id_membro) setMember(emptyMember); })}>Remover da equipe</button></div></li>)}</ul>
        </section>
      </div>}
    </main>
  </div>;
}
