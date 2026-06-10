import { useState } from "react";
import { Link } from "react-router-dom";

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

        <Link to="/relatar-problema">
          <button className={styles.menuItem}>📋 Relatar</button>
        </Link>

        <Link to="/solicitar">
          <button className={styles.menuItem}>📌 Solicitar</button>
        </Link>

        <Link to="/status">
          <button className={styles.menuItem}>📊 Status</button>
        </Link>

        <Link to="/chat">
          <button className={styles.menuItem}>💬 Chat com Gestão</button>
        </Link>

        <Link to="/perfil">
          <button className={styles.menuItem}>👤 Perfil</button>
        </Link>

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

          <Link to="/relatar-problema">
            <button type="button">ENVIAR RELATO</button>
          </Link>
        </div>

        <div className={`${styles.card} ${styles.cardVerde}`}>
          <div className={styles.cardIcon}>📍</div>

          <h2>Solicitar Serviço</h2>

          <p>
            Faça solicitações ambientais e acompanhe todo o andamento.
          </p>

          <Link to="/solicitar">
            <button type="button">PREENCHER SOLICITAÇÃO</button>
          </Link>
        </div>

        <div className={`${styles.card} ${styles.cardLaranja}`}>
          <div className={styles.cardIcon}>🌳</div>

          <h2>Acompanhar Solicitação</h2>

          <p>
            Consulte o andamento das suas solicitações em tempo real.
          </p>

          <Link to="/status">
            <button type="button">MINHAS SOLICITAÇÕES</button>
          </Link>
        </div>
      </section>
    </div>
  );
}