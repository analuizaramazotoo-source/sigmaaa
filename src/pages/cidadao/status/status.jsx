import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Status.module.css";
import {
  ArrowLeft,
  User,
  Clock,
  Trees
} from "lucide-react";

const etapas = [
  { label: "Enviado", cor: "#e74c3c" },
  { label: "Análise", cor: "#e67e22" },
  { label: "Equipe a caminho", cor: "#f1c40f" },
  { label: "Resolvendo", cor: "#27ae60" },
  { label: "Concluído", cor: "#196f3d" },
];

const mensagens = [
  "Sua solicitação foi enviada com sucesso.",
  "Sua solicitação está sendo analisada pela equipe.",
  "A equipe da prefeitura está a caminho do local da ocorrência.",
  "A equipe está resolvendo o problema no local.",
  "Problema resolvido com sucesso. Obrigado!",
];

export default function Status() {
  const [etapaAtiva, setEtapaAtiva] = useState(2);
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
                <strong>Ana Luiza Silva</strong>
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
                  <p>Acompanhe o andamento em tempo real do seu chamado</p>
                </div>
              </div>

              {/* TIMELINE DE ETAPAS */}
              <div className={styles.timelineWrapper}>
                {etapas.map((etapa, i) => (
                  <React.Fragment key={i}>
                    <div className={styles.etapaItem} onClick={() => setEtapaAtiva(i)}>
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
              <div className={styles.mapaPlaceholder}>
                <div className={styles.mapaGridH} />
                <div className={styles.mapaGridV} />
                <div className={styles.caminhaoIcon}>🚛</div>
                <div className={styles.pontoOcorrencia} />
              </div>

              {/* MENSAGEM DO STATUS */}
              <div className={styles.statusBox}>
                <p className={styles.mensagem}>{mensagens[etapaAtiva]}</p>
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