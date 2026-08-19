import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './cadastroEquipe.module.css';

import prefeituraLogo from '../../../assets/prefeitura.png';
import arvoreLogo from '../../../assets/arvore.png';

import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  FileBadge,
  HardHat
} from 'lucide-react';

export default function CadastroEquipe() {
  const navigate = useNavigate();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpfMatricula: '',
    senha: '',
    confirmarSenha: ''
  });

  const formatarCpfOuMatricula = (value) => {
    const apenasNumeros = value.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value.toUpperCase().slice(0, 20);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpfMatricula') {
      setFormData((prev) => ({ ...prev, [name]: formatarCpfOuMatricula(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    if (formData.senha.length < 8) {
      alert('A senha deve conter no mínimo 8 caracteres.');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas informadas não coincidem.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/homee');
    }, 600);
  };

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR INSTITUCIONAL */}
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

        <div className={styles.sidebarContent}>
          <div className={styles.badgeEquipe}>
            <HardHat size={32} />
          </div>
          <h2>Portal de Operações</h2>
          <p>Credenciamento simplificado para agentes e fiscais ambientais de campo.</p>
        </div>

        <div className={styles.sidebarFooter}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        {/* CABEÇALHO */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Portal da Equipe Ambiental</h1>
              <p className={styles.subTitle}>Secretaria do Meio Ambiente</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button type="button" className={styles.btnVoltar} onClick={() => navigate('/')}>
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CARD DE CADASTRO SIMPLIFICADO */}
        <main className={styles.mainContent}>
          <div className={styles.loginCard}>
            <div className={styles.cardHeader}>
              <h2>Solicitação de Cadastro</h2>
              <p>Insira seus dados corporativos para solicitar acesso ao painel de campo.</p>
            </div>

            <form onSubmit={handleCadastro} className={styles.formLogin}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome Completo *</label>
                  <div className={styles.inputWithIcon}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Nome do fiscal/agente"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail Corporativo *</label>
                  <div className={styles.inputWithIcon}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="servidor.equipe@prefeitura.gov.br"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cpfMatricula">CPF ou Matrícula Funcional *</label>
                <div className={styles.inputWithIcon}>
                  <FileBadge size={18} className={styles.inputIcon} />
                  <input
                    id="cpfMatricula"
                    name="cpfMatricula"
                    type="text"
                    placeholder="Digite o CPF ou nº de matrícula"
                    value={formData.cpfMatricula}
                    onChange={handleChange}
                    maxLength={18}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="senha">Criar Senha Funcional *</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                      id="senha"
                      name="senha"
                      type={senhaVisivel ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.senha}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className={styles.togglePassBtn}
                      onClick={() => setSenhaVisivel(!senhaVisivel)}
                    >
                      {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={confirmarSenhaVisivel ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className={styles.togglePassBtn}
                      onClick={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
                    >
                      {confirmarSenhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.btnEntrar} disabled={isSubmitting}>
                {isSubmitting ? (
                  'Processando...'
                ) : (
                  <>
                    Cadastrar Servidor <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </main>

        <footer className={styles.loginFooter}>
          <p>
            © 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Exclusivo da Equipe
            Credenciada.
          </p>
        </footer>
      </div>
    </div>
  );
}