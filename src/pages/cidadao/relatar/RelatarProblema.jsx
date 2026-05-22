import { useState } from "react";
import styles from "./RelatarProblema.module.css";
import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link } from "react-router-dom";

const problemas = [
  "Lixo irregular",
  "Queimada",
  "Poluição da água",
  "Desmatamento",
  "Maus-tratos ou Abandono de animais",
  "Contaminação do solo",
  "Desperdício ou Vazamento de água",
  "Poluição do Ar",
  "Outro",
];

export default function RelatarProblema() {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [problemaSelecionado, setProblemaSelecionado] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [outro, setOutro] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <div className={styles["container-relatar"]}>
      {/* HEADER */}
      <header className={styles["header-relatar"]}>
        <div className={styles["logo-area"]}>
          <img src={arvoreLogo} alt="logo" />
          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles["header-buttons"]}>
          <button className={styles["btn-voltar"]}>Voltar</button>
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
        <div className={styles.topoMenu}>
          <button
            className={styles.btnFechar}
            onClick={() => setMenuAberto(false)}
          >
            ✕
          </button>
        </div>

        <hr className={styles.menuDivisor} />

      <Link to = "/"> <button className={`${styles.menuItem} ${styles.menuHome}`}>
          🏠 Home
        </button></Link> 

      <Link to = "/">   <button className={styles.menuItem}>📄 Relatar problema</button></Link>
       
      <Link to = "/">   <button className={styles.menuItem}>📋 Solicitar serviço</button></Link> 
      
      <Link to = "/">   <button className={styles.menuItem}>📊 Status</button></Link> 
       
      <Link to = "/">   <button className={styles.menuItem}>💬 Chat com Gestão</button></Link> 
      
      <Link to = "/">   <button className={styles.menuItem}>👤 Perfil</button></Link> 
      </div>

      {/* BANNER */}
      <section
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerFundo})` }}
      >
        <h1 className={styles.bannerTitulo}>Relatar Problema Ambiental</h1>
      </section>

      {/* CARD */}
      <section className={styles["card-relatar"]}>

        {/* DROPDOWN PROBLEMAS */}
        <div className={styles.dropdownWrapper}>
          <label className={styles.dropdownLabel}>Informe o Problema Ambiental:</label>
          <button
            className={`${styles.dropdownBtn} ${
              problemaSelecionado ? styles.dropdownBtnSelecionado : ""
            }`}
            onClick={() => setDropdownAberto(!dropdownAberto)}
          >
            <span className={styles.dropdownTexto}>
              {problemaSelecionado || "Selecione um problema"}
            </span>
            {dropdownAberto ? (
              <IoChevronUp className={styles.dropdownIcone} />
            ) : (
              <IoChevronDown className={styles.dropdownIcone} />
            )}
          </button>

          {dropdownAberto && (
            <div className={styles.dropdownLista}>
              {problemas.map((problema) => (
                <button
                  key={problema}
                  className={`${styles.dropdownItem} ${
                    problemaSelecionado === problema ? styles.dropdownItemAtivo : ""
                  }`}
                  onClick={() => {
                    setProblemaSelecionado(problema);
                    setDropdownAberto(false);
                  }}
                >
                  {problema}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* descriçao */}
        <div className={styles.formGroup}>
          <label>Descrição:</label>
          <input
            type="text"
            className={styles.inputEstilizado}
            value={outro}
            onChange={(e) => setOutro(e.target.value)}
          />
        </div>

        {/* ENDEREÇO */}
        <div className={styles.formGroup}>
          <label>Endereço do problema:</label>
          <input
            type="text"
            className={styles.inputEstilizado}
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className={styles["btn-area"]}>
          <button className={styles["btn-enviar"]}>Enviar</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles["footer-relatar"]}></footer>
    </div>
  );
}
