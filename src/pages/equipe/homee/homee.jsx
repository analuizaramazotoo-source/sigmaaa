import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './homee.module.css';

// CAMINHOS DE IMPORTAÇÃO DAS IMAGENS
import prefeituraLogo from '../../../assets/prefeitura.png';
import arvoreLogo from '../../../assets/arvore.png';

import { 
  MapPin, 
  ClipboardList, 
  FileText, 
  BarChart2, 
  BookOpen, 
  Bell, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Map as MapIcon, 
  ArrowUpRight, 
  Flame, 
  Trash2, 
  Droplet,
  Users,
  User
} from 'lucide-react';

const VISTORIAS_INICIAIS = [
  {
    id: 201,
    titulo: "Vistoria de Queimada em Lote",
    endereco: "Rua Ipê Amarelo, 88 - Bairro Flores",
    status: "Pendente",
    statusType: "warning",
    prioridade: "Alta",
    top: "38%",
    left: "45%",
    icon: Flame
  },
  {
    id: 202,
    titulo: "Inspeção de Descarte de Entulho",
    endereco: "Av. das Palmeiras, 450 - Centro",
    status: "Em Campo",
    statusType: "info",
    prioridade: "Média",
    top: "55%",
    left: "62%",
    icon: Trash2
  },
  {
    id: 203,
    titulo: "Verificação de Poda Irregular",
    endereco: "Rua dos Sabiás, 12 - Jd. América",
    status: "Concluído",
    statusType: "success",
    prioridade: "Baixa",
    top: "30%",
    left: "25%",
    icon: Droplet
  }
];

export default function HomeE() {
  const navigate = useNavigate();
  const location = useLocation();

  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [selectedVistoria, setSelectedVistoria] = useState(null);

  const handleConfirmLogout = () => {
    setModalLogout(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // MENU LATERAL COM ÍCONE DE PESSOA/EQUIPE CORRIGIDO (<Users size={22} />)
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee', ativo: true },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe' },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/leise' },
    { id: 'perfil', titulo: 'Perfil da Equipe', icon: <Users size={22} />, rota: '/perfile' },
  ];

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader} onClick={() => navigate('/homee')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <img src={arvoreLogo} alt="Logo Meio Ambiente" className={styles.brandImg} />
          </div>
          <div className={styles.brandText}>
            <strong>EQUIPE DE CAMPO</strong>
            <span>PAINEL OPERACIONAL</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <span className={styles.navCategory}>Menu do Servidor</span>
          {menuModulos.map(item => (
            <button 
              key={item.id} 
              className={`${styles.navItem} ${item.ativo ? styles.navItemActive : ''}`} 
              onClick={() => navigate(item.rota)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navTitle}>{item.titulo}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
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
                type="button"
                className={styles.iconBtn} 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserDropdown(false);
                }}
                aria-label="Notificações Internas"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && <span className={styles.badge}>{unreadNotifications}</span>}
              </button>

              {showNotifications && (
                <div className={styles.popoverMenu}>
                  <div className={styles.popoverHeader}>
                    <strong>Notificações de Campo</strong>
                    <button 
                      type="button"
                      onClick={() => setUnreadNotifications(0)}
                      className={styles.textBtn}
                    >
                      Limpar
                    </button>
                  </div>
                  <ul className={styles.notificationList}>
                    <li>📌 Nova ordem de vistoria atribuída ao seu setor.</li>
                    <li>⚠️ Alerta de queimada recorrente na Zona Norte.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* ÍCONE DE PESSOA E PERFIL CLICÁVEL NO HEADER */}
            <div 
              className={styles.userProfile}
              onClick={() => navigate('/perfile')}
              style={{ cursor: 'pointer' }}
              title="Acessar Perfil da Equipe"
            >
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </div>

            <button 
              type="button"
              className={styles.btnLogout}
              onClick={() => setModalLogout(true)} 
              title="Sair do Sistema"
            >
              <LogOut size={18} />
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

          <section className={styles.contentGrid}>
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Mapa Tático de Campo</h3>
                <span className={styles.badgeSub}>3 PONTOS ATIVOS</span>
              </div>

              <div className={styles.mapCanvasWrapper}>
                <div className={styles.mapCanvas}>
                  <div className={styles.mapWatermark}>
                    <MapIcon size={48} />
                    <span>Mapeamento Operacional em Tempo Real</span>
                  </div>

                  {VISTORIAS_INICIAIS.map((v) => (
                    <div 
                      key={v.id} 
                      className={styles.mapPin}
                      style={{ top: v.top, left: v.left }}
                      onClick={() => setSelectedVistoria(v)}
                      title={v.titulo}
                    >
                      <MapPin size={18} color="#ffffff" />
                    </div>
                  ))}
                </div>

                <div className={styles.mapLegend}>
                  <span>Legenda:</span>
                  <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotWarning}`} /> Pendente</span>
                  <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotInfo}`} /> Em Campo</span>
                  <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotSuccess}`} /> Concluído</span>
                </div>
              </div>
            </div>

            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Minhas Vistorias do Dia</h3>
                <Link to="/filae" className={styles.linkActionBtn}>
                  Ver Fila Completa <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className={styles.requestsList}>
                {VISTORIAS_INICIAIS.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div 
                      key={item.id} 
                      className={styles.requestCardSelectable}
                      onClick={() => setSelectedVistoria(item)}
                    >
                      <div className={styles.requestIcon}>
                        <ItemIcon size={18} />
                      </div>
                      <div className={styles.requestBody}>
                        <strong className={styles.requestTitle}>#{item.id} - {item.titulo}</strong>
                        <p className={styles.requestAddress}>{item.endereco}</p>
                      </div>
                      <div className={styles.requestMeta}>
                        <span className={`${styles.badgeStatus} ${styles[`status_${item.statusType}`]}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DETALHES VISTORIA */}
      {selectedVistoria && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Vistoria #{selectedVistoria.id}</h3>
              <button type="button" onClick={() => setSelectedVistoria(null)} className={styles.closeBtnModal}>X</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div><strong>Título:</strong> {selectedVistoria.titulo}</div>
              <div><strong>Local:</strong> {selectedVistoria.endereco}</div>
              <div><strong>Prioridade:</strong> {selectedVistoria.prioridade}</div>
              <div><strong>Status:</strong> <span className={`${styles.badgeStatus} ${styles[`status_${selectedVistoria.statusType}`]}`}>{selectedVistoria.status}</span></div>
            </div>
            <div className={styles.modalActions}>
              <button type="button" onClick={() => setSelectedVistoria(null)} className={styles.btnCancel}>Fechar</button>
              <button type="button" onClick={() => { setSelectedVistoria(null); navigate('/autoe'); }} className={styles.btnPrimaryModal}>Emitir Auto/Notificação</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LOGOUT */}
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
              <button type="button" onClick={() => setModalLogout(false)} className={styles.btnCancel}>
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