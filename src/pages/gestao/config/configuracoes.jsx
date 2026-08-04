import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './homeg.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Bell, ChevronDown, Menu, X, Shield, 
  LogOut, User, Settings, UserPlus, Sliders, Lock, CheckCircle2
} from 'lucide-react';

export default function Configuracoes() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Aba ativa nas configurações (Geral, Notificações, Cadastrar Gestor)
  const [activeTabConfig, setActiveTabConfig] = useState('gestores');

  // Mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState('');

  // Estado do formulário de novo gestor
  const [novoGestor, setNovoGestor] = useState({
    nome: '',
    email: '',
    cpf: '',
    matricula: '',
    cargo: 'Fiscal Ambiental',
    permissao: 'gestor'
  });

  // Estados de Preferências
  const [preferences, setPreferences] = useState({
    notifEmail: true,
    notifPush: true,
    raioAtuacao: '10km',
    tema: 'claro'
  });

  const handleCadastrarGestor = (e) => {
    e.preventDefault();
    setSuccessMessage(`Gestor(a) ${novoGestor.nome} cadastrado(a) com sucesso!`);
    setNovoGestor({
      nome: '',
      email: '',
      cpf: '',
      matricula: '',
      cargo: 'Fiscal Ambiental',
      permissao: 'gestor'
    });
    setTimeout(() => setSuccessMessage(''), 4000);
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
              <h1 className={styles.headerTitle}>Configurações do Sistema</h1>
              <span className={styles.headerSubtitle}>Preferências da plataforma e gestão de acessos</span>
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

        {/* CONTEÚDO PRINCIPAL DE CONFIGURAÇÕES */}
        <main className={styles.mainContent}>
          {successMessage && (
            <div className={`${styles.infoBanner} ${styles.status_success}`}>
              <div className={styles.infoContent}>
                <CheckCircle2 size={24} />
                <div>
                  <strong>Sucesso!</strong>
                  <p>{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.contentGrid}>
            {/* MENU LATERAL DE ABAS DAS CONFIGURAÇÕES */}
            <div className={styles.cardSection} style={{ height: 'fit-content' }}>
              <div className={styles.cardHeader}>
                <h3>Opções</h3>
              </div>
              <div className={styles.filterOptions} style={{ flexDirection: 'column' }}>
                <button 
                  className={activeTabConfig === 'gestores' ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setActiveTabConfig('gestores')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                >
                  <UserPlus size={16} /> Cadastrar Novo Gestor
                </button>
                <button 
                  className={activeTabConfig === 'geral' ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setActiveTabConfig('geral')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                >
                  <Sliders size={16} /> Preferências do Sistema
                </button>
                <button 
                  className={activeTabConfig === 'seguranca' ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setActiveTabConfig('seguranca')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                >
                  <Lock size={16} /> Segurança & Auditoria
                </button>
              </div>
            </div>

            {/* CONTEÚDO DA ABA SELECIONADA */}
            <div className={styles.cardSection}>
              {/* ABA 1: CADASTRAR NOVO GESTOR */}
              {activeTabConfig === 'gestores' && (
                <>
                  <div className={styles.cardHeader}>
                    <h3>Cadastrar Novo Servidor / Gestor</h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                    Preencha os dados abaixo para conceder acesso administrativo ao sistema de gestão ambiental.
                  </p>

                  <form onSubmit={handleCadastrarGestor} className={styles.modalForm}>
                    <label>
                      Nome Completo do Servidor
                      <input 
                        type="text" 
                        placeholder="Ex: João Pedro Santos"
                        value={novoGestor.nome}
                        onChange={(e) => setNovoGestor({...novoGestor, nome: e.target.value})}
                        required
                      />
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <label>
                        E-mail Institucional
                        <input 
                          type="email" 
                          placeholder="nome@prefeitura.gov.br"
                          value={novoGestor.email}
                          onChange={(e) => setNovoGestor({...novoGestor, email: e.target.value})}
                          required
                        />
                      </label>

                      <label>
                        CPF
                        <input 
                          type="text" 
                          placeholder="000.000.000-00"
                          value={novoGestor.cpf}
                          onChange={(e) => setNovoGestor({...novoGestor, cpf: e.target.value})}
                          required
                        />
                      </label>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <label>
                        Matrícula Funcional
                        <input 
                          type="text" 
                          placeholder="Ex: 50.129"
                          value={novoGestor.matricula}
                          onChange={(e) => setNovoGestor({...novoGestor, matricula: e.target.value})}
                          required
                        />
                      </label>

                      <label>
                        Cargo / Função
                        <input 
                          type="text" 
                          placeholder="Ex: Analista Ambiental"
                          value={novoGestor.cargo}
                          onChange={(e) => setNovoGestor({...novoGestor, cargo: e.target.value})}
                          required
                        />
                      </label>
                    </div>

                    <label>
                      Nível de Permissão
                      <select 
                        value={novoGestor.permissao}
                        onChange={(e) => setNovoGestor({...novoGestor, permissao: e.target.value})}
                      >
                        <option value="gestor">Gestor Geral (Acesso Total)</option>
                        <option value="fiscal">Fiscal de Campo (Operacional)</option>
                        <option value="analista">Analista Técnico (Somente Leitura/Relatórios)</option>
                      </select>
                    </label>

                    <div className={styles.modalActions}>
                      <button type="submit" className={styles.btnPrimaryModal}>
                        <UserPlus size={16} /> Confirmar Cadastro
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* ABA 2: PREFERÊNCIAS */}
              {activeTabConfig === 'geral' && (
                <>
                  <div className={styles.cardHeader}>
                    <h3>Preferências Operacionais</h3>
                  </div>
                  <div className={styles.modalForm}>
                    <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Notificações por E-mail</span>
                      <input 
                        type="checkbox" 
                        checked={preferences.notifEmail}
                        onChange={(e) => setPreferences({...preferences, notifEmail: e.target.checked})}
                        style={{ width: 'auto' }}
                      />
                    </label>

                    <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Alertas Push no Navegador</span>
                      <input 
                        type="checkbox" 
                        checked={preferences.notifPush}
                        onChange={(e) => setPreferences({...preferences, notifPush: e.target.checked})}
                        style={{ width: 'auto' }}
                      />
                    </label>

                    <label>
                      Raio Padrão de Cobertura do Mapa
                      <select 
                        value={preferences.raioAtuacao}
                        onChange={(e) => setPreferences({...preferences, raioAtuacao: e.target.value})}
                      >
                        <option value="5km">5 km do centro urbano</option>
                        <option value="10km">10 km (Todo o município)</option>
                        <option value="25km">25 km (Região metropolitana)</option>
                      </select>
                    </label>

                    <div className={styles.modalActions}>
                      <button 
                        type="button" 
                        className={styles.btnPrimaryModal}
                        onClick={() => {
                          setSuccessMessage('Preferências salvas!');
                          setTimeout(() => setSuccessMessage(''), 3000);
                        }}
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ABA 3: SEGURANÇA */}
              {activeTabConfig === 'seguranca' && (
                <>
                  <div className={styles.cardHeader}>
                    <h3>Segurança e Logs de Sistema</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                    <div className={styles.badgeFunctionalCard}>
                      <div className={styles.badgeFunctionalItem}>
                        <span>Autenticação em Duas Etapas (2FA):</span>
                        <span className={`${styles.badgeStatus} ${styles.status_resolvida}`}>Ativo</span>
                      </div>
                      <div className={styles.badgeFunctionalItem}>
                        <span>Último Acesso ao Sistema:</span>
                        <strong>Hoje, às 08:30 via IP 192.168.1.45</strong>
                      </div>
                    </div>
                    <button className={styles.btnSecondary} style={{ width: 'fit-content' }}>
                      Exportar Logs de Auditoria (.CSV)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>
    </div>
  );
}