import { useState, useEffect } from "react";
import styles from "./homec.module.css";

/* ── Menu items ── */
const MENU_ITEMS = [
  { label: "Home",            icon: "🏠", home: true  },
  { label: "Relatar",         icon: "📋", home: false },
  { label: "Solicitar",       icon: "📝", home: false },
  { label: "Status",          icon: "📊", home: false },
  { label: "Chat Com Gestão", icon: "💬", home: false },
  { label: "Perfil",          icon: "👤", home: false },
];

/* ── Cards ── */
const CARDS = [
  {
    key: "relatar",
    cls: "cardRelatar",
    icon: "📋",
    title: "Relatar um Problema",
    desc: "Utilize este espaço para descrever detalhadamente qualquer problema encontrado. Informe o máximo de informações possível para que nossa equipe possa analisar a situação e tomar as providências necessárias com mais agilidade.",
    btn: "ENVIAR RELATO",
  },
  {
    key: "solicitar",
    cls: "cardSolicitar",
    icon: "📍",
    title: "Solicitar Serviço",
    desc: "Preencha os dados necessários para solicitar um serviço de forma clara e organizada. Quanto mais detalhes forem informados, mais eficiente será o atendimento e a execução da sua solicitação.",
    btn: "PREENCHER SOLICITAÇÃO",
  },
  {
    key: "status",
    cls: "cardStatus",
    icon: "🌿",
    title: "Acompanhar Solicitações",
    desc: "Acompanhe em tempo real o status das suas solicitações. Consulte as respostas da equipe e garanta mais transparência em todo o processo.",
    btn: "MINHAS SOLICITAÇÕES",
  },
];

export default function Homec() {
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuAberto(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuAberto]);

  return (
    <div className={styles.page}>

      {/* ════════ HEADER ════════ */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <div className={styles.logoImgBox}>🌳</div>
          <div className={styles.logoTexts}>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <span className={styles.breadcrumb}>Home - cidadão</span>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuAberto(true)}
          aria-label="Abrir menu"
        >
          ⋮
        </button>
      </header>

      {/* ════════ OVERLAY ════════ */}
      <div
        className={`${styles.overlay} ${menuAberto ? styles.visible : ""}`}
        onClick={() => setMenuAberto(false)}
        aria-hidden="true"
      />

      {/* ════════ MENU LATERAL ════════ */}
      <nav className={`${styles.menuLateral} ${menuAberto ? styles.aberto : ""}`}>
        <div className={styles.menuTopo}>
          <button className={styles.btnFechar} onClick={() => setMenuAberto(false)}>✕</button>
        </div>

        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`${styles.menuItem} ${item.home ? styles.menuItemHome : ""}`}
          >
            <span className={styles.menuItemIcon}>{item.icon}</span>
            <span className={styles.menuItemLabel}>{item.label}</span>
          </button>
        ))}

        {/* Rodapé menu — logo Prefeitura de Tupã */}
        <div className={styles.menuFooter}>
          <span className={styles.menuFooterIcon}>🌳</span>
          <div className={styles.menuFooterTexts}>
            <p>Prefeitura</p>
            <p>da Estância Turística</p>
            <strong>de Tupã</strong>
          </div>
        </div>
      </nav>

      {/* ════════ INNER (borda verde lateral) ════════ */}
      <div className={styles.inner}>

        {/* ════════ BANNER ════════ */}
        <section className={styles.banner}>
          {/* céu + gramado */}
          <div className={styles.sky} />

          {/* sol */}
          <div className={styles.sun} />

          {/* nuvens com pseudo-elementos via CSS */}
          <div className={`${styles.cloud} ${styles.cloud1}`} />
          <div className={`${styles.cloud} ${styles.cloud2}`} />
          <div className={`${styles.cloud} ${styles.cloud3}`} />

          {/* pássaros */}
          <div className={styles.birds}>
            {[...Array(5)].map((_, i) => <div key={i} className={styles.bird} />)}
          </div>

          {/* colinas */}
          <div className={styles.hillBack} />
          <div className={styles.hillMid} />
          <div className={styles.hillFront} />

          {/* decorações: prédios, árvores, moinho — posicionados fiéis ao print */}
          {/* lado esquerdo */}
          <span className={`${styles.deco} ${styles.decoSm}`} style={{ bottom: 50, left: "3%"  }}>🌳</span>
          <span className={`${styles.deco}`}                   style={{ bottom: 48, left: "8%"  }}>🌲</span>
          <span className={`${styles.deco} ${styles.decoLg}`}  style={{ bottom: 44, left: "14%" }}>🌳</span>
          <span className={`${styles.deco} ${styles.decoSm}`}  style={{ bottom: 66, left: "20%" }}>🏠</span>
          <span className={`${styles.deco}`}                   style={{ bottom: 60, left: "26%" }}>🏢</span>
          <span className={`${styles.deco} ${styles.decoSm}`}  style={{ bottom: 56, left: "32%" }}>🏘️</span>

          {/* lado direito */}
          <span className={`${styles.deco}`}                   style={{ bottom: 50, right: "28%" }}>🌲</span>
          <span className={`${styles.deco} ${styles.decoLg}`}  style={{ bottom: 44, right: "20%" }}>🌳</span>
          <span className={`${styles.deco}`}                   style={{ bottom: 62, right: "13%" }}>🌬️</span>
          <span className={`${styles.deco} ${styles.decoSm}`}  style={{ bottom: 52, right: "6%"  }}>🌲</span>

          {/* texto */}
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Bem-vindo!</h1>
            <p className={styles.bannerSub}>Colabore com o Meio Ambiente!</p>
            <div className={styles.bannerDots}>
              <span className={`${styles.bannerDot} ${styles.active}`} />
              <span className={styles.bannerDot} />
              <span className={styles.bannerDot} />
            </div>
          </div>
        </section>

        {/* ════════ CARDS ════════ */}
        <main className={styles.cardsSection}>
          {CARDS.map((card) => (
            <div key={card.key} className={`${styles.card} ${styles[card.cls]}`}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <button className={styles.cardBtn}>{card.btn}</button>
            </div>
          ))}
        </main>

      </div>{/* fim .inner */}

      {/* ════════ FOOTER ════════ */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <span className={styles.footerIcon}>🌳</span>
          <div className={styles.footerTexts}>
            <p>SECRETARIA DO</p>
            <strong>MEIO AMBIENTE</strong>
          </div>
        </div>
        <span className={styles.footerBadge}>Prefeitura de Tupã</span>
      </footer>

    </div>
  );
}
