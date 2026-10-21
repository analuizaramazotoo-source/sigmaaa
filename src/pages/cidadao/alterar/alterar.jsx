import { useNavigate } from 'react-router-dom';
import { getSession, perform, saveProfile } from '../../../services/originalScreens';
import { useState } from "react";
import styles from './alterar.module.css';

import { ArrowLeft, Eye, EyeOff, KeyRound, Trees } from 'lucide-react';

export default function Alterar() {
  const navigate = useNavigate();
  const role = getSession()?.usuario.tipo_usuario;
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
      <header className={styles.headerHome}>
        <div className={styles.logoArea}>
          <span className={styles.logoIcon}><Trees size={24} aria-hidden="true" /></span>
          <div>
            <p>SECRETARIA DO MEIO AMBIENTE</p>
            <span className={styles.logoSubtitle}>Tupã • São Paulo</span>
          </div>
        </div>

        <div>
          <button className={styles.btnVoltar} onClick={() => navigate(perfil)}>
            <ArrowLeft size={16} aria-hidden="true" /> Voltar
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className={styles.conteudo}>
        <form className={styles.card} onSubmit={handleSalvar}>
          <div className={styles.cardHeading}><span className={styles.keyIcon}><KeyRound size={24} aria-hidden="true" /></span><div><h1 className={styles.cardTitulo}>Alterar senha</h1><p className={styles.cardSubtitulo}>Mantenha sua conta protegida.</p></div></div>
          <p className={styles.cardSubtitulo}>
            Digite sua senha atual e escolha uma nova com pelo menos 8 caracteres.
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
                aria-label={mostrarSenhaAtual ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                aria-pressed={mostrarSenhaAtual}
                onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                type="button"
              >
                {mostrarSenhaAtual ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
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
                aria-label={mostrarNovaSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                aria-pressed={mostrarNovaSenha}
                onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                type="button"
              >
                {mostrarNovaSenha ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
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
                aria-label={mostrarConfirmar ? 'Ocultar confirmação da senha' : 'Mostrar confirmação da senha'}
                aria-pressed={mostrarConfirmar}
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                type="button"
              >
                {mostrarConfirmar ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={salvando} className={styles.btnSalvar}>
            {salvando ? 'Salvando...' : 'Salvar Nova Senha'}
          </button>
        </form>
      </main>

      {/* FOOTER */}
      <footer className={styles.footerHome}>Secretaria do Meio Ambiente • Tupã/SP</footer>
    </div>
  );
}
