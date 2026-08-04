import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./cadastrog.module.css";

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

import { Mail, Lock, Key, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Cadastrog() {
  const navigate = useNavigate();
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const [formData, setFormData] = useState({
    login: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Navega diretamente para o painel após o login
    navigate('/home');
  };

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR COMPACTA (Apenas identidade visual) */}
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <img src={arvoreLogo} alt="Logo Árvore" className={styles.brandImg} />
          </div>
          <div className={styles.brandText}>
            <strong>SISTEMA DE GESTÃO</strong>
            <span>MUNICIPAL AMBIENTAL</span>
          </div>
        </div>

        <div className={styles.sidebarInfo}>
          <Shield size={48} className={styles.shieldIcon} />
          <h2>Acesso Restrito</h2>
          <p>Portal exclusivo para servidores e fiscais da Secretaria do Meio Ambiente.</p>
        </div>

        <div className={styles.sidebarFooterLogo}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </aside>

      {/* ÁREA PRINCIPAL - CARD DE LOGIN */}
      <div className={styles.mainWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.loginCard}>
            <div className={styles.loginCardHeader}>
              <div className={styles.headerIconBadge}>
                <Key size={24} />
              </div>
              <div>
                <h2>Autenticação de Servidor</h2>
                <p>Insira suas credenciais para acessar o painel de fiscalização.</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="login">E-mail Institucional ou Matrícula *</label>
                <div className={styles.inputWithIcon}>
                  <Mail size={18} className={styles.fieldIcon} />
                  <input 
                    id="login"
                    name="login"
                    type="text" 
                    placeholder="servidor@prefeitura.gov.br"
                    value={formData.login}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha de Acesso *</label>
                <div className={styles.inputWithIcon}>
                  <Lock size={18} className={styles.fieldIcon} />
                  <input 
                    id="senha"
                    name="senha"
                    type={senhaVisivel ? "text" : "password"} 
                    placeholder="••••••••"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button" 
                    className={styles.togglePasswordBtn}
                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                  >
                    {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.loginFooterActions}>
                <button type="submit" className={styles.btnSubmit}>
                  Entrar no Sistema <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>
    </div>
  );
}