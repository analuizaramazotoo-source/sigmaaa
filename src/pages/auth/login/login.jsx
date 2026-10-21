import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './login.module.css';
import { api, setSession } from '../../../services/api';

import {
  ArrowLeft,
  Lock,
  Users,
  ShieldCheck,
  KeyRound
} from "lucide-react";

function Login({ servidor = false }) {
  const navigate = useNavigate();

  // A escolha de perfil aparece apenas no acesso institucional.
  const [perfil, setPerfil] = useState(servidor ? "equipe" : "cidadao");
  const [cpfOuEmail, setCpfOuEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setErro(''); setEnviando(true);
    try {
      const session = await api('/auth/login', { method: 'POST', body: { identificador: cpfOuEmail, senha, perfil: servidor ? perfil : 'cidadao' } });
      setSession(session);
      navigate(session.usuario.tipo_usuario === 'gestao' ? '/homeg' : session.usuario.tipo_usuario === 'equipe' ? '/homee' : '/cidadao');
    } catch (error) { setErro(error.message); } finally { setEnviando(false); }
  };

  return (
    <div className={styles.container}>
      {/* ÁREA PRINCIPAL SEM SIDEBAR */}
      <main className={styles.mainContent}>
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>{servidor ? 'Acesso de servidores' : 'Acesso do cidadão'}</h1>
              <p className={styles.subTitle}>Secretaria do Meio Ambiente</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.btnVoltar} onClick={() => navigate("/")}>
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CORPO DA PÁGINA (CARD DE LOGIN CENTRALIZADO) */}
        <div className={styles.contentBody}>
          <div className={styles.cardLogin}>
            <div className={styles.cardHeaderArea}>
              <div className={styles.headerBadgeIcon}>
                <KeyRound size={22} color="#059669" />
              </div>
              <div>
                <h2 className={styles.cardTitle}>{servidor ? 'Entre com sua conta institucional' : 'Acesse sua Conta'}</h2>
                <p className={styles.cardSub}>
                  {servidor ? 'Acesso exclusivo para servidores cadastrados pela gestão.' : 'Informe seu CPF ou e-mail e sua senha para acessar o portal do cidadão.'}
                </p>
              </div>
            </div>

            {/* BOTÕES DE SELEÇÃO DE PERFIL */}
            {servidor && <div className={styles.perfilSelectorGroup} role="group" aria-label="Perfil do servidor">
              <button
                type="button"
                className={`${styles.btnPerfil} ${perfil === "equipe" ? styles.btnPerfilActive : ""}`}
                aria-pressed={perfil === "equipe"}
                onClick={() => { setPerfil("equipe"); setErro(''); }}
              >
                <Users size={16} />
                <span>Equipe</span>
              </button>

              <button
                type="button"
                className={`${styles.btnPerfil} ${perfil === "gestao" ? styles.btnPerfilActive : ""}`}
                aria-pressed={perfil === "gestao"}
                onClick={() => { setPerfil("gestao"); setErro(''); }}
              >
                <ShieldCheck size={16} />
                <span>Gestão</span>
              </button>
            </div>}

            {erro && <p role="alert" style={{ color: '#b91c1c' }}>{erro}</p>}
            <form onSubmit={handleLogin} className={styles.formGrid}>
              {/* ÁREA DOS INPUTS */}
              <div className={styles.inputsArea}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="login-identificador">CPF ou E-mail *</label>
                  <input
                    id="login-identificador" autoComplete="username"
                    type="text"
                    placeholder="Digite seu CPF ou e-mail cadastrado"
                    className={styles.inputField}
                    value={cpfOuEmail}
                    onChange={(e) => setCpfOuEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel} htmlFor="login-senha">Senha de Acesso *</label>
                  <input
                    id="login-senha" autoComplete="current-password"
                    type="password"
                    placeholder="••••••••"
                    className={styles.inputField}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.esqueciSenhaArea}>
                  <Link to="/esqueci-senha" className={styles.esqueciSenhaLink}>
                    Esqueceu a senha?
                  </Link>
                </div>

                <div className={styles.btnArea}>
                  <button className={styles.btnLogin} type="submit" disabled={enviando}>
                    {enviando ? 'ENTRANDO…' : 'ENTRAR NO SISTEMA'}
                  </button>
                </div>

                {!servidor ? <div className={styles.criarContaArea}>
                  <span>Ainda não tem conta? </span>
                  <Link to="/cadastro" className={styles.criarContaLink}>
                    Cadastre-se
                  </Link>
                </div> : <p>O cadastro de servidores é realizado pela gestão.</p>}
              </div>

              {/* ÁREA DA ILUSTRAÇÃO/ÍCONE */}
              <div className={styles.ilustrationArea}>
                <div className={styles.badgeSeguranca}>
                  <Lock size={64} className={styles.iconLock} />
                  <strong>Acesso Seguro e Protegido</strong>
                  <p>Dados encriptados sob diretrizes da Secretaria de Meio Ambiente.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
