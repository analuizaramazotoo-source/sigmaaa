import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./login.module.css";

import {
  ArrowLeft,
  Lock,
  User,
  Users,
  ShieldCheck,
  KeyRound
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  // Estado para controlar o perfil ativo (padrão: cidadao)
  const [perfil, setPerfil] = useState("cidadao");
  const [cpfOuEmail, setCpfOuEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Redireciona para a home de acordo com o perfil selecionado
    if (perfil === "cidadao") {
      navigate("/cidadao");
    } else if (perfil === "equipe") {
      navigate("/homee");
    } else if (perfil === "gestao") {
      navigate("/homeg");
    }
  };

  // Função auxiliar para definir para qual rota de cadastro redirecionar
  const getRotaCadastro = () => {
    if (perfil === "equipe") return "/cadastroeq";
    if (perfil === "gestao") return "/cadastrog";
    return "/cadastro";
  };

  return (
    <div className={styles.container}>
      {/* ÁREA PRINCIPAL SEM SIDEBAR */}
      <main className={styles.mainContent}>
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Autenticação de Acesso</h1>
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
                <h2 className={styles.cardTitle}>Acesse sua Conta</h2>
                <p className={styles.cardSub}>
                  Selecione seu perfil e informe suas credenciais para entrar no sistema.
                </p>
              </div>
            </div>

            {/* BOTÕES DE SELEÇÃO DE PERFIL */}
            <div className={styles.perfilSelectorGroup}>
              <button
                type="button"
                className={`${styles.btnPerfil} ${perfil === "cidadao" ? styles.btnPerfilActive : ""}`}
                onClick={() => setPerfil("cidadao")}
              >
                <User size={16} />
                <span>Cidadão</span>
              </button>

              <button
                type="button"
                className={`${styles.btnPerfil} ${perfil === "equipe" ? styles.btnPerfilActive : ""}`}
                onClick={() => setPerfil("equipe")}
              >
                <Users size={16} />
                <span>Equipe</span>
              </button>

              <button
                type="button"
                className={`${styles.btnPerfil} ${perfil === "gestao" ? styles.btnPerfilActive : ""}`}
                onClick={() => setPerfil("gestao")}
              >
                <ShieldCheck size={16} />
                <span>Gestão</span>
              </button>
            </div>

            <form onSubmit={handleLogin} className={styles.formGrid}>
              {/* ÁREA DOS INPUTS */}
              <div className={styles.inputsArea}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>CPF ou E-mail *</label>
                  <input
                    type="text"
                    placeholder="Digite seu CPF ou e-mail cadastrado"
                    className={styles.inputField}
                    value={cpfOuEmail}
                    onChange={(e) => setCpfOuEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Senha de Acesso *</label>
                  <input
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
                  <button className={styles.btnLogin} type="submit">
                    ENTRAR NO SISTEMA
                  </button>
                </div>

                <div className={styles.criarContaArea}>
                  <span>Ainda não tem conta? </span>
                  <Link to={getRotaCadastro()} className={styles.criarContaLink}>
                    Cadastre-se
                  </Link>
                </div>
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