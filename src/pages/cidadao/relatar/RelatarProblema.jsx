import { useState } from "react";
import styles from "./RelatarProblema.module.css";

export default function RelatarProblema() {
  // Estado para controlar se a lista de problemas está expandida ou não
  const [expandido, setExpandido] = useState(false);

  return (
    <div className={styles["container-relatar"]}>
      {/* HEADER */}
      <header className={styles["header-relatar"]}>
        <div className={styles["logo-area"]}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/427/427735.png"
            alt="logo"
          />
          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles["header-buttons"]}>
          <button className={styles["btn-voltar"]}>Voltar</button>
          <span className={styles["menu-icon"]}>⋮</span>
        </div>
      </header>

      {/* BANNER */}
      <section className={styles.banner}>
        <h1>Relatar Problema Ambiental</h1>
      </section>

      {/* CARD */}
      <section className={styles["card-relatar"]}>
        <h3>Informe o Problema Ambiental:</h3>

        <div className={styles.problemas}>
          {/* Sempre mostra os 4 primeiros */}
          <button className={styles.btnProblema}>Lixo irregular</button>
          <button className={styles.btnProblema}>Queimada</button>
          <button className={styles.btnProblema}>Poluição da água</button>
          <button className={styles.btnProblema}>Desmatamento</button>

          {/* Só mostra os 4 últimos se 'expandido' for true */}
          {expandido && (
            <>
              <button className={styles.btnProblema}>Maus-tratos ou Abandono de animais</button>
              <button className={styles.btnProblema}>Contaminação do solo</button>
              <button className={styles.btnProblema}>Desperdício ou Vazamento de água</button>
              <button className={styles.btnProblema}>Poluição do Ar</button>
            </>
          )}
        </div>

        {/* Se NÃO estiver expandido, mostra os inputs e a seta para BAIXO */}
        {!expandido ? (
          <>
            <div className={styles.setaContainer}>
              <button 
                className={styles.setaBtn} 
                onClick={() => setExpandido(true)}
                title="Ver mais opções"
              >
                ⬇
              </button>
            </div>

            <div className={styles.formGroup}>
              <label>Outro:</label>
              <input type="text" className={styles.inputEstilizado} />

              <label>Endereço do problema</label>
              <input type="text" className={styles.inputEstilizado} />
            </div>

            <div className={styles["btn-area"]}>
              <button className={styles["btn-enviar"]}>Enviar</button>
            </div>
          </>
        ) : (
          /* Se ESTIVER expandido, mostra apenas a seta para CIMA na parte inferior */
          <div className={styles.setaContainerApenas}>
            <button 
              className={styles.setaBtn} 
              onClick={() => setExpandido(false)}
              title="Ver menos opções"
            >
              ⬆
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className={styles["footer-relatar"]}></footer>
    </div>
  );
}