import { useState } from "react";
import styles from "./perfil.module.css";

import arvoreLogo from "../../../assets/arvore.png";

export default function Perfil() {
  const [menuAberto, setMenuAberto] = useState(false);

  const [nome, setNome] = useState("Lucas Pereira");
  const [email, setEmail] = useState("lucas.pereira@gmail.com");
  const [celular, setCelular] = useState("(14) 99888-7777");
  const [cpf, setCpf] = useState("432.887.654-00");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <div className={styles.containerPerfil}>
      {/* HEADER */}
      <header className={styles.headerPerfil}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="Logo Meio Ambiente" />

          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles.headerButtons}>
          <button className={styles.btnVoltar}>
            Voltar
          </button>

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

        <button className={styles.menuItem}>
          🏠 Home
        </button>

        <button className={styles.menuItem}>
          📋 Relatar
        </button>

        <button className={styles.menuItem}>
          📌 Solicitar
        </button>

        <button className={styles.menuItem}>
          📊 Status
        </button>

        <button className={styles.menuItem}>
          💬 Chat com Gestão
        </button>

        <button
          className={`${styles.menuItem} ${styles.menuAtivo}`}
        >
          👤 Perfil
        </button>

        <div className={styles.menuFooter}>
          <img src={arvoreLogo} alt="logo" />
          <h3>SECRETARIA DO MEIO AMBIENTE</h3>
        </div>
      </div>

      {/* CONTEÚDO */}
      <main className={styles.contentPerfil}>
        {/* CARD ESQUERDA */}
        <section className={styles.cardPerfil}>
          <h2>Informações do Perfil</h2>

          <label>Nome Completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />

          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <div className={styles.senhaArea}>
            <div>
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div>
              <label>Confirmar Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) =>
                  setConfirmarSenha(e.target.value)
                }
              />
            </div>
          </div>

          <div className={styles.botoes}>
            <button className={styles.btnSalvar}>
              Salvar Alterações
            </button>

            <button className={styles.btnSenha}>
              Alterar Senha
            </button>
          </div>
        </section>

        {/* PERFIL CENTRAL */}
        <section className={styles.perfilUsuario}>
          <h1>MEU PERFIL</h1>

          <div className={styles.avatar}>
            👤
          </div>

          <h2>{nome}</h2>
          <p>{email}</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footerPerfil}></footer>
    </div>
  );
}