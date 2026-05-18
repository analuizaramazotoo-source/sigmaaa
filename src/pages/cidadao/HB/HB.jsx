import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HB.module.css";
import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";

const duvidasFrequentes = [
  "Como denunciar lixo irregular?",
  "Quanto tempo demora para resolver?",
  "Posso enviar fotos do problema?",
  "Como acompanhar minha solicitação?",
];

export default function HB() {
  const [menuAberto, setMenuAberto] = useState(false);
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

        <button
          className={styles.menuIcon}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ⋮
        </button>
      </header>

      {/* MENU LATERAL */}
      <div className={`${styles.menuLateral} ${menuAberto ? styles.menuAberto : ""}`}>
        <div className={styles.topoMenu}>
          <button className={styles.btnFechar} onClick={() => setMenuAberto(false)}>
            ✕
          </button>
        </div>
        <hr className={styles.menuDivisor} />
        <button className={`${styles.menuItem} ${styles.menuHome}`}>🏠 Home</button>
        <button className={styles.menuItem} onClick={() => navigate("/relatar-problema")}>
          📄 Relatar problema
        </button>
        <button className={styles.menuItem}>📋 Solicitar serviço</button>
        <button className={styles.menuItem}>📊 Status</button>
        <button className={styles.menuItem}>💬 Chat com Gestão</button>
        <button className={styles.menuItem}>👤 Perfil</button>
      </div>

      {/* BANNER */}
      <section
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerFundo})` }}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.main}>
        {/* CARD DENÚNCIA URGENTE */}
        <div className={styles.cardUrgente}>
          <div className={styles.cardUrgenteHeader}>
            <span className={styles.iconAlert}>⚠️</span>
            <span className={styles.cardUrgenteTitulo}>Denúncia Urgente</span>
          </div>
          <p className={styles.cardUrgenteTexto}>
            EM CASO DE EMERGÊNCIAS AMBIENTAIS, FAÇA UMA DENÚNCIA RÁPIDA.
          </p>
          <button
            className={styles.btnEmergencia}
            onClick={() => navigate("/relatar-problema")}
          >
            RELATAR EMERGÊNCIA
          </button>
        </div>

        {/* CARD DÚVIDAS FREQUENTES */}
        <div className={styles.cardDuvidas}>
          <h3 className={styles.cardDuvidasTitulo}>Dúvidas Frequentes</h3>
          <div className={styles.listaDuvidas}>
            {duvidasFrequentes.map((duvida, index) => (
              <button key={index} className={styles.itemDuvida}>
                {duvida}
              </button>
            ))}
          </div>
          <button className={styles.btnVerTodas}>Ver todas as perguntas</button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerColuna}>
          <h4>Prefeitura do Meio Ambiente</h4>
          <p>Rua Verde, 123, Centro, Cidade - UF</p>
          <p>Atendimento: Segunda a Sexta, 8h - 17h</p>
          <p>email@meioambiente.gov.br</p>
          <p>(00) 1234-5678</p>
        </div>

        <div className={styles.footerColuna}>
          <h4>Sobre</h4>
          <button className={styles.footerLink}>Política Ambiental</button>
          <button className={styles.footerLink}>Contato</button>
        </div>

        <div className={styles.footerColuna}>
          <h4>Redes Sociais:</h4>
          <div className={styles.redesSociais}>
            <button className={`${styles.btnRede} ${styles.facebook}`}>f</button>
            <button className={`${styles.btnRede} ${styles.instagram}`}>📷</button>
            <button className={`${styles.btnRede} ${styles.whatsapp}`}>📱</button>
          </div>
        </div>
      </footer>
    </div>
  );
}