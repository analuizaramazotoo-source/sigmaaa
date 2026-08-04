import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./home.module.css";
import { Users, User, ShieldCheck, LogIn } from "lucide-react";

function Home() {
  const navigate = useNavigate();

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
            Selecione seu perfil abaixo para realizar o cadastro ou acesse sua conta.
          </p>
        </div>

        {/* SEÇÃO DE SELEÇÃO DE PERFIL */}
        <div className={styles.profilesCard}>
          <h2 className={styles.profilesTitle}>CRIAR CADASTRO POR PERFIL:</h2>

          <div className={styles.profilesGrid}>
            {/* CARD EQUIPE */}
            <div className={styles.profileBox}>
              <div className={styles.iconCircle}>
                <Users size={36} />
              </div>
              <h3>Equipe</h3>
              <p>Membros das equipes operacionais</p>
              <button
                className={styles.btnSelecionar}
                onClick={() => navigate("/cadastroeq")}
              >
                Cadastrar
              </button>
            </div>

            {/* CARD CIDADÃO */}
            <div className={styles.profileBox}>
              <div className={styles.iconCircle}>
                <User size={36} />
              </div>
              <h3>Cidadão</h3>
              <p>Solicitação e relatos de serviços</p>
              <button
                className={styles.btnSelecionar}
                onClick={() => navigate("/cadastro")}
              >
                Cadastrar
              </button>
            </div>

            {/* CARD GESTÃO */}
            <div className={styles.profileBox}>
              <div className={styles.iconCircle}>
                <ShieldCheck size={36} />
              </div>
              <h3>Gestão</h3>
              <p>Coordenação e administração</p>
              <button
                className={styles.btnSelecionar}
                onClick={() => navigate("/cadastrog")}
              >
                Cadastrar Gestão
              </button>
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
    </div>
  );
}

export default Home;