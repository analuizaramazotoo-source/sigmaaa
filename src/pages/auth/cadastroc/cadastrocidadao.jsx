import styles from "./cadastrocidadao.module.css";

function CadastroCidadao() {

  return (

    <div className={styles["cadastro-page"]}>

      {/* TOPO */}
      <div className={styles.topo}>

        <div className={styles["topo-esquerda"]}>

          <img
            src="/secre.png"
            alt="logo"
          />

          <span>
            SECRETARIA DO MEIO AMBIENTE
          </span>

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
            src="/prefeitura.png"
            className={styles["logo-prefeitura"]}
          />

          <div className={styles["logo-inferior"]}>

            <img src="/meio-ambiente.png" />

            <span>
              SECRETARIA DO
              <br />
              MEIO AMBIENTE
            </span>

          </div>

        </div>

        {/* CENTRO */}
        <div className={styles.centro}>

          <div className={styles.card}>

            <h2>
              Cadastro do Cidadão
            </h2>

            <p className={styles.sub}>
              Crie sua conta para relatar problemas ou solicitar serviços
              de meio ambiente na sua cidade.
            </p>

            <div className={styles["form-area"]}>

              {/* INPUTS */}
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

                <button className={styles["btn-cadastrar"]}>
                  CADASTRAR
                </button>
{/* IMAGEM */}
              

              </div>

              
            </div>
            <div className={styles.imagem}>

                <img
                  src="/cadastrocidadao.png"
                  alt="segurança"
                />

              </div>
          </div>

        </div>

      </div>

    </div>

  );

}

export default CadastroCidadao;