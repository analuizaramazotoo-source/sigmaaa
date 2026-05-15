import "./cadastrocidadao.css";
import { useNavigate } from "react-router-dom";

function CadastroCidadao() {

  const navigate = useNavigate();

  function voltarPagina() {
    navigate("/");
  }

  return (

    <div className="cadastro-page">

      {/* TOPO */}
      <div className="topo">

        <div className="topo-esquerda">

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
          className="btn-voltar"
          onClick={voltarPagina}
        >
          Voltar
        </button>

      </div>

      {/* CONTEÚDO */}
      <div className="conteudo">

        {/* LATERAL */}
        <div className="lateral">

          <img
            src="/prefeitura.png"
            className="logo-prefeitura"
          />

          <div className="logo-inferior">

            <img src="/meio-ambiente.png" />

            <span>
              SECRETARIA DO
              <br />
              MEIO AMBIENTE
            </span>

          </div>

        </div>

        {/* CENTRO */}
        <div className="centro">

          <div className="card">

            <h2>
              Cadastro do Cidadão
            </h2>

            <p className="sub">
              Crie sua conta para relatar problemas ou solicitar serviços
              de meio ambiente na sua cidade.
            </p>

            <div className="form-area">

              {/* INPUTS */}
              <div className="inputs">

                <input placeholder="Nome Completo" />

                <input placeholder="E-mail" />

                <input placeholder="Celular" />

                <input placeholder="CPF" />

                <div className="senha">

                  <input
                    placeholder="Senha"
                    type="password"
                  />

                  <input
                    placeholder="Confirmar Senha"
                    type="password"
                  />

                </div>

                <button className="btn-cadastrar">
                  CADASTRAR
                </button>

              </div>

              {/* IMAGEM */}
              <div className="imagem">

                <img
                  src="/seguranca.png"
                  alt="segurança"
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