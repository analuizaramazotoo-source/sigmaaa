import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Status.module.css";
import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";

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
  const [menuAberto, setMenuAberto] = useState(false);
  const [etapaAtiva, setEtapaAtiva] = useState(2);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="logo" />
          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles.headerButtons}>
          <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button
            className={styles.menuIcon}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ⋮
          </button>
        </div>
      </header>

      {/* MENU LATERAL */}
      <div className={`${styles.menuLateral} ${menuAberto ? styles.menuAberto : ""}`}>
        <div className={styles.topoMenu}>
          <button className={styles.btnFechar} onClick={() => setMenuAberto(false)}>✕</button>
        </div>
        <hr className={styles.menuDivisor} />

        <Link to="/">
          <button className={`${styles.menuItem} ${styles.menuHome}`}>
            🏠 Home
          </button>
        </Link>

        <Link to="/relatar-problema">
          <button className={styles.menuItem}>
            📄 Relatar problema
          </button>
        </Link>

        <Link to="/solicitar">
          <button className={styles.menuItem}>
            📋 Solicitar serviço
          </button>
        </Link>

        <Link to="/chat">
          <button className={styles.menuItem}>
            💬 Chat com Gestão
          </button>
        </Link>

        <Link to="/perfil">
          <button className={styles.menuItem}>
            👤 Perfil
          </button>
        </Link>
      </div>

      {/* BANNER */}
      <section
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerFundo})` }}
      />

      {/* CARD PRINCIPAL */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.titulo}>Status da Solicitação</h2>

          {/* LINHA DO TEMPO */}
          <div className={styles.timeline}>
            <div className={styles.timelineLinha}>
              {etapas.map((_, i) => (
                i < etapas.length - 1 && (
                  <div
                    key={i}
                    className={styles.timelineSegmento}
                    style={{
                      background: i < etapaAtiva ? "#2e7d4e" : "#ccc",
                    }}
                  />
                )
              ))}
            </div>

            <div className={styles.timelineEtapas}>
              {etapas.map((etapa, i) => (
                <div key={i} className={styles.etapaItem}>
                  <button
                    className={styles.etapaPonto}
                    style={{
                      background: i <= etapaAtiva ? etapa.cor : "#ccc",
                      boxShadow: i === etapaAtiva
                        ? `0 0 0 4px ${etapa.cor}44`
                        : "none",
                      transform: i === etapaAtiva ? "scale(1.25)" : "scale(1)",
                    }}
                    onClick={() => setEtapaAtiva(i)}
                  />
                  <span
                    className={styles.etapaLabel}
                    style={{ fontWeight: i === etapaAtiva ? "700" : "400" }}
                  >
                    {etapa.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MAPA */}
          <div className={styles.mapaWrapper}>
            <div className={styles.mapa}>
              <div className={styles.mapaLinhaH} />
              <div className={styles.mapaLinhaV} />
              <div className={styles.caminhao}>🚛</div>
              <div className={styles.pontoAmarelo} />
              <div className={styles.ruaAzul} />
            </div>
          </div>

          {/* MENSAGEM */}
          <p className={styles.mensagem}>{mensagens[etapaAtiva]}</p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer} />
    </div>
  );
}