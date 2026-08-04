import { useState } from "react";
import styles from "./chat.module.css";

import arvoreLogo from "../../../assets/arvore.png";

export default function Chat() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");

  return (
    <div className={styles.containerChat}>
      {/* HEADER */}
      <header className={styles.headerChat}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="Logo Meio Ambiente" />

          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles.headerDireita}>
          <button className={styles.btnVoltar}>Voltar</button>

          <button
            className={styles.menuIcon}
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

        <button className={`${styles.menuItem} ${styles.menuAtivo}`}>
          🏠 Home
        </button>

        <button className={styles.menuItem}>📋 Relatar</button>

        <button className={styles.menuItem}>📌 Solicitar</button>

        <button className={styles.menuItem}>📊 Status</button>

        <button className={styles.menuItem}>💬 Chat com Gestão</button>

        <button className={styles.menuItem}>👤 Perfil</button>
      </div>

      {/* CONTEÚDO */}
      <section className={styles.chatContainer}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3>Gestão</h3>

          <div className={styles.usuarioCard}>
            <div className={styles.avatar}>👤</div>

            <div>
              <h4>Ricardo - Gestão</h4>
              <span>Online</span>
            </div>
          </div>
        </aside>

        {/* ÁREA CHAT */}
        <main className={styles.chatArea}>
          {/* TOPO CHAT */}
          <div className={styles.chatTopo}>
            <div className={styles.chatUsuario}>
              <div className={styles.avatarTopo}>👤</div>

              <h3>Ricardo - Gestão</h3>
            </div>
          </div>

          {/* MENSAGENS */}
          <div className={styles.mensagens}>
            <div className={styles.mensagemDireita}>
              Olá Ricardo, encontramos uma lixeira quebrada.
            </div>

            <div className={styles.mensagemEsquerda}>
              Oi! Tire uma foto e registre no relatório.
            </div>

            <div className={styles.mensagemEsquerda}>
              Vou informar a gestão para reposição.
            </div>

            <div className={styles.mensagemDireita}>
              Aqui está a foto da lixeira
            </div>

            {/* IMAGEM */}
            <div className={styles.imagemBox}>
              Imagem
            </div>
          </div>

          {/* INPUT */}
          <div className={styles.areaInput}>
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />

            <button>➜</button>
          </div>
        </main>
      </section>
    </div>
  );
}