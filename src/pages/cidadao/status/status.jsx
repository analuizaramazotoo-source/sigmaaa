import { useCollection, occurrenceView, getSession } from '../../../services/originalScreens';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './status.module.css';
import TupaMap from '../../../components/TupaMap';
import {
  ArrowLeft,
  User,
  Clock,
  Trees
} from "lucide-react";

const etapas = [
  { label: "Enviado", cor: "#e74c3c" },
  { label: "Análise", cor: "#e67e22" },
  { label: "Em atendimento", cor: "#27ae60" },
  { label: "Concluído", cor: "#196f3d" },
];

const mensagens = [
  "Sua solicitação foi enviada com sucesso.",
  "Sua solicitação está sendo analisada pela equipe.",
  "Sua solicitação está em atendimento. Consulte as mensagens para mais detalhes.",
  "Problema resolvido com sucesso. Obrigado!",
];

export default function Status() {
  const [solicitacoes, , consulta] = useCollection('/ocorrencias', occurrenceView);
  const [selecionada, setSelecionada] = useState('');
  const solicitacao = solicitacoes.find(o => String(o.id) === selecionada) || solicitacoes[0];
  const etapaAtiva = solicitacao ? ({ aberta: 0, em_analise: 1, em_andamento: 2, resolvida: 3, arquivada: -1 }[solicitacao.status_ocorrencia] ?? -1) : -1;
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO SUPERIOR NO PADRÃO EXATO DO PORTAL */}
        <header className={styles.topHeader}>
          <div className={styles.brandHeader}>
            <div className={styles.logoIcon}>
              <Trees size={22} color="#ffffff" />
            </div>
            <div className={styles.brandText}>
              <strong>PAINEL DO CIDADÃO</strong>
              <span>SEGURO AMBIENTAL</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <Link to="/perfil" className={styles.userInfoBox}>
              <div className={styles.userAvatarIcon}>
                <User size={18} />
              </div>
              <div className={styles.userDetails}>
                <strong>{getSession()?.usuario.nome_usuario}</strong>
                <span>Cidadão • Ativo</span>
              </div>
            </Link>

            <button 
              type="button" 
              className={styles.btnVoltarTopo} 
              onClick={() => navigate('/cidadao')}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CONTEÚDO CENTRAL */}
        <main className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.card}>
              
              {/* CABEÇALHO DO CARD */}
              <div className={styles.cardHeader}>
                <div className={styles.iconBadge}>
                  <Clock size={24} />
                </div>
                <div>
                  <h2>Status da Solicitação</h2>
                  <p>Veja o andamento e as mensagens de cada solicitação</p>
                </div>
              </div>

              <div className={styles.statusBox}>
                <select aria-label="Solicitação" disabled={!solicitacoes.length} value={solicitacao?.id || ''} onChange={e => setSelecionada(e.target.value)}>
                  {solicitacoes.map(o => <option key={o.id} value={o.id}>{o.protocolo_ocorrencia} — {o.titulo}</option>)}
                </select>
                <p>{solicitacao ? `${solicitacao.protocolo_ocorrencia} — ${solicitacao.endereco}` : consulta.loading ? 'Carregando suas solicitações...' : consulta.error ? 'Não foi possível carregar suas solicitações. Tente atualizar a página.' : 'Nenhuma solicitação cadastrada.'}</p>
                {solicitacao ? <Link className={styles.btnMensagem} to={`/chat?ocorrencia=${solicitacao.id}`}>Ver mensagens / falar com a gestão</Link> : !consulta.loading && !consulta.error && <Link className={styles.btnMensagem} to="/relatar-problema">Registrar meu primeiro relato</Link>}
              </div>
              {/* TIMELINE DE ETAPAS */}
              <div className={styles.timelineWrapper}>
                {etapas.map((etapa, i) => (
                  <React.Fragment key={i}>
                    <div className={styles.etapaItem} >
                      <div
                        className={styles.etapaPonto}
                        style={{
                          backgroundColor: i <= etapaAtiva ? etapa.cor : "#d1d5db",
                          boxShadow: i === etapaAtiva ? `0 0 0 4px ${etapa.cor}33` : "none"
                        }}
                      />
                      <span 
                        className={styles.etapaLabel}
                        style={{
                          fontWeight: i === etapaAtiva ? "bold" : "normal",
                          color: i === etapaAtiva ? "var(--brand-dark)" : "#666"
                        }}
                      >
                        {etapa.label}
                      </span>
                    </div>

                    {i < etapas.length - 1 && (
                      <div 
                        className={styles.timelineSegmento}
                        style={{
                          backgroundColor: i < etapaAtiva ? "var(--brand-primary)" : "#e5e7eb"
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CAIXA DO MAPA (CONTIDA) */}
              <TupaMap occurrences={solicitacao ? [solicitacao] : []} selectedLocation={solicitacao} height={300} />

              {/* MENSAGEM DO STATUS */}
              <div className={styles.statusBox}>
                <p className={styles.mensagem}>{solicitacao?.status_ocorrencia === 'arquivada' ? 'Solicitação arquivada.' : mensagens[etapaAtiva] || 'Envie um relato para acompanhar o atendimento.'}</p>
              </div>

            </div>
          </div>
        </main>

        <footer className={styles.footerGlobal}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>
    </div>
  );
}
