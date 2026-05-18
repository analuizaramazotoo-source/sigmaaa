import { useState } from "react";
import styles from "./homec.module.css";

import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";

export default function Homec() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className={styles.containerHome}>
      {/* HEADER */}
      <header className={styles.headerHome}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="Logo Meio Ambiente" />

          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <button
          className={styles.menuIcon}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ⋮
        </button>
      </header>

      {/* MENU LATERAL */}
      <div
        className={`${styles.menuLateral} ${
          menuAberto ? styles.menuAberto : ""
        }`}
      >
        <div className={styles.topoMenu}>
          <button
            className={styles.btnFechar}
            onClick={() => setMenuAberto(false)}
          >
            ✕
          </button>
        </div>

        <button className={`${styles.menuItem} ${styles.menuAtivo}`}>
          🏠 Home
        </button>

        <button className={styles.menuItem}>
          📋 Relatar
        </button>

        <button className={styles.menuItem}>
          📌 Solicitar
        </button>

        <button className={styles.menuItem}>
          📊 Status
        </button>

        <button className={styles.menuItem}>
          💬 Chat com Gestão
        </button>

        <button className={styles.menuItem}>
          👤 Perfil
        </button>

        <div className={styles.menuFooter}>
          <img src={arvoreLogo} alt="logo" />
          <h3>SECRETARIA DO MEIO AMBIENTE</h3>
        </div>
      </div>

      {/* BANNER */}
      <section
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerFundo})` }}
      >
        <div className={styles.overlayBanner}>
          <h1>Bem-vindo!</h1>
          <p>Colabore com o Meio Ambiente!</p>
        </div>
      </section>

      {/* CARDS */}
      <section className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardAzul}`}>
          <div className={styles.cardIcon}>📋</div>

          <h2>Relatar um Problema</h2>

          <p>
            Utilize este espaço para descrever detalhadamente qualquer problema
            encontrado.
          </p>

          <button>ENVIAR RELATO</button>
        </div>

        <div className={`${styles.card} ${styles.cardVerde}`}>
          <div className={styles.cardIcon}>📍</div>

          <h2>Solicitar Serviço</h2>

          <p>
            Faça solicitações ambientais e acompanhe todo o andamento.
          </p>

          <button>PREENCHER SOLICITAÇÃO</button>
        </div>

        <div className={`${styles.card} ${styles.cardLaranja}`}>
          <div className={styles.cardIcon}>🌳</div>

          <h2>Acompanhar Solicitação</h2>

          <p>
            Consulte o andamento das suas solicitações em tempo real.
          </p>

          <button>MINHAS SOLICITAÇÕES</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footerHome}></footer>
    </div>
  );
}