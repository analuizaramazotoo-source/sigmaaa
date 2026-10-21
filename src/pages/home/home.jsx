import { Link } from "react-router-dom";
import styles from './home.module.css';
import { User, LogIn } from "lucide-react";

function Home() {

  return (
    <div className={styles.container}>
      {/* TOPO / HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img
            src="/logotupa.png"
            alt="Prefeitura de Tupã"
            className={styles.logoPrefeitura}
          />
          <img
            src="/secretaria meio ambiente.png"
            alt="Secretaria do Meio Ambiente"
            className={styles.logoSecretaria}
          />
        </div>

        <div className={styles.headerInfo}>
          <span className={styles.horario}>
            Atendimento: Seg a Sex - 07h30 às 17h00
          </span>
          <a
            href="https://www.tupa.sp.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPortal}
          >
            Portal Online
          </a>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        {/* TÍTULO PRINCIPAL */}
        <div className={styles.heroSection}>
          <h1 className={styles.mainTitle}>SECRETARIA DO MEIO AMBIENTE</h1>
          <p className={styles.description}>
            Relate problemas ambientais em Tupã e acompanhe suas solicitações.
          </p>
        </div>

        {/* SEÇÃO DE SELEÇÃO DE PERFIL */}
        <div className={styles.profilesCard}>
          <h2 className={styles.profilesTitle}>PORTAL DO CIDADÃO</h2>

          <div className={styles.profilesGrid}>
            {/* CARD CIDADÃO */}
            <div className={styles.profileBox}>
              <div className={styles.iconCircle}>
                <User size={36} />
              </div>
              <h3>Cidadão</h3>
              <p>Cadastre-se para relatar problemas e acompanhar o atendimento.</p>
              <Link to="/cadastro" className={styles.btnSelecionar}>
                Criar minha conta
              </Link>
            </div>

          </div>

          {/* PARTE INFERIOR: JÁ POSSUI CONTA? ENTRAR */}
          <div className={styles.loginBottomSection}>
            <div className={styles.loginDivider}></div>
            <div className={styles.loginContent}>
              <LogIn size={20} className={styles.loginIcon} />
              <span>Já possui uma conta cadastrada?</span>
              <Link to="/login" className={styles.btnLoginLink}>
                ENTRAR
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}><Link to="/acesso-servidor">Acesso de servidores</Link></footer>
    </div>
  );
}

export default Home;