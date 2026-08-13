import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './perfil.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Bell, ChevronDown, Menu, X, Shield, 
  LogOut, Settings, Save, Key, Mail, Phone, BadgeCheck, Camera, ArrowLeft
} from 'lucide-react';

export default function Perfil() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  // Estado dos dados do Perfil
  const [userData, setUserData] = useState({
    name: 'Ana Luiza Silva',
    email: 'ana.silva@prefeitura.gov.br',
    phone: '(11) 98765-4321',
    matricula: '48.201',
    cargo: 'Fiscal Ambiental Senior',
    departamento: 'Secretaria Municipal do Meio Ambiente',
    setor: 'Fiscalização e Controle Urbano'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleConfirmLogout = () => {
    setModalLogout(false);
    navigate('/login');
  };

  return (
    <div className={styles.appContainer}>
      {/* OVERLAY PARA MOBILE */}
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
          <Link to="/homeg" className={styles.navItem}>
            <Home size={18} /> Painel Geral
          </Link>
          <Link to="/geoprocessamento" className={styles.navItem}>
            <MapIcon size={18} /> Geoprocessamento
          </Link>
          <Link to="/fila-fiscalizacao" className={styles.navItem}>
            <ClipboardList size={18} /> Fila de Fiscalização
          </Link>
          <Link to="/autos-notificacoes-gestao" className={styles.navItem}>
            <FileText size={18} /> Autos e Notificações
          </Link>
          <Link to="/relatorios-tecnicos-gestao" className={styles.navItem}>
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
              <h1 className={styles.headerTitle}>Perfil do Servidor</h1>
              <span className={styles.headerSubtitle}>Dados cadastrais e credenciais de acesso</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            {/* NOTIFICAÇÕES */}
            <div className={styles.popoverContainer}>
              <button 
                type="button"
                className={styles.iconButton} 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserDropdown(false);
                }}
                aria-label="Notificações Internas"
              >
                <Bell size={18} />
              </button>

              {showNotifications && (
                <div className={styles.popoverMenu}>
                  <div className={styles.popoverHeader}>
                    <strong>Notificações Internas</strong>
                  </div>
                  <ul className={styles.notificationList}>
                    <li>📌 Alteração de dados requer validação do RH.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.dividerVertical} />

            {/* DROPDOWN USUÁRIO */}
            <div className={styles.popoverContainer}>
              <button 
                type="button"
                className={styles.userDropdown}
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifications(false);
                }}
              >
                <div className={styles.avatar}>AL</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{userData.name}</span>
                  <span className={styles.userRole}>Mat. {userData.matricula}</span>
                </div>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </button>

              {showUserDropdown && (
                <div className={styles.popoverMenuRight}>
                  <div className={styles.userMenuHeader}>
                    <strong>{userData.name}</strong>
                    <span>{userData.cargo}</span>
                  </div>
                  <div className={styles.menuDivider} />
                  
                  {/* OPÇÃO CONFIGURAÇÕES -> NAVEGA PARA /CONFIG */}
                  <button 
                    type="button" 
                    onClick={() => { setShowUserDropdown(false); navigate('/config'); }} 
                    className={styles.menuItemBtn}
                  >
                    <Settings size={16} /> Configurações
                  </button>

                  <div className={styles.menuDivider} />

                  {/* OPÇÃO SAIR DA CONTA -> ABRE MODAL */}
                  <button 
                    type="button"
                    onClick={() => { setShowUserDropdown(false); setModalLogout(true); }} 
                    className={`${styles.menuItemBtn} ${styles.dangerText}`}
                  >
                    <LogOut size={16} /> Sair da Conta
                  </button>
                </div>
              )}
            </div>

            {/* BOTÃO AMARELO DE VOLTAR */}
            <button 
              type="button"
              onClick={() => navigate('/homeg')} 
              style={{
                backgroundColor: '#fbc02d',
                color: '#000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginLeft: '10px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CONTEÚDO DO PERFIL */}
        <main className={styles.mainContent}>
          {savedSuccess && (
            <div className={`${styles.infoBanner} ${styles.status_success}`}>
              <div className={styles.infoContent}>
                <BadgeCheck size={24} />
                <div>
                  <strong>Perfil atualizado com sucesso!</strong>
                  <p>Suas alterações foram salvas no sistema municipal.</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.contentGrid}>
            {/* CARTÃO DE CREDENCIAL INTERNA */}
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Identificação Funcional</h3>
              </div>

              <div className={styles.profileBadgeWrapper}>
                <div className={styles.profileAvatarWrapper}>
                  <div className={styles.profileAvatar}>AL</div>
                  <button type="button" className={styles.avatarChangeBtn} title="Alterar Foto">
                    <Camera size={14} />
                  </button>
                </div>

                <div>
                  <h2 className={styles.profileName}>{userData.name}</h2>
                  <span className={styles.profileRole}>{userData.cargo}</span>
                </div>

                <div className={styles.badgeFunctionalCard}>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Matrícula:</span>
                    <strong>{userData.matricula}</strong>
                  </div>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Órgão:</span>
                    <strong>{userData.departamento}</strong>
                  </div>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Setor:</span>
                    <strong>{userData.setor}</strong>
                  </div>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Status:</span>
                    <span className={`${styles.badgeStatus} ${styles.status_resolvida}`}>
                      Ativo • Servidor Efetivo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO DE EDIÇÃO */}
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Dados de Contato & Acesso</h3>
              </div>

              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <label>
                  Nome Completo
                  <input 
                    type="text" 
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    required
                  />
                </label>

                <label>
                  E-mail Institucional
                  <div className={styles.inputWithIcon}>
                    <Mail size={16} className={styles.inputIcon} />
                    <input 
                      type="email" 
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      required
                    />
                  </div>
                </label>

                <label>
                  Telefone / Ramal Interno
                  <div className={styles.inputWithIcon}>
                    <Phone size={16} className={styles.inputIcon} />
                    <input 
                      type="text" 
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      required
                    />
                  </div>
                </label>

                <div className={styles.menuDivider} />

                <div className={styles.profileFormActions}>
                  <button 
                    type="button" 
                    className={styles.btnSecondary} 
                    onClick={() => alert("Solicitação de alteração de senha enviada para o e-mail institucional.")}
                  >
                    <Key size={16} /> Alterar Senha
                  </button>
                  <button type="submit" className={styles.btnPrimaryModal}>
                    <Save size={16} /> Salvar Perfil
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE SAÍDA */}
      {modalLogout && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '380px',
            textAlign: 'center',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <LogOut size={24} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#065f46', fontSize: '1.2rem' }}>Encerrar Sessão</h3>
            <p style={{ color: '#047857', fontSize: '0.95rem', margin: '0 0 1.5rem 0' }}>
              Tem certeza que quer sair?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button 
                type="button"
                onClick={() => setModalLogout(false)} 
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleConfirmLogout} 
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sim, Quero Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}