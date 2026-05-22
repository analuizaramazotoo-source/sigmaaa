import styles from "./login.module.css"
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function voltarPagina() {
    navigate("/");
  }

  return (
    <div className="container">

      <header className="topbar">
        <div className="header">

          <div className="logo">
            <img src="/logotupa.png" alt="Prefeitura" className="logo-img" />

            <div className="logo-text">
              <div className="secretaria">
                <img src="/secre.png" alt="Meio Ambiente" />
              </div>
            </div>
          </div>

          <div className="actions">
            <button
              className="btn-outline"
              onClick={voltarPagina}
            >
              Voltar
            </button>
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="main">

        <h1>ENTRE NA</h1>
        <h2>SECRETARIA DO MEIO AMBIENTE</h2>

        <div className="cards-wrapper">

          <p className="perfil-title">
            SELECIONE SEU PERFIL:
          </p>

          <div className="cards">

            <div className="card">
              <img src="/equipe.png" className="card-img" alt="Equipe" />
              <h3>Equipe</h3>
              <span>Membros das equipes</span>
              <button>Selecionar</button>
            </div>

            <div className="card">
              <img src="/cidadao.png" className="card-img" alt="Cidadão" />
              <h3>Cidadão</h3>
              <span>Solicitação de serviços</span>
              <Link to = "/logincidadao"><button>Selecionar</button></Link>
            </div>

            <div className="card">
              <img src="/equipe.png" className="card-img" alt="Equipe" />
              <h3>Equipe</h3>
              <span>Membros das equipes</span>
              <button>Selecionar</button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;