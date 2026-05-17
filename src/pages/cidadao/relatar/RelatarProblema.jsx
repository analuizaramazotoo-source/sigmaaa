import { useState } from "react";
import styles from "./RelatarProblema.module.css";
import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function RelatarProblema() {
  // Estado da lista expandida
  const [expandido, setExpandido] = useState(false);

  // Estado do menu lateral
  const [menuAberto, setMenuAberto] = useState(false);

  // Problema selecionado
  const [problemaSelecionado, setProblemaSelecionado] = useState("");

  return (
    <div className={styles["container-relatar"]}>
      {/* HEADER */}
      <header className={styles["header-relatar"]}>
        <div className={styles["logo-area"]}>
          <img
            src={arvoreLogo}
            alt="logo"
          />

          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles["header-buttons"]}>
          <button className={styles["btn-voltar"]}>
            Voltar
          </button>

          {/* BOTÃO MENU */}
          <button
            className={styles["menu-icon"]}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ⋮
          </button>
        </div>
      </header>

      {/* MENU LATERAL */}
      <div
        className={`${styles.menuLateral} ${
          menuAberto ? styles.menuAberto : ""
        }`}
      >
        {/* BOTÃO FECHAR */}
        <div className={styles.topoMenu}>
          <button
            className={styles.btnFechar}
            onClick={() => setMenuAberto(false)}
          >
            ✕
          </button>
        </div>

        {/* HOME DESTACADO */}
        <button
          className={`${styles.menuItem} ${styles.menuHome}`}
        >
          🏠 Home
        </button>

        <button className={styles.menuItem}>
          📄 Relatar
        </button>

        <button className={styles.menuItem}>
          Solicitar
        </button>

        <button className={styles.menuItem}>
          Status
        </button>

        <button className={styles.menuItem}>
          Chat com Gestão
        </button>

        <button className={styles.menuItem}>
          Perfil
        </button>
      </div>

      {/* BANNER */}
      <section
        className={styles.banner}
        style={{
          backgroundImage: `url(${bannerFundo})`,
        }}
      >
        <h1>Relatar Problema Ambiental</h1>
      </section>

      {/* CARD */}
      <section className={styles["card-relatar"]}>
        <h3>Informe o Problema Ambiental:</h3>

        <div className={styles.problemas}>
  {[
    "Lixo irregular",
    "Queimada",
    "Poluição da água",
    "Desmatamento",
    ...(expandido || problemaSelecionado
  ? [
      "Maus-tratos ou Abandono de animais",
      "Contaminação do solo",
      "Desperdício ou Vazamento de água",
      "Poluição do Ar",
    ]
  : []),
  ]
    .filter(
      (problema) =>
        !problemaSelecionado ||
        problemaSelecionado === problema
    )
    .map((problema) => (
      <button
        key={problema}
        className={`${styles.btnProblema} ${
          problemaSelecionado === problema
            ? styles.problemaAtivo
            : ""
        }`}
        onClick={() => {
  if (problemaSelecionado === problema) {
    setProblemaSelecionado("");
  } else {
    setProblemaSelecionado(problema);

    setExpandido(false);
  }
}}
      >
        {problema}
      </button>
    ))}
</div>
        {!problemaSelecionado && (
  <div className={styles.setaContainer}>
    {!expandido ? (
      <button
        className={styles.setaBtn}
        onClick={() => setExpandido(true)}
        title="Ver mais opções"
      >
        <IoChevronDown />
      </button>
    ) : (
      <button
        className={styles.setaBtn}
        onClick={() => setExpandido(false)}
        title="Ver menos opções"
      >
        <IoChevronUp />
      </button>
    )}
  </div>
)}

{!expandido && (
  <>
    <div className={styles.formGroup}>
      <label>Outro:</label>

      <input
        type="text"
        className={styles.inputEstilizado}
      />

      <label>Endereço do problema</label>

      <input
        type="text"
        className={styles.inputEstilizado}
      />
    </div>

    <div className={styles["btn-area"]}>
      <button className={styles["btn-enviar"]}>
        Enviar
      </button>
    </div>
  </>
)}
      </section>

      {/* FOOTER */}
      <footer className={styles["footer-relatar"]}></footer>
    </div>
  );
}