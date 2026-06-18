import { useState } from "react";

import styles from "./homeg.module.css";

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

export default function Homeg() {
  const [menuAtivo, setMenuAtivo] = useState("Mapa");

  return (
    <div className={styles.container}>
      {/* MENU LATERAL */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.logoPrefeitura}>
            <img
              src={prefeituraLogo}
              alt="Prefeitura de Tupã"
            />
          </div>

          <div className={styles.linha}></div>

          <div className={styles.menu}>
            <button
              className={
                menuAtivo === "Mapa"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("Mapa")}
            >
              🏠 Mapa
            </button>

            <button
              className={
                menuAtivo === "Relatos"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("Relatos")}
            >
              📄 Relatos
            </button>

            <button
              className={
                menuAtivo === "Chat"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("Chat")}
            >
              💬 Chat
            </button>

            <button
              className={
                menuAtivo === "Historico"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() =>
                setMenuAtivo("Historico")
              }
            >
              📊 Histórico e Relatórios
            </button>

            <button
              className={
                menuAtivo === "Perfil"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("Perfil")}
            >
              👤 Perfil
            </button>
          </div>
        </div>

        <div className={styles.logoSecretaria}>
          <img
            src={arvoreLogo}
            alt="Secretaria"
          />

          <h2>
            SECRETARIA DO
            <br />
            MEIO AMBIENTE
          </h2>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerLogo}>
            <img
              src={arvoreLogo}
              alt="Secretaria"
            />

            <div>
              <span>SECRETARIA DO</span>
              <h1>MEIO AMBIENTE</h1>
            </div>
          </div>

          <nav className={styles.topMenu}>
            <button>Mapa</button>
            <button>Acompanhamento</button>
            <button>Relatórios</button>
          </nav>
        </header>

        {/* MAPA */}
        <section className={styles.mapaArea}>
          <div className={styles.linhaVertical}></div>
          <div className={styles.linhaHorizontal}></div>

          <div className={styles.pontoVerde}></div>
          <div className={styles.pontoLaranja}></div>

          {/* CARD */}
          <div className={styles.cardProblema}>
            <h3>Rua das Palmeiras</h3>

            <h4>Lixo acumulado</h4>

            <p>
              Grande quantidade de lixo
              irregular
            </p>

            <div className={styles.cardBotoes}>
              <button
                className={styles.vaiPassar}
              >
                Vai Passar
              </button>

              <button
                className={styles.jaPassou}
              >
                Já Passou
              </button>
            </div>
          </div>

          {/* TAREFAS */}
          <div className={styles.tarefas}>
            <h2>Minhas Tarefas</h2>

            <div className={styles.tarefa}>
              <strong>
                Rua das Palmeiras
              </strong>

              <p>Lixo acumulado</p>
            </div>

            <div className={styles.tarefa}>
              <strong>
                Praça Central
              </strong>

              <p>Árvore caída</p>
            </div>

            <div className={styles.tarefa}>
              <strong>
                Bairro Jardim
              </strong>

              <p>
                Descarte irregular
              </p>
            </div>

            <button
              className={styles.enviarRelatorio}
            >
              Enviar Relatório
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}