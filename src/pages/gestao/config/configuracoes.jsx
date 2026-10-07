import { api, getSession, perform, logout, useCollection, refreshScreens } from '../../../services/originalScreens';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './configuracoes.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Bell, ChevronDown, Menu, X, Shield, 
  LogOut, User, UserPlus, Sliders, Lock, CheckCircle2, ArrowLeft
} from 'lucide-react';

export default function Configuracoes() {
  const navigate = useNavigate();
  const [equipes] = useCollection('/equipes');
  const [membros] = useCollection('/membros-equipe');
  const [usuarios] = useCollection('/usuarios');
  const [equipeForm, setEquipeForm] = useState({ nome_equipe: '', especialidade_equipe: '', status_equipe: 'disponivel' });
  const [membroForm, setMembroForm] = useState({ id_equipe: '', id_usuario: '', funcao_na_equipe: '' });
  async function salvarEquipe(e) {
    e.preventDefault(); await perform(async () => { await api(`/equipes${equipeForm.id_equipe ? '/' + equipeForm.id_equipe : ''}`, { method: equipeForm.id_equipe ? 'PATCH' : 'POST', body: equipeForm }); refreshScreens(); setEquipeForm({ nome_equipe: '', especialidade_equipe: '', status_equipe: 'disponivel' }); setSuccessMessage('Equipe salva.'); });
  }
  async function salvarMembro(e) {
    e.preventDefault(); await perform(async () => { await api(`/membros-equipe${membroForm.id_membro ? '/' + membroForm.id_membro : ''}`, { method: membroForm.id_membro ? 'PATCH' : 'POST', body: membroForm }); refreshScreens(); setMembroForm({ id_equipe: '', id_usuario: '', funcao_na_equipe: '' }); setSuccessMessage('Membro salvo.'); });
  }
  async function excluirRegistro(path) { if (window.confirm('Excluir este registro?')) await perform(async () => { await api(path, { method: 'DELETE' }); refreshScreens(); }); }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  
  // Aba ativa nas configurações (Geral, Notificações, Cadastrar Gestor)
  const [activeTabConfig, setActiveTabConfig] = useState('gestores');

  // Mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState('');

  // Estado do formulário de novo gestor
  const [novoGestor, setNovoGestor] = useState({
    senha: '',
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

  useEffect(() => { perform(async () => { const prefs = await api('/configuracoes'); setPreferences(p => ({ ...p, ...prefs })); }); }, []);

  const handleCadastrarGestor = async (e) => {
    e.preventDefault(); await perform(async () => {
      await api('/usuarios', { method: 'POST', body: { nome_usuario: novoGestor.nome, email_usuario: novoGestor.email, cpf_usuario: novoGestor.cpf, matricula_usuario: novoGestor.matricula, cargo_gestor: novoGestor.cargo, senha_usuario: novoGestor.senha, tipo_usuario: novoGestor.permissao === 'gestor' ? 'gestao' : 'equipe' }});
      setSuccessMessage(`Servidor(a) ${novoGestor.nome} cadastrado(a) com sucesso!`); setNovoGestor({ senha: '', nome: '', email: '', cpf: '', matricula: '', cargo: 'Fiscal Ambiental', permissao: 'gestor' }); setTimeout(() => setSuccessMessage(''), 4000);
    });
  };

  const handleConfirmLogout = async () => {
    try { await logout(); } finally { setModalLogout(false); navigate('/login'); }
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
              <h1 className={styles.headerTitle}>Configurações do Sistema</h1>
              <span className={styles.headerSubtitle}>Preferências da plataforma e gestão de acessos</span>
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
                    <li>Sem notificações disponíveis.</li>
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
                <div className={styles.avatar}>{getSession()?.usuario.nome_usuario?.slice(0, 2).toUpperCase()}</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{getSession()?.usuario.nome_usuario}</span>
                  <span className={styles.userRole}>Mat. {getSession()?.usuario.matricula_usuario || 'Não informada'}</span>
                </div>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </button>

              {showUserDropdown && (
                <div className={styles.popoverMenuRight}>
                  <div className={styles.userMenuHeader}>
                    <strong>{getSession()?.usuario.nome_usuario}</strong>
                    <span>{getSession()?.usuario.cargo_usuario || 'Gestão'}</span>
                  </div>
                  <div className={styles.menuDivider} />
                  
                  {/* MEU PERFIL -> NAVEGA PARA /PERFILG */}
                  <button 
                    type="button" 
                    onClick={() => { setShowUserDropdown(false); navigate('/perfilg'); }} 
                    className={styles.menuItemBtn}
                  >
                    <User size={16} /> Meu Perfil
                  </button>

                  <div className={styles.menuDivider} />

                  {/* SAIR DA CONTA -> ABRE MODAL */}
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
                <button type="button" className={activeTabConfig === 'equipes' ? styles.filterChipActive : styles.filterChip} onClick={() => setActiveTabConfig('equipes')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}><UserPlus size={16} /> Equipes e Membros</button>
                <button 
                  type="button"
                  className={activeTabConfig === 'gestores' ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setActiveTabConfig('gestores')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                >
                  <UserPlus size={16} /> Cadastrar Novo Gestor
                </button>
                <button 
                  type="button"
                  className={activeTabConfig === 'geral' ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setActiveTabConfig('geral')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}
                >
                  <Sliders size={16} /> Preferências do Sistema
                </button>
                <button 
                  type="button"
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
              {activeTabConfig === 'equipes' && <>
                <div className={styles.cardHeader}><h3>Equipes e Membros</h3></div>
                <form className={styles.modalForm} onSubmit={salvarEquipe}>
                  <label>Nome da equipe *<input required value={equipeForm.nome_equipe} onChange={e => setEquipeForm({ ...equipeForm, nome_equipe: e.target.value })} /></label>
                  <label>Especialidade<input value={equipeForm.especialidade_equipe || ''} onChange={e => setEquipeForm({ ...equipeForm, especialidade_equipe: e.target.value })} /></label>
                  <label>Status<select value={equipeForm.status_equipe} onChange={e => setEquipeForm({ ...equipeForm, status_equipe: e.target.value })}><option value="disponivel">Disponível</option><option value="em_campo">Em campo</option><option value="ocupada">Ocupada</option><option value="inativa">Inativa</option></select></label>
                  <button className={styles.btnPrimaryModal}>Salvar equipe</button>
                </form>
                {equipes.map(e => <p key={e.id_equipe}>{e.nome_equipe} <button className={styles.btnSecondary} onClick={() => setEquipeForm(e)}>Editar</button> <button className={styles.btnSecondary} onClick={() => excluirRegistro(`/equipes/${e.id_equipe}`)}>Excluir</button></p>)}
                <div className={styles.cardHeader}><h3>Integrantes</h3></div>
                <form className={styles.modalForm} onSubmit={salvarMembro}>
                  <label>Equipe *<select required value={membroForm.id_equipe} onChange={e => setMembroForm({ ...membroForm, id_equipe: e.target.value })}><option value="">Selecione</option>{equipes.map(e => <option key={e.id_equipe} value={e.id_equipe}>{e.nome_equipe}</option>)}</select></label>
                  <label>Servidor *<select required value={membroForm.id_usuario} onChange={e => setMembroForm({ ...membroForm, id_usuario: e.target.value })}><option value="">Selecione</option>{usuarios.filter(u => u.tipo_usuario !== 'cidadao').map(u => <option key={u.id_usuario} value={u.id_usuario}>{u.nome_usuario}</option>)}</select></label>
                  <label>Função<input value={membroForm.funcao_na_equipe || ''} onChange={e => setMembroForm({ ...membroForm, funcao_na_equipe: e.target.value })} /></label>
                  <button className={styles.btnPrimaryModal}>Salvar membro</button>
                </form>
                {membros.map(m => <p key={m.id_membro}>{usuarios.find(u => u.id_usuario === m.id_usuario)?.nome_usuario || m.id_usuario} — {equipes.find(e => e.id_equipe === m.id_equipe)?.nome_equipe || m.id_equipe} <button className={styles.btnSecondary} onClick={() => setMembroForm(m)}>Editar</button> <button className={styles.btnSecondary} onClick={() => excluirRegistro(`/membros-equipe/${m.id_membro}`)}>Excluir</button></p>)}
              </>}
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
                    <label>Senha inicial *<input type="password" minLength={8} required value={novoGestor.senha} onChange={e => setNovoGestor({ ...novoGestor, senha: e.target.value })} /></label>
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
                        disabled checked={false}
                        onChange={(e) => setPreferences({...preferences, notifEmail: e.target.checked})}
                        style={{ width: 'auto' }}
                      />
                    </label>

                    <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Alertas Push no Navegador</span>
                      <input 
                        type="checkbox" 
                        disabled checked={false}
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
                        onClick={() => perform(async () => { await api('/configuracoes', { method: 'PUT', body: preferences }); setSuccessMessage('Preferências salvas.'); setTimeout(() => setSuccessMessage(''), 4000); })}
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
                        <span className={`${styles.badgeStatus} ${styles.status_resolvida}`}>Não implementado</span>
                      </div>
                      <div className={styles.badgeFunctionalItem}>
                        <span>Último Acesso ao Sistema:</span>
                        <strong>Não registrado</strong>
                      </div>
                    </div>
                    <button type="button" className={styles.btnSecondary} disabled style={{ width: 'fit-content' }}>
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
