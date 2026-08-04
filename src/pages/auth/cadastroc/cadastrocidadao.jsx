import styles from "./cadastrocidadao.module.css";
import { useNavigate } from "react-router-dom";

function CadastroCidadao() {
  const navigate = useNavigate();

  // Permite apenas números nos campos de Celular e CPF
  const handleOnlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  // Trata o cadastro e limpa o histórico da rota para não voltar na setinha
  const handleCadastrar = () => {
    navigate("/cidadao", { replace: true });
  };

  // Define a rota exata de onde o botão Voltar deve ir
  const handleVoltar = () => {
    navigate("/", { replace: true });
  };

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
          onClick={handleVoltar}
          type="button"
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
                <input type="text" placeholder="Nome Completo" />
                <input type="email" placeholder="E-mail" />

                {/* Apenas Números */}
                <input
                  type="tel"
                  placeholder="Celular"
                  onInput={handleOnlyNumbers}
                />
                <input
                  type="text"
                  placeholder="CPF"
                  maxLength={11}
                  onInput={handleOnlyNumbers}
                />

                {/* Senhas lado a lado */}
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

                {/* BOTÃO CADASTRAR */}
                <button
                  className={styles["btn-cadastrar"]}
                  onClick={handleCadastrar}
                  type="button"
                >
                  CADASTRAR
                </button>
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
    </div>
  );
}

export default CadastroCidadao;