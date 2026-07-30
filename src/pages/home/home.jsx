import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

/* ================= HOME ================= */

export default function Home() {
  return (
    <div className={styles.container}>

      {/* BARRA VERDE SUPERIOR */}
      <header className={styles.topbar}>
        <div className={styles.header}>
          <div className={styles["header-logos"]}>
            <div className={styles.logo}>
              <img 
                src="/logotupa.png" 
                className={styles["logo-img"]} 
                alt="Prefeitura de Tupã" 
              />
              <img 
                src="/secretaria meio ambiente.png" 
                className={styles.logos} 
                alt="Secretaria do Meio Ambiente" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.main}>

        <span className={styles["badge-header"]}>PORTAL DE SERVIÇOS AMBIENTAIS</span>
        <h1>SECRETARIA DO MEIO AMBIENTE</h1>

        <p className={styles.sub}>
          Conecte-se ao portal para registrar ocorrências, solicitar serviços e acompanhar suas solicitações.
        </p>

        {/* PAINEL DE CARDS */}
        <div className={styles["cards-wrapper"]}>

          <p className={styles["perfil-title"]}>
            SELECIONE SEU PERFIL DE ACESSO:
          </p>

          <div className={styles.cards}>

            {/* CARD 1: EQUIPE */}
            <div className={styles.card}>
              <div className={styles["card-img-container"]}>
                <img src="/img equipe.png" className={styles["card-img"]} alt="Equipe" />
              </div>
              <h3>Equipe</h3>
              <span>Atendimento em campo e execução</span>
              <button>Selecionar</button>
            </div>

            {/* CARD 2: CIDADÃO (DESTAQUE) */}
            <div className={`${styles.card} ${styles["card-destaque"]}`}>
              <span className={styles["tag-recomendado"]}>Principal</span>
              <div className={styles["card-img-container"]}>
                <img src="/img cidadão.png" className={styles["card-img"]} alt="Cidadão" />
              </div>
              <h3>Cidadão</h3>
              <span>Solicitação e relatos de serviços</span>
              <Link to="/cidadao" className={styles["btn-link"]}>
                <button>Selecionar</button>
              </Link>
            </div>

            {/* CARD 3: GESTÃO */}
            <div className={styles.card}>
              <div className={styles["card-img-container"]}>
                <img src="/img gestao.png" className={styles["card-img"]} alt="Gestão" />
              </div>
              <h3>Gestão</h3>
              <span>Coordenação e painel gerencial</span>
              <button>Selecionar</button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}