import { Link } from 'react-router-dom';
import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { useNavigate } from 'react-router-dom';
import { api, perform, useCollection, occurrenceView, getSession, refreshScreens } from '../../../services/originalScreens';
import { useState } from "react";
import styles from './chat.module.css';

import arvoreLogo from "../../../assets/arvore.png";

export default function Chat() {
  const navigate = useNavigate();
  const [ocorrencias] = useCollection('/ocorrencias', occurrenceView);
  const [protocolo, setProtocolo] = useState('');
  const ocorrencia = ocorrencias.find(o => String(o.id) === protocolo) || ocorrencias[0];
  const [mensagens] = useCollection(ocorrencia ? `/ocorrencias/${ocorrencia.id}/mensagens` : null);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function enviar() {
    if (!ocorrencia || !mensagem.trim() || enviando) return;
    setEnviando(true); await perform(async () => { await api(`/ocorrencias/${ocorrencia.id}/mensagens`, { method: 'POST', body: { mensagem } }); setMensagem(''); refreshScreens(); }); setEnviando(false);
  }

  return (
    <div className={styles.containerChat}>
      <ResponsiveSidebar alwaysCollapsed className={styles.menuLateral}>
        <nav className="sigma-citizen-navigation" aria-label="Menu do cidadão">
          <Link to="/cidadao">Início</Link>
          <Link to="/relatar-problema">Relatar problema</Link>
          <Link to="/solicitar">Solicitar serviço</Link>
          <Link to="/status">Minhas solicitações</Link>
          <Link to="/chat">Chat com Gestão</Link>
          <Link to="/perfil">Meu perfil</Link>
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
          <button className={styles.btnVoltar} onClick={() => navigate("/cidadao")}>Voltar</button>

        </div>
      </header>

      {/* CONTEÚDO */}
      <section className={styles.chatContainer}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3>Gestão</h3>
          <select aria-label="Solicitação" value={ocorrencia?.id || ''} onChange={e => setProtocolo(e.target.value)}>{ocorrencias.map(o => <option key={o.id} value={o.id}>{o.protocolo_ocorrencia}</option>)}</select>

          <div className={styles.usuarioCard}>
            <div className={styles.avatar}>👤</div>

            <div>
              <h4>Atendimento da Gestão</h4>
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
            {mensagens.map(m => <div key={m.id_mensagem} className={m.id_remetente === getSession()?.usuario.id_usuario ? styles.mensagemDireita : styles.mensagemEsquerda}><strong>{m.nome_usuario}: </strong>{m.mensagem}</div>)}
          </div>

          {/* INPUT */}
          <div className={styles.areaInput}>
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />

            <button onClick={enviar} disabled={!ocorrencia || enviando}>➜</button>
          </div>
        </main>
      </section>
    </div>
  );
}