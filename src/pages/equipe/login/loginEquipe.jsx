import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loginEquipe.module.css';

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

import { 
  Users, Mail, Lock, Eye, EyeOff, ShieldCheck, 
  ArrowRight, Compass, ArrowLeft 
} from 'lucide-react';

export default function LoginEquipe() {
  const navigate = useNavigate();
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const [formData, setFormData] = useState({
    identificador: '',
    senha: '',
    setor: 'fiscalizacao',
    turno: 'diurno'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Redireciona diretamente para a Home da Equipe (/homee)
    navigate('/homee');
  };

  return (
    <div className={styles.appContainer}>
      {/* PAINEL LATERAL INFORMATIVO DA EQUIPE */}
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
            <Users size={32} />
          </div>
          <h2>Portal de Operações</h2>
          <p>Autenticação unificada para equipes de campo, analistas de licenciamento e fiscais ambientais.</p>

          <div className={styles.infoCards}>
            <div className={styles.infoCardItem}>
              <ShieldCheck size={20} />
              <span>Conexão Segura e Auditada</span>
            </div>
            <div className={styles.infoCardItem}>
              <Compass size={20} />
              <span>Sincronização de Geolocalização</span>
            </div>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DA EQUIPE */}
      <div className={styles.mainWrapper}>
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Portal da Equipe Ambiental</h1>
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

        {/* ÁREA DO FORMULÁRIO DE LOGIN */}
        <main className={styles.mainContent}>
          <div className={styles.loginCard}>
            <div className={styles.cardHeader}>
              <h2>Acesso de Equipes</h2>
              <p>Insira suas credenciais corporativas para iniciar a jornada de trabalho.</p>
            </div>

            <form onSubmit={handleLogin} className={styles.formLogin}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="setor">Setor / Módulo</label>
                  <select 
                    id="setor" 
                    name="setor"
                    value={formData.setor} 
                    onChange={handleChange}
                  >
                    <option value="fiscalizacao">Fiscalização de Campo</option>
                    <option value="licenciamento">Licenciamento Ambiental</option>
                    <option value="monitoramento">Monitoramento Urbano</option>
                    <option value="gestao">Gestão / Coordenação</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="turno">Turno Operacional</label>
                  <select 
                    id="turno" 
                    name="turno"
                    value={formData.turno} 
                    onChange={handleChange}
                  >
                    <option value="diurno">Diurno (07:00 - 16:00)</option>
                    <option value="vespertino">Vespertino (13:00 - 22:00)</option>
                    <option value="plantao">Plantão 24h / Emergências</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="identificador">E-mail Institucional ou Matrícula *</label>
                <div className={styles.inputWithIcon}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input 
                    id="identificador"
                    name="identificador"
                    type="text" 
                    placeholder="servidor.equipe@prefeitura.gov.br"
                    value={formData.identificador}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senha">Senha Funcional *</label>
                <div className={styles.inputWithIcon}>
                  <Lock size={18} className={styles.inputIcon} />
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
                    className={styles.togglePassBtn}
                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                  >
                    {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked /> Manter sessão ativa no dispositivo
                </label>
              </div>

              <button type="submit" className={styles.btnEntrar}>
                Entrar no Sistema <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </main>

        <footer className={styles.loginFooter}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Exclusivo da Equipe Credenciada.</p>
        </footer>
      </div>
    </div>
  );
}