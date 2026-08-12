import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './homeg.module.css';
import { 
  Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Bell, ChevronDown, Plus, ClipboardCheck, 
  Clock, Settings, CheckCircle2, Filter, Trash2, Flame, 
  Droplet, Volume2, Leaf, Shield, ArrowUpRight, LogOut, User, Edit3, Home as HomeIcon
} from 'lucide-react';

const STATS_DATA = [
  { 
    id: 'total',
    title: "Total do Município", 
    value: "124", 
    subtitle: "Ocorrências no sistema", 
    icon: ClipboardCheck,
    variant: 'neutral'
  },
  { 
    id: 'analise',
    title: "Aguardando Triagem", 
    value: "18", 
    subtitle: "Requer análise do fiscal", 
    icon: Clock,
    variant: 'warning'
  },
  { 
    id: 'andamento',
    title: "Equipes em Campo", 
    value: "89", 
    subtitle: "Ações fiscais em curso", 
    icon: Settings,
    variant: 'info'
  },
  { 
    id: 'resolvidas',
    title: "Concluídas no Mês", 
    value: "17", 
    subtitle: "Demandas finalizadas", 
    icon: CheckCircle2,
    variant: 'success'
  },
];

const INITIAL_FILA = [
  { 
    id: 1, 
    title: "Manutenção de Parques", 
    address: "Rua das Flores, 123 - Centro", 
    date: "12/08/2026", 
    status: "Em campo", 
    statusType: "andamento",
    corStatus: "amarelo",
    posicaoTop: "45%",
    posicaoLeft: "48%",
    icon: Trash2 
  },
  { 
    id: 2, 
    title: "Corte Irregular de Árvore", 
    address: "Av. Brasil, 456 - Jardim Novo", 
    date: "08/08/2026", 
    status: "Pendente triagem", 
    statusType: "analise",
    corStatus: "vermelho",
    posicaoTop: "58%",
    posicaoLeft: "28%",
    icon: Flame 
  },
  { 
    id: 3, 
    title: "Poda Concluída", 
    address: "Rio das Pedras, s/n - Centro", 
    date: "02/08/2026", 
    status: "Fiscalizado", 
    statusType: "resolvida",
    corStatus: "verde",
    posicaoTop: "32%",
    posicaoLeft: "62%",
    icon: Droplet 
  }
];

