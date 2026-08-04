import styles from "./home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.container}>

      <header className={styles.topbar}>
        <div className={styles.header}>

          <div className={styles.headerLogos}>
            <div className={styles.logo}>
              <img src="/logotupa.png" className={styles.logoImg} alt="Logo Tupã" />
              <img src="/secre.png" className={styles.logos} alt="Secretaria do Meio Ambiente" />
            </div>
          </div>

          {/* Substituição dos botões pelas informações de atendimento */}
          <div className={styles.headerInfo}>
            <span className={styles.infoTime}>
              🕒 Atendimento: Seg a Sex • 07h30 às 17h00
            </span>
            <span className={styles.infoBadge}>
              ● Portal Online
            </span>
          </div>

        </div>
      </header>

      <main className={styles.main}>

        <h1>CRIE SUA CONTA NA</h1>
        <h2>SECRETARIA DO MEIO AMBIENTE</h2>

        <p className={styles.sub}>
          Registre-se e conecte-se ao portal para solicitar serviços ambientais
        </p>

        <button className={styles.btnPrimary}>
          Criar minha conta
        </button>

        <p className={styles.login}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>

        <div className={styles.cardsWrapper}>

          <p className={styles.perfilTitle}>
            SELECIONE SEU PERFIL:
          </p>

          <div className={styles.cards}>

            <div className={styles.card}>
              <img src="/equipe.png" className={styles.cardImg} alt="Equipe" />
              <h3>Equipe</h3>
              <span>Membros das equipes</span>
              <button>Selecionar</button>
            </div>

            <div className={styles.card}>
              <img src="/cidadao.png" className={styles.cardImg} alt="Cidadão" />
              <h3>Cidadão</h3>
              <span>Solicitação de serviços</span>

              <Link to="/cadastro-cidadao">
                <button>Selecionar</button>
              </Link>
            </div>

            <div className={styles.card}>
              <img src="/gestao.png" className={styles.cardImg} alt="Gestão" />
              <h3>Gestão</h3>
              <span>Coordenação</span>
              <button>Selecionar</button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}