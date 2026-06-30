import { useState } from "react";
import styles from "./homeg.module.css";

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

export default function Homeg() {
  const [menuAtivo, setMenuAtivo] = useState("dashboard");

  return (
    <div className={styles.container}>
      {/* ================= SIDEBAR ================= */}
      <aside className={styles.sidebar}>

        <div className={styles.sidebarTop}>
          <div className={styles.logoPrefeitura}>
            <img
              src={prefeituraLogo}
              alt="Prefeitura de Tupã"
            />
          </div>

          <div className={styles.linha}></div>

          <nav className={styles.menu}>

            <button
              className={
                menuAtivo === "dashboard"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              className={
                menuAtivo === "ocorrencias"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("ocorrencias")}
            >
              📄 Ocorrências
            </button>

            <button
              className={
                menuAtivo === "agenda"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("agenda")}
            >
              📅 Agenda
            </button>

            <button
              className={
                menuAtivo === "relatorios"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("relatorios")}
            >
              📊 Relatórios
            </button>

            <button
              className={
                menuAtivo === "usuarios"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("usuarios")}
            >
              👥 Usuários
            </button>

            <button
              className={
                menuAtivo === "perfil"
                  ? styles.menuAtivo
                  : styles.menuBotao
              }
              onClick={() => setMenuAtivo("perfil")}
            >
              👤 Perfil
            </button>

          </nav>
        </div>

        <div className={styles.sidebarBottom}>

          <div className={styles.linha}></div>

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

        </div>

      </aside>

      {/* ================= CONTEÚDO ================= */}

      <main className={styles.content}>

        {/* HEADER */}

        <header className={styles.header}>

          <div className={styles.tituloPagina}>
            <h1>Dashboard</h1>
            <span>
              Sistema Integrado de Gestão e Monitoramento Ambiental
            </span>
          </div>

          <div className={styles.headerDireita}>

            <input
              type="text"
              placeholder="Pesquisar..."
            />

            <button className={styles.novaOcorrencia}>
              + Nova Ocorrência
            </button>

          </div>

        </header>

        {/* CARDS */}

        <section className={styles.cards}>

          <div className={styles.cardResumo}>
            <h3>126</h3>
            <span>Ocorrências</span>
          </div>

          <div className={styles.cardResumo}>
            <h3>54</h3>
            <span>Em andamento</span>
          </div>

          <div className={styles.cardResumo}>
            <h3>39</h3>
            <span>Concluídas</span>
          </div>

          <div className={styles.cardResumo}>
            <h3>12</h3>
            <span>Equipes</span>
          </div>

        </section>

                {/* CONTEÚDO PRINCIPAL */}
        <section className={styles.dashboard}>

          {/* MAPA */}
          <div className={styles.mapaCard}>

            <div className={styles.cardTitulo}>
              <h2>Mapa de Ocorrências</h2>
              <span>Atualizado em tempo real</span>
            </div>

            <div className={styles.mapa}>

              <div className={styles.ruaHorizontal}></div>
              <div className={styles.ruaVertical}></div>

              <div className={styles.pontoVerde}></div>
              <div className={styles.pontoLaranja}></div>

              <div className={styles.popupMapa}>
                <h3>Rua das Palmeiras</h3>

                <p>Lixo acumulado</p>

                <span>
                  Grande quantidade de resíduos na via pública.
                </span>

                <div className={styles.popupBotoes}>
                  <button className={styles.btnAmarelo}>
                    Vai Passar
                  </button>

                  <button className={styles.btnVerde}>
                    Já Passou
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* PAINEL LATERAL */}
          <aside className={styles.lateralDireita}>

            <div className={styles.solicitacoes}>

              <h2>Minhas Solicitações</h2>

              <div className={styles.itemSolicitacao}>
                <strong>Rua das Palmeiras</strong>
                <p>Lixo acumulado</p>
              </div>

              <div className={styles.itemSolicitacao}>
                <strong>Praça Central</strong>
                <p>Árvore caída</p>
              </div>

              <div className={styles.itemSolicitacao}>
                <strong>Bairro Jardim</strong>
                <p>Descarte irregular</p>
              </div>

              <div className={styles.itemSolicitacao}>
                <strong>Av. Tamoios</strong>
                <p>Poda de árvore</p>
              </div>

              <button className={styles.enviarRelatorio}>
                Enviar Relatório
              </button>

            </div>

          </aside>

        </section>

        {/* TABELA */}

        <section className={styles.ultimasOcorrencias}>

          <div className={styles.cardTitulo}>
            <h2>Últimas Ocorrências</h2>
          </div>

          <table className={styles.tabela}>

            <thead>
              <tr>
                <th>Local</th>
                <th>Problema</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Rua das Palmeiras</td>
                <td>Lixo acumulado</td>
                <td>
                  <span className={styles.statusPendente}>
                    Pendente
                  </span>
                </td>
              </tr>

              <tr>
                <td>Praça Central</td>
                <td>Árvore caída</td>
                <td>
                  <span className={styles.statusAndamento}>
                    Em andamento
                  </span>
                </td>
              </tr>

              <tr>
                <td>Bairro Jardim</td>
                <td>Descarte irregular</td>
                <td>
                  <span className={styles.statusConcluido}>
                    Concluído
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </section>

      </main>

    </div>
  );
}