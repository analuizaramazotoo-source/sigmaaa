import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./login.module.css";
import {
  LayoutDashboard,
  ClipboardList,
  HelpCircle,
  Phone,
  ArrowLeft,
  LogIn,
  Lock,
  User,
  Users,
  ShieldCheck
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  // Estado para controlar o perfil ativo (padrao: cidadao)
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

  return (
    <div className={styles.container}>
      {/* SIDEBAR / MENU LATERAL */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoArea}>
            <span className={styles.logoIcon}>🌱</span>
            <div className={styles.logoText}>
              <h2>CADASTRO</h2>
              <p>SEGURO AMBIENTAL</p>
            </div>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <Link to="/" className={styles.navItem}>
            <LayoutDashboard size={20} />
            <span>Início</span>
          </Link>
          <Link to="/login" className={`${styles.navItem} ${styles.active}`}>
            <LogIn size={20} />
            <span>Login</span>
          </Link>
          <Link to="/cadastro" className={styles.navItem}>
            <ClipboardList size={20} />
            <span>Cadastro</span>
          </Link>
          <Link to="/" className={styles.navItem}>
            <HelpCircle size={20} />
            <span>Orientações</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.ajudaCard}>
            <Phone size={18} />
            <div>
              <strong>Precisa de ajuda?</strong>
              <p>Fale conosco</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Cadastro Seguro Ambiental</h1>
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

        {/* CORPO DA PÁGINA (CARD DE LOGIN) */}
        <div className={styles.contentBody}>
          <div className={styles.cardLogin}>
            <h2 className={styles.cardTitle}>Acesse sua Conta</h2>
            <p className={styles.cardSub}>
              Selecione seu perfil e informe seus dados para entrar no sistema.
            </p>

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
                <input
                  type="text"
                  placeholder="CPF ou E-mail"
                  className={styles.inputField}
                  value={cpfOuEmail}
                  onChange={(e) => setCpfOuEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className={styles.inputField}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />

                <div className={styles.esqueciSenhaArea}>
                  <Link to="/esqueci-senha" className={styles.esqueciSenhaLink}>
                    Esqueceu a senha?
                  </Link>
                </div>

                <div className={styles.btnArea}>
                  <button className={styles.btnLogin} type="submit">
                    ENTRAR
                  </button>
                </div>

                <div className={styles.criarContaArea}>
                  <span>Ainda não tem conta? </span>
                  <Link to="/cadastro" className={styles.criarContaLink}>
                    Cadastre-se
                  </Link>
                </div>
              </div>

              {/* ÁREA DA ILUSTRAÇÃO/ÍCONE */}
              <div className={styles.ilustrationArea}>
                <div className={styles.badgeSeguranca}>
                  <Lock size={80} className={styles.iconLock} />
                  <p>Acesso Seguro e Protegido</p>
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