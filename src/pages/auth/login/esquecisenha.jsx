import { Link } from 'react-router-dom';
import { Trees, ArrowLeft } from 'lucide-react';
import styles from './esquecisenha.module.css';
export default function EsqueciSenha() {
  return <div className={styles.appContainer}><div className={styles.authCard}>
    <div className={styles.brandHeader}><div className={styles.logoIcon}><Trees size={32} color="#ffffff" /></div><div className={styles.brandText}><strong>SISTEMA AMBIENTAL</strong><span>Recuperação de Acesso</span></div></div>
    <div className={styles.formSection}><h2 className={styles.title}>Precisa recuperar o acesso?</h2><p className={styles.subtitle}>A recuperação por e-mail ainda não está disponível. Entre em contato com a administração do projeto para receber ajuda com a sua conta.</p><p className={styles.subtitle}>Se você consegue entrar e deseja trocar a senha, abra Meu perfil.</p></div>
    <div className={styles.footerActions}><Link to="/login" className={styles.linkVoltar}><ArrowLeft size={16} /> Voltar para o Login</Link></div>
  </div></div>;
}
