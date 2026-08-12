import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './homee.module.css';
import { 
  Eye, ClipboardList, FileText, BarChart2, HelpCircle, 
  Bell, ChevronDown, CheckCircle2, Clock, 
  Shield, LogOut 
} from 'lucide-react';

export default function HomeE() {
  const navigate = useNavigate();
  const location = useLocation();

  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  const handleConfirmLogout = () => {
    setModalLogout(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brandHeader}>
            <div className={styles.logoIcon}>
              <Shield size={22} />
            </div>
            <div className={styles.brandText}>
              <strong>EQUIPE DE CAMPO</strong>
              <span>PAINEL OPERACIONAL</span>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            <span className={styles.navCategory}>
              MENU DO SERVIDOR
            </span>

            <Link
              to="/homee"
              className={isActive('/homee') ? styles.navItemActive : styles.navItem}
            >
              <Eye size={18} /> Visão Geral da Cidade
            </Link>

            <Link
              to="/filae"
              className={isActive('/filae') ? styles.navItemActive : styles.navItem}
            >
              <ClipboardList size={18} /> Fila de Vistorias
            </Link>

            <Link
              to="/autoe"
              className={isActive('/autoe') ? styles.navItemActive : styles.navItem}
            >
              <FileText size={18} /> Emitir Auto / Notificação
            </Link>

            <Link
              to="/relatorioe"
              className={isActive('/relatorioe') ? styles.navItemActive : styles.navItem}
            >
              <BarChart2 size={18} /> Enviar Relatório
            </Link>

            <Link
              to="/leise"
              className={isActive('/leise') ? styles.navItemActive : styles.navItem}
            >
              <HelpCircle size={18} /> Consulta a Leis
            </Link>
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerTitle}>Prefeitura Municipal</div>
          <div className={styles.footerSubtitle}>Secretaria do Meio Ambiente</div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Painel Operacional de Campo</h1>
              <span className={styles.headerSubtitle}>Fiscalização e Execução de Vistorias Ambientais</span>
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
                aria-label="Notificações Internas"
              >
                <Bell size={18} />
                {unreadNotifications > 0 && <span className={styles.badge}>{unreadNotifications}</span>}
              </button>

              {showNotifications && (
                <div className={styles.popoverMenu}>
                  <div className={styles.popoverHeader}>
                    <strong>Notificações de Campo</strong>
                    <button 
                      onClick={() => setUnreadNotifications(0)}
                      className={styles.textBtn}
                    >
                      Limpar
                    </button>
                  </div>
                  <ul className={styles.notificationList}>
                    <li>📌 Nova ordem de vistoria atribuída ao seu setor.</li>
                    <li>⚠️ Alerta de queimada recorrente na Zona Norte.</li>
                    <li>📋 Atualização na norma de podas disponível.</li>
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
                <div className={styles.avatar}>EC</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Equipe de Campo</span>
                  <span className={styles.userRole}>Operacional</span>
                </div>
                <ChevronDown size={16} />
              </button>

              {showUserDropdown && (
                <div className={styles.popoverMenuRight}>
                  <div className={styles.userMenuHeader}>
                    <strong>Equipe Operacional</strong>
                    <span>Fiscal de Campo</span>
                  </div>

                  <button 
                    onClick={() => setModalLogout(true)} 
                    className={`${styles.menuItemBtn} ${styles.dangerText}`}
                  >
                    <LogOut size={16} /> Sair da Conta
                  </button>
                </div>
              )}
            </div>

            {/* BOTÃO DE DESLOGAR */}
            <button 
              onClick={() => setModalLogout(true)} 
              title="Sair do Sistema"
              style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                padding: '8px 12px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginLeft: '10px'
              }}
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <section className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
              <h2>Visão Geral da Cidade</h2>
              <p>Acompanhe e execute as vistorias atribuídas à sua equipe em tempo real.</p>
            </div>
          </section>

          <section className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIcon_info}`}>
                <ClipboardList size={22} />
              </div>
              <div className={styles.statData}>
                <span className={styles.statTitle}>Vistorias Atribuídas</span>
                <strong className={styles.statValue}>12</strong>
                <span className={styles.statSubtitle}>Na sua fila de trabalho</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIcon_warning}`}>
                <Clock size={22} />
              </div>
              <div className={styles.statData}>
                <span className={styles.statTitle}>Pendentes</span>
                <strong className={styles.statValue}>5</strong>
                <span className={styles.statSubtitle}>Aguardando ida a campo</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIcon_success}`}>
                <CheckCircle2 size={22} />
              </div>
              <div className={styles.statData}>
                <span className={styles.statTitle}>Concluídas Hoje</span>
                <strong className={styles.statValue}>7</strong>
                <span className={styles.statSubtitle}>Relatórios finalizados</span>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE DESLOGAR */}
      {modalLogout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <LogOut size={24} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#065f46', fontSize: '1.2rem' }}>Encerrar Sessão</h3>
            <p style={{ color: '#047857', fontSize: '0.95rem', margin: '0 0 1.5rem 0' }}>
              Tem certeza que quer sair?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button 
                onClick={() => setModalLogout(false)} 
                className={styles.btnCancel}
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmLogout} 
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
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