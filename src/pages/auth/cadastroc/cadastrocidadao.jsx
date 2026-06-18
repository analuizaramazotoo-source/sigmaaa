import styles from "./cadastrocidadao.module.css";
import { Link } from "react-router-dom";

function CadastroCidadao() {
  return (
    <div className={styles["cadastro-page"]}>
      {/* TOPO */}
      <div className={styles.topo}>
        <div className={styles.logo}>
          <div className={styles["header-logos"]}>
            <div className={styles.logo}>
              <img
                src="secretaria meio ambiente.png"
                className={styles.logos}
                alt="Secretaria do Meio Ambiente"
              />
            </div>
          </div>
        </div>

        {/* BOTÃO VOLTAR */}
        <button
          className={styles["btn-voltar"]}
          onClick={() => window.history.back()}
        >
          Voltar
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.conteudo}>
        {/* LATERAL */}
        <div className={styles.lateral}>
          <img
            src="logotupa.png"
            className={styles["logo-img"]}
            alt="Prefeitura de Tupã"
          />

          {/* LINHAS DECORATIVAS SUPERIORES */}
          <div className={styles["linha-grande"]}></div>
          <div className={styles["linha-pequena"]}></div>

          {/* LOGO INFERIOR */}
          <div className={styles["logo-inferior"]}>
            <img src="/meio-ambiente.png" alt="Meio Ambiente" />

            <span>
              SECRETARIA DO
              <br />
              MEIO AMBIENTE
            </span>
          </div>

          {/* LINHAS DECORATIVAS INFERIORES */}
          <div className={styles["linha-grande"]}></div>
          <div className={styles["linha-pequena"]}></div>
        </div>

        {/* CENTRO */}
        <div className={styles.centro}>
          <div className={styles.card}>
            <h2>Cadastro do Cidadão</h2>

            <p className={styles.sub}>
              Crie sua conta para relatar problemas ou solicitar serviços
              de meio ambiente na sua cidade.
            </p>

            <div className={styles["form-area"]}>
              <div className={styles.inputs}>
                <input placeholder="Nome Completo" />
                <input placeholder="E-mail" />
                <input placeholder="Celular" />
                <input placeholder="CPF" />

                <div className={styles.senha}>
                  <input
                    placeholder="Senha"
                    type="password"
                  />

                  <input
                    placeholder="Confirmar Senha"
                    type="password"
                  />
                </div>

                <Link to="/cidadao">
                  <button className={styles["btn-cadastrar"]}>
                    CADASTRAR
                  </button>
                </Link>
              </div>
            </div>

            <div className={styles.imagem}>
              <img
                src="/cadastrocidadao.png"
                alt="Segurança"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroCidadao;