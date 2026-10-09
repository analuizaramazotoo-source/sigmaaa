import { api, perform, useCollection, occurrenceView, categoryId, canonicalStatus, refreshScreens, getSession, logout } from '../../../services/originalScreens';
import { useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './homeg.module.css';
import TupaMap from '../../../components/TupaMap';
import { coordinateBody } from '../../../services/mapCoordinates';
import { 
  Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, ChevronDown, Plus, ClipboardCheck, 
  Clock, Settings, CheckCircle2, Filter, Trash2, Flame, 
  Droplet,  Leaf, Shield, ArrowUpRight, LogOut, User, Edit3, Home as HomeIcon
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
    title: "Ocorrências em Campo",
    value: "89", 
    subtitle: "Ações fiscais em curso", 
    icon: Settings,
    variant: 'info'
  },
  { 
    id: 'resolvidas',
    title: "Concluídas",
    value: "17", 
    subtitle: "Demandas finalizadas", 
    icon: CheckCircle2,
    variant: 'success'
  },
];

export default function Homeg() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  
  // Modais
  const [modalNewRecord, setModalNewRecord] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [modalViewAll, setModalViewAll] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState(null);

  // Lista Dinâmica
  const [fila] = useCollection('/ocorrencias', o => ({ ...occurrenceView(o), icon: /queimada/i.test(o.nome_categoria || '') ? Flame : /hídric/i.test(o.nome_categoria || '') ? Droplet : Trash2 }));
  const [activeFilter, setActiveFilter] = useState('todos');
  const [localizacao, setLocalizacao] = useState(null);

  // Formulário
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    category: 'descarte'
  });

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    await perform(async () => {
      await api('/ocorrencias', { method: 'POST', body: { titulo_ocorrencia: formData.title, logradouro_ocorrencia: formData.address, id_categoria: await categoryId(formData.category), ...coordinateBody(localizacao) }});
      refreshScreens(); setFormData({ title: '', address: '', category: 'descarte' }); setLocalizacao(null); setModalNewRecord(false);
    });
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedOcorrencia) return;
    await perform(async () => { await api(`/ocorrencias/${selectedOcorrencia.id}`, { method: 'PATCH', body: { status_ocorrencia: canonicalStatus(newStatus) }}); refreshScreens(); setSelectedOcorrencia(null); });
  };

  const handleConfirmLogout = async () => {
    try { await logout(); } finally { setModalLogout(false); navigate('/login'); }
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
                className={styles.userDropdown}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className={styles.avatar}>{getSession()?.usuario.nome_usuario?.slice(0, 2).toUpperCase()}</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{getSession()?.usuario.nome_usuario}</span>
                  <span className={styles.userRole}>{getSession()?.usuario.cargo_usuario || 'Gestão'} • Mat. {getSession()?.usuario.matricula_usuario || 'Não informada'}</span>
                </div>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </button>

              {showUserDropdown && (
                <div className={styles.popoverMenuRight}>
                  <div className={styles.userMenuHeader}>
                    <strong>{getSession()?.usuario.nome_usuario}</strong>
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
                    className={styles.iconButton} 
                    onClick={() => setModalLogout(true)} 
                    title="Sair do Sistema"
                    aria-label="Sair do Sistema"
                  >
                    <LogOut size={18} color="#dc2626" />
                  </button>
                </div>
              )}
            </div>

            {/* BOTÃO QUADRADO DE SAIR COM COMPOSTO DE HOVER */}
            <button 
              onClick={() => setModalLogout(true)} 
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              title="Sair do Sistema"
              aria-label="Sair do Sistema"
              style={{
                backgroundColor: isLogoutHovered ? '#dc2626' : '#ffffff',
                border: isLogoutHovered ? '1px solid #dc2626' : '1px solid #d1fae5',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '10px',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={18} color={isLogoutHovered ? '#ffffff' : '#dc2626'} />
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
                    <strong className={styles.statValue}>{stat.id === 'total' ? fila.length : stat.id === 'resolvidas' ? fila.filter(o => o.statusType === 'resolvida').length : fila.filter(o => o.statusType === stat.id).length}</strong>
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
                <TupaMap occurrences={filteredFila} onOccurrenceClick={setSelectedOcorrencia} height={360} />

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

      {/* MODAIS INTERATIVOS */}
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

              <TupaMap selectedLocation={localizacao} onPick={setLocalizacao} height={240} />
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setModalNewRecord(false)} className={styles.btnCancel}>Cancelar</button>
                <button type="submit" className={styles.btnPrimaryModal}>Salvar ocorrência</button>
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
