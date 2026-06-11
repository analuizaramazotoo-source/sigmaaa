import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./cadastrog.module.css";

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

export default function Cadastrog() {
  const navigate = useNavigate();

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logoPrefeitura}>
          <img src={prefeituraLogo} alt="Prefeitura" />
        </div>

        <div className={styles.linha}></div>

        <div className={styles.logoSecretaria}>
          <img src={arvoreLogo} alt="Secretaria" />
          <h2>
            SECRETARIA DO
            <br />
            MEIO AMBIENTE
          </h2>
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <img src={arvoreLogo} alt="Logo" />
          <div>
            <span>SECRETARIA DO</span>
            <h1>MEIO AMBIENTE</h1>
          </div>
        </header>

        <div className={styles.card}>
          <h2>Login</h2>

          <div className={styles.formGroup}>
            <label>ID Gestor*</label>

            <input
              type="text"
              placeholder="#87654321"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Senha*</label>

            <div className={styles.senhaContainer}>
              <input
                type={senhaVisivel ? "text" : "password"}
                placeholder="Digite sua senha"
              />

              <button
                type="button"
                onClick={() =>
                  setSenhaVisivel(!senhaVisivel)
                }
              >
                ●
              </button>
            </div>
          </div>

          <div className={styles.botoes}>
            <button
              className={styles.cancelar}
              onClick={() => navigate("/login")}
            >
              Cancelar
            </button>

            <button className={styles.cadastrar}>
              Cadastrar Gestor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}