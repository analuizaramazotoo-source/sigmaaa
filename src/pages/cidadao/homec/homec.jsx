import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./homec.module.css";
import hbStyles from "./HB.module.css";

import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";

const duvidasFrequentes = [
  "Como denunciar lixo irregular?",
  "Quanto tempo demora para resolver?",
  "Posso enviar fotos do problema?",
  "Como acompanhar minha solicitação?",
];

export default function Homec() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* TELA HOME */}
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

          <button className={styles.menuItem}>📋 Relatar</button>

          <button className={styles.menuItem}>📌 Solicitar</button>

          <button className={styles.menuItem}>📊 Status</button>

          <button className={styles.menuItem}>💬 Chat com Gestão</button>

          <button className={styles.menuItem}>👤 Perfil</button>

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

           <Link to ="/relatar-problema"> <button>ENVIAR RELATO</button></Link>
          </div>

          <div className={`${styles.card} ${styles.cardVerde}`}>
            <div className={styles.cardIcon}>📍</div>

            <h2>Solicitar Serviço</h2>

            <p>
              Faça solicitações ambientais e acompanhe todo o andamento.
            </p>

            <Link to ="/solicitar"> <button>PREENCHER SOLICITAÇÃO</button></Link>
          </div>

          <div className={`${styles.card} ${styles.cardLaranja}`}>
            <div className={styles.cardIcon}>🌳</div>

            <h2>Acompanhar Solicitação</h2>

            <p>
              Consulte o andamento das suas solicitações em tempo real.
            </p>

            <Link to =""> <button>MINHAS SOLICITAÇÕES</button></Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footerHome}></footer>
      </div>

      {/* COMPONENTE HB */}
      <HB />
    </>
  );
}

/* COMPONENTE SECUNDÁRIO */
function HB() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={hbStyles.container}>
      {/* HEADER */}
      <header className={hbStyles.header}>
        <div className={hbStyles.logoArea}>
          <img src={arvoreLogo} alt="logo" />

          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <button
          className={hbStyles.menuIcon}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ⋮
        </button>
      </header>

      {/* MENU LATERAL */}
      <div
        className={`${hbStyles.menuLateral} ${
          menuAberto ? hbStyles.menuAberto : ""
        }`}
      >
        <div className={hbStyles.topoMenu}>
          <button
            className={hbStyles.btnFechar}
            onClick={() => setMenuAberto(false)}
          >
            ✕
          </button>
        </div>

        <hr className={hbStyles.menuDivisor} />

        <button className={`${hbStyles.menuItem} ${hbStyles.menuHome}`}>
          🏠 Home
        </button>

        <button
          className={hbStyles.menuItem}
          onClick={() => navigate("/relatar-problema")}
        >
          📄 Relatar problema
        </button>

        <button className={hbStyles.menuItem}>
          📋 Solicitar serviço
        </button>

        <button className={hbStyles.menuItem}>📊 Status</button>

        <button className={hbStyles.menuItem}>
          💬 Chat com Gestão
        </button>

        <button className={hbStyles.menuItem}>👤 Perfil</button>
      </div>

      {/* BANNER */}
      <section
        className={hbStyles.banner}
        style={{ backgroundImage: `url(${bannerFundo})` }}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <main className={hbStyles.main}>
        {/* CARD DENÚNCIA URGENTE */}
        <div className={hbStyles.cardUrgente}>
          <div className={hbStyles.cardUrgenteHeader}>
            <span className={hbStyles.iconAlert}>⚠️</span>

            <span className={hbStyles.cardUrgenteTitulo}>
              Denúncia Urgente
            </span>
          </div>

          <p className={hbStyles.cardUrgenteTexto}>
            EM CASO DE EMERGÊNCIAS AMBIENTAIS, FAÇA UMA DENÚNCIA RÁPIDA.
          </p>

          <button
            className={hbStyles.btnEmergencia}
            onClick={() => navigate("/relatar-problema")}
          >
            RELATAR EMERGÊNCIA
          </button>
        </div>

        {/* CARD DÚVIDAS */}
        <div className={hbStyles.cardDuvidas}>
          <h3 className={hbStyles.cardDuvidasTitulo}>
            Dúvidas Frequentes
          </h3>

          <div className={hbStyles.listaDuvidas}>
            {duvidasFrequentes.map((duvida, index) => (
              <button key={index} className={hbStyles.itemDuvida}>
                {duvida}
              </button>
            ))}
          </div>

          <button className={hbStyles.btnVerTodas}>
            Ver todas as perguntas
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={hbStyles.footer}>
        <div className={hbStyles.footerColuna}>
          <h4>Prefeitura do Meio Ambiente</h4>

          <p>Rua Verde, 123, Centro, Cidade - UF</p>

          <p>Atendimento: Segunda a Sexta, 8h - 17h</p>

          <p>email@meioambiente.gov.br</p>

          <p>(00) 1234-5678</p>
        </div>

        <div className={hbStyles.footerColuna}>
          <h4>Sobre</h4>

          <button className={hbStyles.footerLink}>
            Política Ambiental
          </button>

          <button className={hbStyles.footerLink}>
            Contato
          </button>
        </div>

        <div className={hbStyles.footerColuna}>
          <h4>Redes Sociais:</h4>

          <div className={hbStyles.redesSociais}>
            <button
              className={`${hbStyles.btnRede} ${hbStyles.facebook}`}
            >
              f
            </button>

            <button
              className={`${hbStyles.btnRede} ${hbStyles.instagram}`}
            >
              📷
            </button>

            <button
              className={`${hbStyles.btnRede} ${hbStyles.whatsapp}`}
            >
              📱
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}