export default function Homeg() {
  const navigate = useNavigate();
  const location = useLocation();

  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Modais
  const [modalNewRecord, setModalNewRecord] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [modalViewAll, setModalViewAll] = useState(false);
  const [modalLogout, setModalLogout] = useState(false); // Modal para confirmação de logout
  const [selectedOcorrencia, setSelectedOcorrencia] = useState(null);

  // Lista Dinâmica
  const [fila, setFila] = useState([]);
  const [activeFilter, setActiveFilter] = useState('todos');

  // Formulário
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    category: 'descarte'
  });

  const carregarFila = () => {
    const dadosSalvos = localStorage.getItem('ocorrencias_mapa');
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      const dadosComIcones = dados.map(item => ({
        ...item,
        icon: item.iconName === 'flame' ? Flame : item.iconName === 'droplet' ? Droplet : item.iconName === 'volume' ? Volume2 : Trash2
      }));
      setFila(dadosComIcones);
    } else {
      localStorage.setItem('ocorrencias_mapa', JSON.stringify(INITIAL_FILA));
      setFila(INITIAL_FILA);
    }
  };

  useEffect(() => {
    carregarFila();

    const handleStorageChange = () => {
      carregarFila();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const salvarEAtualizar = (novaFila) => {
    setFila(novaFila);
    localStorage.setItem('ocorrencias_mapa', JSON.stringify(novaFila));
    window.dispatchEvent(new Event('storage'));
  };

  const handleCreateRecord = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.address) return;

    let iconName = 'trash';
    if (formData.category === 'queimada') iconName = 'flame';
    if (formData.category === 'agua') iconName = 'droplet';
    if (formData.category === 'som') iconName = 'volume';

    const topRand = Math.floor(Math.random() * 50 + 25) + '%';
    const leftRand = Math.floor(Math.random() * 50 + 25) + '%';

    const newEntry = {
      id: Date.now(),
      title: formData.title,
      titulo: formData.title,
      address: formData.address,
      descricao: formData.address,
      date: new Date().toLocaleDateString('pt-BR'),
      data: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: "Pendente triagem",
      statusType: "analise",
      corStatus: "vermelho",
      prioridade: "Média",
      posicaoTop: topRand,
      posicaoLeft: leftRand,
      iconName: iconName
    };

    const novaFila = [newEntry, ...fila];
    salvarEAtualizar(novaFila);

    setFormData({ title: '', address: '', category: 'descarte' });
    setModalNewRecord(false);
  };

  const handleUpdateStatus = (newStatus, newStatusType, newCor) => {
    if (!selectedOcorrencia) return;

    const novaFila = fila.map(item => {
      if (item.id === selectedOcorrencia.id) {
        return {
          ...item,
          status: newStatus,
          statusType: newStatusType,
          corStatus: newCor || (newStatusType === 'resolvida' ? 'verde' : newStatusType === 'andamento' ? 'amarelo' : 'vermelho')
        };
      }
      return item;
    });

    salvarEAtualizar(novaFila);
    setSelectedOcorrencia(null);
  };

  const handleConfirmLogout = () => {
    setModalLogout(false);
    navigate('/login');
  };

  const filteredFila = fila.filter(item => {
    if (activeFilter === 'todos') return true;
    return item.statusType === activeFilter;
  });

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      
      {/* SIDEBAR */}
      <aside 
        style={{ 
          width: '260px', 
          minWidth: '260px', 
          backgroundColor: '#ffffff', 
          borderRight: '1px solid #e2e8f0',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div>
          <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ backgroundColor: '#059669', color: '#fff', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13px', color: '#047857', display: 'block', lineHeight: '1.2' }}>SISTEMA DE GESTÃO</strong>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: 'bold' }}>MUNICIPAL AMBIENTAL</span>
            </div>
          </div>

          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#059669', letterSpacing: '0.5px', marginBottom: '8px', paddingLeft: '8px' }}>
              MENU DO GESTOR
            </span>

            <Link
              to="/homeg"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/homeg') ? '#059669' : 'transparent',
                color: isActive('/homeg') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <HomeIcon size={18} /> Home
            </Link>

            <Link
              to="/geoprocessamento"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/geoprocessamento') ? '#059669' : 'transparent',
                color: isActive('/geoprocessamento') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <MapIcon size={18} /> Geoprocessamento
            </Link>

            <Link
              to="/fila-fiscalizacao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/fila-fiscalizacao') ? '#059669' : 'transparent',
                color: isActive('/fila-fiscalizacao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <ClipboardList size={18} /> Fila de Fiscalização
            </Link>

            <Link
              to="/autos-notificacoes-gestao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/autos-notificacoes-gestao') ? '#059669' : 'transparent',
                color: isActive('/autos-notificacoes-gestao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={18} /> Autos e Notificações
            </Link>

            <Link
              to="/relatorios-tecnicos-gestao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/relatorios-tecnicos-gestao') ? '#059669' : 'transparent',
                color: isActive('/relatorios-tecnicos-gestao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <BarChart2 size={18} /> Relatórios Técnicos
            </Link>

            <Link
              to="/legislacao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/legislacao') ? '#059669' : 'transparent',
                color: isActive('/legislacao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <HelpCircle size={18} /> Legislação
            </Link>
          </nav>
        </div>

        <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>Prefeitura Municipal</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Secretaria do Meio Ambiente</div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Módulo Operacional de Gestão</h1>
              <span className={styles.headerSubtitle}>Secretaria Municipal do Meio Ambiente</span>
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
                    <strong>Notificações Internas</strong>
                    <button 
                      onClick={() => setUnreadNotifications(0)}
                      className={styles.textBtn}
                    >
                      Limpar
                    </button>
                  </div>
                  <ul className={styles.notificationList}>
                    <li>📌 Novo chamado de Queimada registrado no Setor Norte.</li>
                    <li>⚠️ Auto de Infração nº 402 finalizado.</li>
                    <li>📋 Relatório mensal disponível para exportação.</li>
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
                  <span className={styles.userRole}>Fiscal Ambiental • Mat. 48.201</span>
                </div>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </button>

              {showUserDropdown && (
                <div className={styles.popoverMenuRight}>
                  <div className={styles.userMenuHeader}>
                    <strong>Ana Luiza Silva</strong>
                    <span>Fiscal de Campo</span>
                  </div>
                  <div className={styles.menuDivider} />
                  
                  <Link to="/perfilg" className={styles.menuItemBtn}>
                    <User size={16} /> Meu Perfil
                  </Link>

                  <Link to="/config" className={styles.menuItemBtn}>
                    <Settings size={16} /> Configurações
                  </Link>

                  <div className={styles.menuDivider} />

                  <button 
                    onClick={() => setModalLogout(true)} 
                    className={`${styles.menuItemBtn} ${styles.dangerText}`}
                  >
                    <LogOut size={16} /> Sair da Conta
                  </button>
                </div>
              )}
            </div>

            {/* BOTÃO DE DESLOGAR (IGUAL AO DA HOMEE) */}
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
                marginLeft: '10px',
                transition: 'all 0.2s'
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
              <h2>Painel de Controle - Fiscalização</h2>
              <p>Há {fila.filter(i => i.statusType === 'analise').length} ocorrências aguardando triagem técnica no momento.</p>
            </div>
            <button 
              className={styles.btnPrimary}
              onClick={() => setModalNewRecord(true)}
            >
              <Plus size={18} /> Novo Registro Interno
            </button>
          </section>

          <section className={styles.statsGrid}>
            {STATS_DATA.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.id} className={styles.statCard}>
                  <div className={`${styles.statIcon} ${styles[`statIcon_${stat.variant}`]}`}>
                    <IconComponent size={22} />
                  </div>
                  <div className={styles.statData}>
                    <span className={styles.statTitle}>{stat.title}</span>
                    <strong className={styles.statValue}>{stat.value}</strong>
                    <span className={styles.statSubtitle}>{stat.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </section>

          <section className={styles.contentGrid}>
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Geoprocessamento e Chamados</h3>
                <button 
                  className={styles.btnSecondary}
                  onClick={() => setModalFilter(true)}
                >
                  <Filter size={16} /> Filtrar por Status
                </button>
              </div>

              <div className={styles.mapWrapper}>
                <div className={styles.mapPlaceholder}>
                  <MapIcon size={56} className={styles.mapPlaceholderIcon} />
                  <p>Mapa Tático de Ocorrências e Rotas de Fiscalização</p>
                  <small style={{ marginTop: '8px', opacity: 0.8 }}>
                    Exibindo {filteredFila.length} ponto(s) filtrado(s)
                  </small>
                </div>

                <div className={styles.mapLegend}>
                  <span className={styles.legendTitle}>Status das Ações:</span>
                  <div className={styles.legendItems}>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotWarning}`} /> Pendente triagem</span>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotInfo}`} /> Equipe em campo</span>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotSuccess}`} /> Vistoriado/Concluído</span>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotDanger}`} /> Arquivado/Improcedente</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Fila de Triagem e Despacho</h3>
                <button 
                  className={styles.linkActionBtn}
                  onClick={() => setModalViewAll(true)}
                >
                  Ver fila completa <ArrowUpRight size={14} />
                </button>
              </div>

              <div className={styles.requestsList}>
                {filteredFila.slice(0, 4).map((item) => {
                  const ItemIcon = item.icon || Trash2;
                  return (
                    <div 
                      key={item.id} 
                      className={styles.requestCardSelectable}
                      onClick={() => setSelectedOcorrencia(item)}
                      title="Clique para alterar o status"
                    >
                      <div className={styles.requestIcon}>
                        <ItemIcon size={18} />
                      </div>
                      <div className={styles.requestBody}>
                        <strong className={styles.requestTitle}>{item.title || item.titulo}</strong>
                        <p className={styles.requestAddress}>{item.address || item.descricao}</p>
                      </div>
                      <div className={styles.requestMeta}>
                        <span className={styles.requestDate}>{item.date || item.data}</span>
                        <span className={`${styles.badgeStatus} ${styles[`status_${item.statusType}`]}`}>
                          {item.status} <Edit3 size={10} style={{ marginLeft: '4px' }} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className={styles.infoBanner}>
            <div className={styles.infoContent}>
              <div className={styles.infoIcon}>
                <Leaf size={24} />
              </div>
              <div>
                <strong>Atenção: Atualização no Protocolo de Vistoria de Queimadas</strong>
                <p>Consulte as novas diretrizes normativas no módulo de Legislação antes do despacho de equipes.</p>
              </div>
            </div>
            <Link to="/legislacao" className={styles.btnOutline}>
              Acessar Diretrizes
            </Link>
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

      {/* MODAIS INTERATIVOS EXISTENTES */}
      {selectedOcorrencia && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Atualizar Status da Demanda</h3>
              <button onClick={() => setSelectedOcorrencia(null)} className={styles.closeBtnModal}>X</button>
            </div>
            <div className={styles.statusChangeBody}>
              <strong>{selectedOcorrencia.title || selectedOcorrencia.titulo}</strong>
              <p>{selectedOcorrencia.address || selectedOcorrencia.descricao}</p>
              
              <div className={styles.statusOptionsList}>
                <button 
                  className={`${styles.statusOptionBtn} ${styles.status_analise}`}
                  onClick={() => handleUpdateStatus("Pendente triagem", "analise", "vermelho")}
                >
                  <Clock size={16} /> Marcar como "Pendente triagem"
                </button>
                <button 
                  className={`${styles.statusOptionBtn} ${styles.status_andamento}`}
                  onClick={() => handleUpdateStatus("Em campo", "andamento", "amarelo")}
                >
                  <Settings size={16} /> Marcar como "Em campo"
                </button>
                <button 
                  className={`${styles.statusOptionBtn} ${styles.status_resolvida}`}
                  onClick={() => handleUpdateStatus("Fiscalizado", "resolvida", "verde")}
                >
                  <CheckCircle2 size={16} /> Marcar como "Fiscalizado"
                </button>
                <button 
                  className={`${styles.statusOptionBtn} ${styles.status_naoAtendida}`}
                  onClick={() => handleUpdateStatus("Arquivado", "naoAtendida", "vermelho")}
                >
                  Marcar como "Arquivado / Improcedente"
                </button>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setSelectedOcorrencia(null)} className={styles.btnCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {modalNewRecord && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Novo Registro de Ocorrência Interna</h3>
              <button onClick={() => setModalNewRecord(false)} className={styles.closeBtnModal}>X</button>
            </div>
            <form onSubmit={handleCreateRecord} className={styles.modalForm}>
              <label>
                Título da Demanda
                <input 
                  type="text" 
                  placeholder="Ex: Queimada em lote vago"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </label>

              <label>
                Endereço / Localização
                <input 
                  type="text" 
                  placeholder="Ex: Av. Principal, nº 100 - Bairro Verde"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </label>

              <label>
                Categoria
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="descarte">Descarte Irregular</option>
                  <option value="queimada">Queimada Urbana</option>
                  <option value="agua">Recursos Hídricos</option>
                  <option value="som">Poluição Sonora</option>
                </select>
              </label>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setModalNewRecord(false)} className={styles.btnCancel}>Cancelar</button>
                <button type="submit" className={styles.btnPrimaryModal}>Salvar e Enviar para Equipe</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalFilter && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Filtrar Ocorrências no Mapa</h3>
              <button onClick={() => setModalFilter(false)} className={styles.closeBtnModal}>X</button>
            </div>
            <div className={styles.filterOptions}>
              <button 
                className={activeFilter === 'todos' ? styles.filterChipActive : styles.filterChip}
                onClick={() => setActiveFilter('todos')}
              >
                Todas as Ocorrências
              </button>
              <button 
                className={activeFilter === 'analise' ? styles.filterChipActive : styles.filterChip}
                onClick={() => setActiveFilter('analise')}
              >
                Pendente Triagem
              </button>
              <button 
                className={activeFilter === 'andamento' ? styles.filterChipActive : styles.filterChip}
                onClick={() => setActiveFilter('andamento')}
              >
                Equipe em Campo
              </button>
              <button 
                className={activeFilter === 'resolvida' ? styles.filterChipActive : styles.filterChip}
                onClick={() => setActiveFilter('resolvida')}
              >
                Fiscalizado / Concluído
              </button>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setModalFilter(false)} className={styles.btnPrimaryModal}>Aplicar Filtro</button>
            </div>
          </div>
        </div>
      )}

      {modalViewAll && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.modalLarge}`}>
            <div className={styles.modalHeader}>
              <h3>Fila Completa de Atendimento ({fila.length})</h3>
              <button onClick={() => setModalViewAll(false)} className={styles.closeBtnModal}>X</button>
            </div>
            <div className={styles.modalListScroll}>
              {fila.map((item) => {
                const ItemIcon = item.icon || Trash2;
                return (
                  <div 
                    key={item.id} 
                    className={styles.requestCardSelectable}
                    onClick={() => {
                      setSelectedOcorrencia(item);
                      setModalViewAll(false);
                    }}
                  >
                    <div className={styles.requestIcon}>
                      <ItemIcon size={18} />
                    </div>
                    <div className={styles.requestBody}>
                      <strong className={styles.requestTitle}>{item.title || item.titulo}</strong>
                      <p className={styles.requestAddress}>{item.address || item.descricao}</p>
                    </div>
                    <div className={styles.requestMeta}>
                      <span className={styles.requestDate}>{item.date || item.data}</span>
                      <span className={`${styles.badgeStatus} ${styles[`status_${item.statusType}`]}`}>
                        {item.status} <Edit3 size={10} style={{ marginLeft: '4px' }} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setModalViewAll(false)} className={styles.btnCancel}>Fechar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}