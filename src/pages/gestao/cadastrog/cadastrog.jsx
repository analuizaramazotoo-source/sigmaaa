import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./cadastrog.module.css";

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

import { 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Building2, 
  Briefcase, 
  FileBadge 
} from 'lucide-react';

export default function Cadastrog() {
  const navigate = useNavigate();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpfMatricula: '',
    cargo: 'diretor',
    secretaria: 'meio_ambiente',
    setor: 'fiscalizacao',
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
      setFormData(prev => ({ ...prev, [name]: formatarCpfOuMatricula(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    const emailLower = formData.email.trim().toLowerCase();
    if (emailLower.includes('@gmail.') || emailLower.includes('@hotmail.') || emailLower.includes('@yahoo.')) {
      alert("Atenção: Por questões de segurança, utilize o seu e-mail institucional corporativo ou governamental (@prefeitura.gov.br).");
      return;
    }

    if (formData.senha.length < 8) {
      alert("A senha deve conter no mínimo 8 caracteres para garantir a segurança da conta.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas informadas não coincidem. Por favor, verifique e tente novamente.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/homeg');
    }, 600);
  };

  return (
    <div className={styles.appContainer}>
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
          <ShieldCheck size={48} className={styles.shieldIcon} />
          <h2>Credenciamento de Gestão</h2>
          <p>Cadastro oficial para gestores e administradores da Secretaria do Meio Ambiente.</p>
        </div>

        <div className={styles.sidebarFooterLogo}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </aside>

      <div className={styles.mainWrapper}>
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Credenciamento de Gestor</h1>
              <p className={styles.subTitle}>Secretaria do Meio Ambiente</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button 
              type="button" 
              className={styles.btnVoltar} 
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.loginCard}>
            <div className={styles.loginCardHeader}>
              <div className={styles.headerIconBadge}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2>Solicitação de Cadastro</h2>
                <p>Preencha os dados abaixo para registrar sua conta de gestor ambiental.</p>
              </div>
            </div>

            <form onSubmit={handleCadastro} className={styles.loginForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome Completo *</label>
                  <div className={styles.inputWithIcon}>
                    <User size={18} className={styles.fieldIcon} />
                    <input 
                      id="nome"
                      name="nome"
                      type="text" 
                      placeholder="Nome do gestor"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail Institucional *</label>
                  <div className={styles.inputWithIcon}>
                    <Mail size={18} className={styles.fieldIcon} />
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="servidor.gestor@prefeitura.gov.br"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="cpfMatricula">CPF ou Matrícula Funcional *</label>
                  <div className={styles.inputWithIcon}>
                    <FileBadge size={18} className={styles.fieldIcon} />
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

                {/* CARGO COMO SELECT */}
                <div className={styles.formGroup}>
                  <label htmlFor="cargo">Cargo / Função *</label>
                  <div className={styles.inputWithIcon}>
                    <Briefcase size={18} className={styles.fieldIcon} />
                    <select 
                      id="cargo"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                    >
                      <option value="diretor">Diretor de Fiscalização</option>
                      <option value="coordenador">Coordenador Ambiental</option>
                      <option value="analista">Analista Ambiental</option>
                      <option value="chefe_setor">Chefe de Setor</option>
                      <option value="secretario">Secretário Adjunto</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="secretaria">Secretaria Municipal *</label>
                  <div className={styles.inputWithIcon}>
                    <Building2 size={18} className={styles.fieldIcon} />
                    <select 
                      id="secretaria"
                      name="secretaria"
                      value={formData.secretaria}
                      onChange={handleChange}
                      required
                    >
                      <option value="meio_ambiente">Secretaria do Meio Ambiente</option>
                      <option value="obras">Secretaria de Obras e Serviços</option>
                      <option value="planejamento">Secretaria de Planejamento Urbano</option>
                      <option value="administracao">Secretaria de Administração</option>
                    </select>
                  </div>
                </div>

                {/* SETOR / DEPARTAMENTO COMO SELECT */}
                <div className={styles.formGroup}>
                  <label htmlFor="setor">Setor / Departamento *</label>
                  <div className={styles.inputWithIcon}>
                    <Building2 size={18} className={styles.fieldIcon} />
                    <select 
                      id="setor"
                      name="setor"
                      value={formData.setor}
                      onChange={handleChange}
                      required
                    >
                      <option value="fiscalizacao">Fiscalização e Licenciamento</option>
                      <option value="monitoramento">Monitoramento e Controle</option>
                      <option value="gestao">Gestão de Recursos Naturais</option>
                      <option value="projetos">Projetos e Programas Ambientais</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="senha">Criar Senha de Acesso *</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={18} className={styles.fieldIcon} />
                    <input 
                      id="senha"
                      name="senha"
                      type={senhaVisivel ? "text" : "password"} 
                      placeholder="••••••••"
                      value={formData.senha}
                      onChange={handleChange}
                      minLength={8}
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

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={18} className={styles.fieldIcon} />
                    <input 
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={confirmarSenhaVisivel ? "text" : "password"} 
                      placeholder="••••••••"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                    <button 
                      type="button" 
                      className={styles.togglePasswordBtn}
                      onClick={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
                    >
                      {confirmarSenhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.loginFooterActions}>
                <button 
                  type="submit" 
                  className={styles.btnSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : <>Cadastrar Gestor <ArrowRight size={18} /></>}
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