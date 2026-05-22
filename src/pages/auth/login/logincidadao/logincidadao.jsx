import styles from "./logincidadao.module.css";
import { Link } from "react-router-dom";

function LoginCidadao() {
  return (
    <div className={styles.container}>
      
      {/* LADO ESQUERDO */}
      <div className={styles.left}>
        <img
          src="/prefeitura.png"
          className={styles.logoPrefeitura}
          alt="Prefeitura"
        />

        <div className={styles.linha}></div>

        <div className={styles.footerLeft}>
          <img
            src="/arvore.png"
            className={styles.logoArvore}
            alt="Árvore"
          />
          <span>SECRETARIA DO MEIO AMBIENTE</span>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className={styles.right}>
        
        <div className={styles.topbar}>
          <img src="/meio-ambiente.png" alt="Meio Ambiente" />
          <span>SECRETARIA DO MEIO AMBIENTE</span>
        </div>

        <div className={styles.card}>
          <h2>Login do Cidadão</h2>

          <p>
            Entre com seu e-mail e senha para acessar sua conta
          </p>

          <input type="email" placeholder="E-mail" />

          <input type="password" placeholder="Senha" />

          <span className={styles.esqueceu}>
            Esqueceu sua senha?
          </span>

          <Link to = "/cidadao"><button>ENTRAR</button></Link>

          <div className={styles.links}>
            <span>Novo por aqui?</span>
            <a href="/">Crie sua conta</a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginCidadao;