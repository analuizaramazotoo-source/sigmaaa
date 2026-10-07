import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trees, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import styles from './esquecisenha.module.css';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [enviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      alert('Por favor, informe seu e-mail ou CPF.');
      return;
    }
    // Aqui entraria a integração com a API para disparar o e-mail
    alert('O envio de recuperação por e-mail ainda não está disponível. Procure a Secretaria para recuperar o acesso.');
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.authCard}>
        
        {/* CABEÇALHO DO CARD */}
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <Trees size={32} color="#ffffff" />
          </div>
          <div className={styles.brandText}>
            <strong>SISTEMA AMBIENTAL</strong>
            <span>Recuperação de Acesso</span>
          </div>
        </div>

        {/* CONTEÚDO DINÂMICO (Formulário ou Mensagem de Sucesso) */}
        {!enviado ? (
          <div className={styles.formSection}>
            <h2 className={styles.title}>Esqueceu sua senha?</h2>
            <p className={styles.subtitle}>
              Digite o e-mail cadastrado. Enviaremos um link para você redefinir sua senha.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    id="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Enviar link de recuperação
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successSection}>
            <CheckCircle2 size={56} className={styles.successIcon} />
            <h2 className={styles.title}>E-mail enviado!</h2>
            <p className={styles.subtitle}>
              Se o endereço <strong>{email}</strong> estiver cadastrado, você receberá as instruções em instantes. Verifique também sua caixa de spam.
            </p>
          </div>
        )}

        {/* LINK PARA VOLTAR */}
        <div className={styles.footerActions}>
          <Link to="/login" className={styles.linkVoltar}>
            <ArrowLeft size={16} />
            Voltar para o Login
          </Link>
        </div>

      </div>
    </div>
  );
}
