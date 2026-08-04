import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./cadastrocidadao.module.css";
import {
  LayoutDashboard,
  ClipboardList,
  HelpCircle,
  Phone,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

function CadastroCidadao() {
  const navigate = useNavigate();

  // Permite apenas números nos campos de Celular e CPF
  const handleOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  // Ao cadastrar, vai para a área do cidadão
  const handleCadastrar = () => {
    navigate("/cidadao");
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
          <Link to="/login" className={styles.navItem}>
            <Phone size={20} />
            <span>Login</span>
          </Link>
          <Link to="/cadastro" className={`${styles.navItem} ${styles.active}`}>
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

        {/* CORPO DA PÁGINA (CARD DE CADASTRO) */}
        <div className={styles.contentBody}>
          <div className={styles.cardCadastro}>
            <h2 className={styles.cardTitle}>Cadastro do Cidadão</h2>
            <p className={styles.cardSub}>
              Crie sua conta para relatar problemas ou solicitar serviços de meio ambiente na sua cidade.
            </p>

            <div className={styles.formGrid}>
              {/* ÁREA DOS INPUTS */}
              <div className={styles.inputsArea}>
                <input type="text" placeholder="Nome Completo" className={styles.inputField} />
                <input type="email" placeholder="E-mail" className={styles.inputField} />

                <input
                  type="tel"
                  placeholder="Celular"
                  onInput={handleOnlyNumbers}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  placeholder="CPF"
                  maxLength={11}
                  onInput={handleOnlyNumbers}
                  className={styles.inputField}
                />

                <div className={styles.senhaGroup}>
                  <input
                    type="password"
                    placeholder="Senha"
                    className={styles.inputField}
                  />
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.btnArea}>
                  <button
                    className={styles.btnCadastrar}
                    onClick={handleCadastrar}
                    type="button"
                  >
                    CADASTRAR
                  </button>
                </div>
              </div>

              {/* ÁREA DA ILUSTRAÇÃO */}
              <div className={styles.ilustrationArea}>
                <div className={styles.badgeSeguranca}>
                  <ShieldCheck size={80} className={styles.iconShield} />
                  <p>Seus dados estão protegidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CadastroCidadao;