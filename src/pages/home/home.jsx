import { Link } from "react-router-dom";
import "./home.module.css";

//import img from '../../assets/secre.png'
/* ================= HOME ================= */

function Home() {
  return (
    <div className="container">

      <header className="topbar">
        <div className="header">

          <div className="header-logos">
            <div className="logo">
              <img src="logotupa.png" className="logo-img" />
              <img src="secretaria meio ambiente.png" className="logos" />
              {/*<img src={img} className="logos" />*/}
            </div>
          </div>

          <div className="actions">
            <a href="/login">Entrar</a>
            <button className="btn-outline">Criar uma conta</button>
          </div>

        </div>
      </header>

      <main className="main">

        <h1>CRIE SUA CONTA NA</h1>
        <h2>SECRETARIA DO MEIO AMBIENTE</h2>

        <p className="sub">
          Registre-se e conecte-se ao portal para solicitar serviços ambientais
        </p>

        <button className="btn-primary">
          Criar minha conta
        </button>

        <p className="login">
          Já possui conta? <a href="/login">Entrar</a>
        </p>

        <div className="cards-wrapper">

          <p className="perfil-title">
            SELECIONE SEU PERFIL:
          </p>

          <div className="cards">

            <div className="card">
              <img src="/img equipe.png" className="card-img" alt="Equipe" />
              <h3>Equipe</h3>
              <span>Membros das equipes</span>
              <button>Selecionar</button>
              
            </div>

            <div className="card">
              <img src="/img cidadão.png" className="card-img" alt="Cidadão" />
              <h3>Cidadão</h3>
              <span>Solicitação de serviços</span>
              <Link to= "/cadastro"><button>Selecionar</button></Link>

            </div>

            <div className="card">
              <img src="/img gestao.png" className="card-img" alt="Gestão" />
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

export default Home;