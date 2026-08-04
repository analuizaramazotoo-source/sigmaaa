import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./cadastroeq.module.css";

import arvoreLogo from "../../../assets/arvore.png";

export default function CadastroEq() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [codigoEquipe, setCodigoEquipe] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function handleEntrar() {
    if (!codigoEquipe || !nomeUsuario || !senha) {
      alert("Preencha todos os campos.");
      return;
    }
    // Aqui você pode adicionar a lógica de envio para o backend
    alert("Acesso solicitado com sucesso!");
  }

  return (
    <div className={styles.containerHome}>
      {/* HEADER */}
      <header className={styles.headerHome}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="Logo Meio Ambiente" />
          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.btnVoltar} onClick={() => window.history.back()}>
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

      {/* OVERLAY */}
      {menuAberto && (
        <div
          className={styles.overlay}
          onClick={() => setMenuAberto(false)}
        />
      )}

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

         <Link to="/">
          <button className={`${styles.menuItem} ${styles.menuHome}`}>
            🏠 Home
          </button>
        </Link>

        <Link to="/relatar-problema">
          <button className={styles.menuItem}>
            📄 Relatar problema
          </button>
        </Link>

        <Link to="/">
          <button className={styles.menuItem}>
            📋 Solicitar serviço
          </button>
        </Link>

        <Link to="/">
          <button className={styles.menuItem}>
            📊 Status
          </button>
        </Link>

        <Link to="/">
          <button className={styles.menuItem}>
            💬 Chat com Gestão
          </button>
        </Link>

        <Link to="/">
          <button className={styles.menuItem}>
            👤 Perfil
          </button>
        </Link>

        <div className={styles.menuFooter}>
          <img src={arvoreLogo} alt="logo" />
          <h3>SECRETARIA DO MEIO AMBIENTE</h3>
        </div>
      </div>

      {/* CONTEÚDO */}
      <main className={styles.conteudo}>
        {/* Card do formulário */}
        <div className={styles.card}>
          <h2 className={styles.cardTitulo}>Acesso da Equipe</h2>
          <p className={styles.cardSubtitulo}>
            Utilize o código fornecido pela secretaria
          </p>

          {/* Código da Equipe */}
          <div className={styles.campoGrupo}>
            <label className={styles.label}>Código da equipe:</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                value={codigoEquipe}
                onChange={(e) => setCodigoEquipe(e.target.value)}
              />
            </div>
          </div>

          {/* Nome do Usuário */}
          <div className={styles.campoGrupo}>
            <label className={styles.label}>Nome do Usuário:</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
            </div>
          </div>

          {/* Senha */}
          <div className={styles.campoGrupo}>
            <label className={styles.label}>Senha:</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <button className={styles.btnEntrar} onClick={handleEntrar}>
            Entrar
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footerHome}></footer>
    </div>
  );
}