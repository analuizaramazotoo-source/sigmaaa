import { Link, useSearchParams } from 'react-router-dom';
import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { useNavigate } from 'react-router-dom';
import { api, perform, useCollection, occurrenceView, getSession, refreshScreens } from '../../../services/originalScreens';
import { useState } from "react";
import styles from './chat.module.css';

import arvoreLogo from "../../../assets/arvore.png";

export default function Chat() {
  const navigate = useNavigate();
  const [ocorrencias, , consultaOcorrencias] = useCollection('/ocorrencias', occurrenceView);
  const [params, setParams] = useSearchParams();
  const protocolo = params.get('ocorrencia');
  const ocorrencia = protocolo ? ocorrencias.find(o => String(o.id) === protocolo) : ocorrencias[0];
  const [mensagens, , consultaMensagens] = useCollection(ocorrencia ? `/ocorrencias/${ocorrencia.id}/mensagens` : null);
  const [enviando, setEnviando] = useState(false);
  const [rascunho, setRascunho] = useState({ id: null, texto: '' });
  const mensagem = rascunho.id === ocorrencia?.id ? rascunho.texto : '';
  const role = getSession()?.usuario.tipo_usuario;
  const inicio = role === 'gestao' ? '/homeg' : role === 'equipe' ? '/homee' : '/cidadao';

  async function enviar(event) {
    event.preventDefault();
    if (!ocorrencia || !mensagem.trim() || enviando) return;
    const id = ocorrencia.id;
    setEnviando(true); await perform(async () => { await api(`/ocorrencias/${id}/mensagens`, { method: 'POST', body: { mensagem: mensagem.trim() } }); setRascunho(current => current.id === id ? { id, texto: '' } : current); refreshScreens(); }); setEnviando(false);
  }

  return (
    <div className={styles.containerChat}>
      <ResponsiveSidebar alwaysCollapsed className={styles.menuLateral}>
        <nav className="sigma-citizen-navigation" aria-label="Menu do cidadão">
          <Link to={inicio}>Início</Link>
          {role === 'cidadao' && <>
          <Link to="/relatar-problema">Relatar problema</Link>
          <Link to="/status">Minhas solicitações</Link>
          <Link to="/perfil">Meu perfil</Link>
          </>}
          <Link to="/chat">Mensagens das solicitações</Link>
        </nav>
      </ResponsiveSidebar>

      {/* HEADER */}
      <header className={styles.headerChat}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="Logo Meio Ambiente" />

          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles.headerDireita}>
          <button className={styles.btnVoltar} onClick={() => navigate(role === 'cidadao' ? '/status' : inicio)}>Voltar</button>

        </div>
      </header>

      {/* CONTEÚDO */}
      <section className={styles.chatContainer}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3>Solicitações</h3>
          <select aria-label="Solicitação" disabled={!ocorrencias.length} value={ocorrencia?.id || ''} onChange={e => setParams({ ocorrencia: e.target.value }, { replace: true })}>{!ocorrencia && <option value="">Selecione uma solicitação</option>}{ocorrencias.map(o => <option key={o.id} value={o.id}>{o.protocolo_ocorrencia} — {o.titulo}</option>)}</select>

          <div className={styles.usuarioCard}>
            <div className={styles.avatar}>👤</div>

            <div>
              <h4>{role === 'cidadao' ? 'Atendimento da Gestão' : ocorrencia?.nome_cidadao || 'Atendimento ao cidadão'}</h4>
              <span>Mensagens da ocorrência</span>
            </div>
          </div>
        </aside>

        {/* ÁREA CHAT */}
        <main className={styles.chatArea}>
          {/* TOPO CHAT */}
          <div className={styles.chatTopo}>
            <div className={styles.chatUsuario}>
              <div className={styles.avatarTopo}>👤</div>

              <h3>{ocorrencia?.protocolo_ocorrencia || "Selecione uma solicitação"}</h3>
            </div>
          </div>

          {/* MENSAGENS */}
          <div className={styles.mensagens}>
            {!ocorrencia && <p>{consultaOcorrencias.loading ? 'Carregando solicitações...' : consultaOcorrencias.error ? 'Não foi possível carregar as solicitações.' : 'Nenhuma solicitação disponível para este protocolo.'}</p>}
            {ocorrencia && consultaMensagens.loading && <p role="status">Carregando mensagens...</p>}
            {ocorrencia && !consultaMensagens.loading && !mensagens.length && <p>{consultaMensagens.error ? 'Não foi possível carregar as mensagens. Tente atualizar a página.' : 'Ainda não há mensagens nesta solicitação.'}</p>}
            {mensagens.map(m => <div key={m.id_mensagem} className={m.id_remetente === getSession()?.usuario.id_usuario ? styles.mensagemDireita : styles.mensagemEsquerda}><strong>{m.nome_usuario}: </strong>{m.mensagem}</div>)}
          </div>

          {/* INPUT */}
          <form className={styles.areaInput} onSubmit={enviar}>
            <input
              type="text"
              aria-label="Mensagem"
              disabled={!ocorrencia || enviando}
              placeholder="Digite uma mensagem..."
              value={mensagem}
              onChange={(e) => setRascunho({ id: ocorrencia.id, texto: e.target.value })}
            />

            <button type="submit" aria-label="Enviar mensagem" disabled={!ocorrencia || enviando || !mensagem.trim()}>➜</button>
          </form>
        </main>
      </section>
    </div>
  );
}
