import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setSession, perform } from '../../../../services/originalScreens';
import styles from './logincidadao.module.css';
import { Link } from "react-router-dom";

function LoginCidadao() {
  const [email, setEmail] = useState(''), [senha, setSenha] = useState('');
  const navigate = useNavigate();
  async function entrar() { await perform(async () => { const session = await api('/auth/login', { method: 'POST', body: { identificador: email, senha, perfil: 'cidadao' }}); setSession(session); navigate('/cidadao'); }); }
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

          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />

          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />

          <span className={styles.esqueceu}>
            Esqueceu sua senha?
          </span>

          <button onClick={entrar}>ENTRAR</button>

          <div className={styles.links}>
            <span>Novo por aqui?</span>
            <Link to="/cadastro">Crie sua conta</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginCidadao;