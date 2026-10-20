import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { getSession, perform, saveProfile } from '../../../services/originalScreens';
import { useState } from "react";
import styles from './alterar.module.css';

import arvoreLogo from "../../../assets/arvore.png";

export default function Alterar() {
  const navigate = useNavigate();
  const role = getSession()?.usuario.tipo_usuario;
  const inicio = role === 'gestao' ? '/homeg' : role === 'equipe' ? '/homee' : '/cidadao';
  const perfil = role === 'gestao' ? '/perfilg' : role === 'equipe' ? '/perfile' : '/perfil';
  const [salvando, setSalvando] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  async function handleSalvar(event) {
    event.preventDefault();
    if (salvando) return;
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    setSalvando(true);
    await perform(async () => { await saveProfile({ senha_usuario: novaSenha, senha_atual: senhaAtual }); setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha(''); alert('Senha alterada com sucesso!'); });
    setSalvando(false);
  }

  return (
    <div className={styles.containerHome}>
      <ResponsiveSidebar alwaysCollapsed className={styles.menuLateral}>
        <nav className="sigma-citizen-navigation" aria-label="Menu do cidadão">
          <Link to={inicio}>Início</Link>
          {role === 'cidadao' && <>
          <Link to="/relatar-problema">Relatar problema</Link>
          <Link to="/status">Minhas solicitações</Link>
          <Link to="/chat">Chat com Gestão</Link>
          </>}
          <Link to={perfil}>Meu perfil</Link>
        </nav>
      </ResponsiveSidebar>

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
          <button className={styles.btnVoltar} onClick={() => navigate(perfil)}>
            Voltar
          </button>
        </div>
      </header>

      {/* OVERLAY */}

      {/* CONTEÚDO */}
      <main className={styles.conteudo}>
        {/* Título lateral esquerdo */}
        <div className={styles.tituloLateral}>
          <h1>ALTERAR SENHA</h1>
        </div>

        {/* Card do formulário */}
        <form className={styles.card} onSubmit={handleSalvar}>
          <h2 className={styles.cardTitulo}>ALTERAR SENHA:</h2>
          <p className={styles.cardSubtitulo}>
            Digite sua senha atual e escolha uma nova.
          </p>

          {/* Senha Atual */}
          <div className={styles.campoGrupo}>
            <label className={styles.label} htmlFor="senha-atual">Senha Atual</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                id="senha-atual" required maxLength={128} autoComplete="current-password"
                type={mostrarSenhaAtual ? "text" : "password"}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="Inserir Senha..."
              />
              <button
                className={styles.olhoBtn}
                onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                type="button"
              >
                {mostrarSenhaAtual ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Nova Senha */}
          <div className={styles.campoGrupo}>
            <label className={styles.label} htmlFor="nova-senha">Nova Senha</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type={mostrarNovaSenha ? "text" : "password"}
                value={novaSenha}
                id="nova-senha" required minLength={8} maxLength={128} autoComplete="new-password"
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Inserir Nova Senha..."
              />
              <button
                className={styles.olhoBtn}
                onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                type="button"
              >
                {mostrarNovaSenha ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirmar Nova Senha */}
          <div className={styles.campoGrupo}>
            <label className={styles.label} htmlFor="confirmar-senha">Confirmar Nova Senha</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type={mostrarConfirmar ? "text" : "password"}
                value={confirmarSenha}
                id="confirmar-senha" required minLength={8} maxLength={128} autoComplete="new-password"
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme a Senha..."
              />
              <button
                className={styles.olhoBtn}
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                type="button"
              >
                {mostrarConfirmar ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={salvando} className={styles.btnSalvar}>
            {salvando ? 'Salvando...' : 'Salvar Nova Senha'}
          </button>
        </form>
      </main>

      {/* FOOTER */}
      <footer className={styles.footerHome}></footer>
    </div>
  );
}
