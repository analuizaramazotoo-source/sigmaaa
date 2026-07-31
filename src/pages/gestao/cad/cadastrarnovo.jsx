import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './cadastrarGestor.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Bell, ChevronDown, Menu, X, Shield, 
  LogOut, User, Settings, UserPlus, CheckCircle2, ArrowLeft, Mail, Lock, Key
} from 'lucide-react';

export default function CadastrarGestor() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    matricula: '',
    cargo: 'Fiscal Ambiental',
    departamento: 'Secretaria Municipal do Meio Ambiente',
    permissao: 'gestor',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas digitadas não coincidem.');
      return;
    }

    setSuccessMessage(`Servidor(a) ${formData.nome} cadastrado(a) com sucesso!`);
    
    // Clear form
    setFormData({
      nome: '',
      email: '',
      cpf: '',
      matricula: '',
      cargo: 'Fiscal Ambiental',
      departamento: 'Secretaria Municipal do Meio Ambiente',
      permissao: 'gestor',
      senha: '',
      confirmarSenha: ''
    });

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className={styles.appContainer}>
      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setSidebarOpen(false)} 
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR OPERACIONAL */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <Shield size={24} />
          </div>
          <div className={styles.brandText}>
            <strong>SISTEMA DE GESTÃO</strong>
            <span>MUNICIPAL AMBIENTAL</span>
          </div>
          <button 
            className={styles.closeMenuBtn} 
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.navigation}>
          <Link to="/home" className={styles.navItem}>
            <Home size={18} /> Painel Geral
          </Link>
          <Link to="/geoprocessamento" className={styles.navItem}>
            <MapIcon size={18} /> Geoprocessamento
          </Link>
          <Link to="/fila-fiscalizacao" className={styles.navItem}>
            <ClipboardList size={18} /> Fila de Fiscalização
          </Link>
          <Link to="/autos-notificacoes" className={styles.navItem}>
            <FileText size={18} /> Autos e Notificações
          </Link>
          <Link to="/relatorios-tecnicos" className={styles.navItem}>
            <BarChart2 size={18} /> Relatórios Técnicos
          </Link>
          <Link to="/legislacao" className={styles.navItem}>
            <HelpCircle size={18} /> Legislação
          </Link>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.hamburgerBtn} 
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className={styles.headerTitle}>Novo Servidor / Gestor</h1>
              <span className={styles.headerSubtitle}>Cadastro e concessão de credenciais institucionais</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.popoverContainer}>
              <button 
                className={styles.iconButton} 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserDropdown(false);
                }}
                aria-label="Notificações"
              >
                <Bell size={18} />
              </button>

              {showNotifications && (
                <div className={styles.popoverMenu}>
                  <div className={styles.popoverHeader}>
                    <strong>Notificações Internas</strong>
                  </div>
                  <ul className={styles.notificationList}>
                    <li>📌 Novo usuário aguardando liberação de acesso.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.dividerVertical} />

            <div className={styles.popoverContainer}>
              <button 
                className={styles.userDropdown}
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifications(false);
                }}
              >
                <div className={styles.avatar}>AL</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Ana Luiza Silva</span>
                  <span className={styles.userRole}>Mat. 48.201</span>
                </div>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </button>

              {showUserDropdown && (
                <div className={styles.popoverMenuRight}>
                  <div className={styles.userMenuHeader}>
                    <strong>Ana Luiza Silva</strong>
                    <span>Fiscal Ambiental Senior</span>
                  </div>
                  <div className={styles.menuDivider} />
                  <Link to="/perfil" className={styles.menuItemBtn}>
                    <User size={16} /> Meu Perfil
                  </Link>
                  <Link to="/configuracoes" className={styles.menuItemBtn}>
                    <Settings size={16} /> Configurações
                  </Link>
                  <div className={styles.menuDivider} />
                  <button 
                    onClick={() => navigate('/login')} 
                    className={`${styles.menuItemBtn} ${styles.dangerText}`}
                  >
                    <LogOut size={16} /> Sair da Conta
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTEÚDO DA TELA DE CADASTRO */}
        <main className={styles.mainContent}>
          <div className={styles.topBarActions}>
            <Link to="/configuracoes" className={styles.btnBack}>
              <ArrowLeft size={16} /> Voltar para Configurações
            </Link>
          </div>

          {successMessage && (
            <div className={styles.successBanner}>
              <CheckCircle2 size={22} />
              <div>
                <strong>Sucesso!</strong>
                <p>{successMessage}</p>
              </div>
            </div>
          )}

          <div className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <div className={styles.headerIconBadge}>
                <UserPlus size={22} />
              </div>
              <div>
                <h2>Formulário de Acreditação</h2>
                <p>Insira os dados cadastrais do servidor para liberar a conta no sistema de gestão ambiental.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.registerForm}>
              <div className={styles.sectionDivider}>
                <span>Dados Pessoais e Funcionais</span>
              </div>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="nome">Nome Completo *</label>
                  <input 
                    id="nome"
                    name="nome"
                    type="text" 
                    placeholder="Ex: Carlos Eduardo de Oliveira"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail Institucional *</label>
                  <div className={styles.inputWithIcon}>
                    <Mail size={16} className={styles.fieldIcon} />
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="carlos.oliveira@prefeitura.gov.br"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cpf">CPF *</label>
                  <input 
                    id="cpf"
                    name="cpf"
                    type="text" 
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="matricula">Matrícula Funcional *</label>
                  <input 
                    id="matricula"
                    name="matricula"
                    type="text" 
                    placeholder="Ex: 52.890"
                    value={formData.matricula}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cargo">Cargo / Função *</label>
                  <input 
                    id="cargo"
                    name="cargo"
                    type="text" 
                    placeholder="Ex: Fiscal Ambiental Senior"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="departamento">Órgão / Departamento</label>
                  <input 
                    id="departamento"
                    name="departamento"
                    type="text" 
                    value={formData.departamento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.sectionDivider}>
                <span>Nível de Acesso e Credenciais</span>
              </div>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="permissao">Nível de Permissão no Sistema *</label>
                  <select 
                    id="permissao"
                    name="permissao"
                    value={formData.permissao}
                    onChange={handleChange}
                  >
                    <option value="gestor">Gestor Geral (Acesso Total ao Módulo)</option>
                    <option value="fiscal">Fiscal de Campo (Ação e Vistorias)</option>
                    <option value="analista">Analista Técnico (Relatórios e Legislação)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="senha">Senha Provisória *</label>
                  <div className={styles.inputWithIcon}>
                    <Key size={16} className={styles.fieldIcon} />
                    <input 
                      id="senha"
                      name="senha"
                      type="password" 
                      placeholder="••••••••"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha">Confirmar Senha Provisória *</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={16} className={styles.fieldIcon} />
                    <input 
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password" 
                      placeholder="••••••••"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formFooterActions}>
                <button 
                  type="button" 
                  className={styles.btnSecondary}
                  onClick={() => navigate('/configuracoes')}
                >
                  Cancelar
                </button>

                <button type="submit" className={styles.btnSubmit}>
                  <UserPlus size={18} /> Efetuar Cadastro
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