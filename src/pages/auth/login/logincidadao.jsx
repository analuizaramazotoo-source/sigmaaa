import "./logincidadao.css";

function LoginCidadao() {
  return (
    <div className="container">
      {/* LADO ESQUERDO */}
      <div className="left">
        <img src="/prefeitura.png" className="logo-prefeitura" />

        <div className="linha"></div>

        <div className="footer-left">
          <img src="/arvore.png" className="logo-arvore" />
          <span>SECRETARIA DO MEIO AMBIENTE</span>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="right">
        <div className="topbar">
          <img src="/meio-ambiente.png" />
          <span>SECRETARIA DO MEIO AMBIENTE</span>
        </div>

        <div className="card">
          <h2>Login do Cidadão</h2>
          <p>Entre com seu e-mail e senha para acessar sua conta</p>

          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />

          <span className="esqueceu">Esqueceu sua senha?</span>

          <button>ENTRAR</button>

          <div className="links">
            <span>Novo por aqui?</span>
            <a href="#">Crie sua conta</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCidadao;