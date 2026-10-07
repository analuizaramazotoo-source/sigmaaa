import { api, perform, useCollection, occurrenceView, refreshScreens } from '../../../services/originalScreens';
import { useState} from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './filaFiscalizacao.module.css';
import { 
  ArrowLeft, ClipboardList, Flame, Trash2, Clock, 
  Shield, Map as MapIcon, FileText, BarChart2, HelpCircle, Home as HomeIcon,
  CheckCircle2, AlertTriangle,  Eye, X, UserCheck
} from 'lucide-react';

export default function FilaFiscalizacao() {
  const navigate = useNavigate();
  const location = useLocation();

  const [chamados] = useCollection('/ocorrencias?status=aberta', occurrenceView);
  const [equipes] = useCollection('/equipes');
  const [equipeDestino, setEquipeDestino] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [chamadoParaAssumir, setChamadoParaAssumir] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  const handleConfirmAssumir = async () => {
    if (!chamadoParaAssumir) return;
    await perform(async () => {
      if (!equipeDestino) throw new Error('Selecione uma equipe para assumir o chamado.');
      await api(`/ocorrencias/${chamadoParaAssumir.id}/assumir`, { method: 'POST', body: { id_equipe: Number(equipeDestino) }});
      refreshScreens(); setNotificationMsg(`Chamado #${chamadoParaAssumir.id} encaminhado à equipe.`); setChamadoParaAssumir(null); setSelectedChamado(null); setTimeout(() => setNotificationMsg(''), 4000);
    });
  };

  const isActive = (path) => location.pathname === path;

  const chamadosFiltrados = chamados.filter(item => {
    if (filterType === 'urgente') return item.urgente;
    if (filterType === 'rotina') return !item.urgente;
    return true;
  });

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'queimada': return <Flame size={20} color="#d97706" />;
      case 'descarte': return <Trash2 size={20} color="#dc2626" />;
      default: return <Clock size={20} color="#0284c7" />;
    }
  };

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR FIXA */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brandHeader}>
            <div className={styles.logoIcon}>
              <Shield size={22} />
            </div>
            <div className={styles.brandText}>
              <strong>SISTEMA DE GESTÃO</strong>
              <span>MUNICIPAL AMBIENTAL</span>
            </div>
          </div>

          <nav className={styles.navigation}>
            <span className={styles.navCategory}>MENU DO GESTOR</span>

            <Link to="/homeg" className={isActive('/homeg') ? styles.navItemActive : styles.navItem}>
              <HomeIcon size={18} /> Home
            </Link>

            <Link to="/geoprocessamento" className={isActive('/geoprocessamento') ? styles.navItemActive : styles.navItem}>
              <MapIcon size={18} /> Geoprocessamento
            </Link>

            <Link to="/fila-fiscalizacao" className={isActive('/fila-fiscalizacao') ? styles.navItemActive : styles.navItem}>
              <ClipboardList size={18} /> Fila de Fiscalização
            </Link>

            <Link to="/autos-notificacoes-gestao" className={isActive('/autos-notificacoes-gestao') ? styles.navItemActive : styles.navItem}>
              <FileText size={18} /> Autos e Notificações
            </Link>

            <Link to="/relatorios-tecnicos-gestao" className={isActive('/relatorios-tecnicos-gestao') ? styles.navItemActive : styles.navItem}>
              <BarChart2 size={18} /> Relatórios Técnicos
            </Link>

            <Link to="/legislacao" className={isActive('/legislacao') ? styles.navItemActive : styles.navItem}>
              <HelpCircle size={18} /> Legislação
            </Link>
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerTitle}>Prefeitura Municipal</div>
          <div className={styles.footerSubtitle}>Secretaria do Meio Ambiente</div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA TELA */}
      <div className={styles.mainWrapper}>
        
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Fila de Fiscalização</h1>
              <span className={styles.headerSubtitle}>Chamados pendentes para vistoria em campo ({chamados.length})</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button 
              type="button"
              onClick={() => navigate('/homeg')} 
              className={styles.btnVoltarAmarelo}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          {notificationMsg && (
            <div className={`${styles.infoBanner} ${styles.status_success}`}>
              <div className={styles.infoContent}>
                <CheckCircle2 size={24} />
                <div>
                  <strong>Ação Concluída!</strong>
                  <p>{notificationMsg}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.loginCard}>
            <div className={styles.loginCardHeader}>
              <div className={styles.headerIconBadge}>
                <ClipboardList size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h2>Demandas Prioritárias em Aberto</h2>
                <p>Selecione uma ocorrência para atribuir à sua equipe técnica ou consultar detalhes.</p>
              </div>

              {/* FILTROS DE PRIORIDADE */}
              <div className={styles.filterGroup}>
                <button 
                  type="button" 
                  className={filterType === 'todos' ? styles.filterBtnActive : styles.filterBtn}
                  onClick={() => setFilterType('todos')}
                >
                  Todos ({chamados.length})
                </button>
                <button 
                  type="button" 
                  className={filterType === 'urgente' ? styles.filterBtnActive : styles.filterBtn}
                  onClick={() => setFilterType('urgente')}
                >
                  Urgentes ({chamados.filter(c => c.urgente).length})
                </button>
                <button 
                  type="button" 
                  className={filterType === 'rotina' ? styles.filterBtnActive : styles.filterBtn}
                  onClick={() => setFilterType('rotina')}
                >
                  Rotina ({chamados.filter(c => !c.urgente).length})
                </button>
              </div>
            </div>

            <div className={styles.listaChamados}>
              {chamadosFiltrados.length > 0 ? (
                chamadosFiltrados.map(item => (
                  <div key={item.id} className={styles.cardChamado}>
                    <div className={styles.infoChamado}>
                      <div className={styles.iconWrapper}>
                        {getIcon(item.tipo)}
                      </div>
                      <div>
                        <strong className={styles.tituloChamado}>
                          #{item.id} - {item.titulo}
                          {item.urgente && <span className={styles.badgeUrgente}>Urgente</span>}
                        </strong>
                        <span className={styles.localChamado}>{item.local} • <small>{item.data}</small></span>
                      </div>
                    </div>

                    <div className={styles.actionsCell}>
                      <button 
                        type="button" 
                        className={styles.btnSecondary}
                        onClick={() => setSelectedChamado(item)}
                      >
                        <Eye size={16} /> Ver Detalhes
                      </button>

                      <button 
                        type="button"
                        className={styles.btnSubmit}
                        onClick={() => setChamadoParaAssumir(item)}
                      >
                        <UserCheck size={16} /> Assumir Chamado
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <CheckCircle2 size={48} color="#059669" />
                  <h3>Nenhum chamado pendente no momento!</h3>
                  <p>Todas as ocorrências deste filtro já foram atribuídas a equipes em campo.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DETALHES DA OCORRÊNCIA */}
      {selectedChamado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Ficha do Chamado #{selectedChamado.id}</h3>
              <button type="button" onClick={() => setSelectedChamado(null)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <strong>Título:</strong>
                <span>{selectedChamado.titulo}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Localização:</strong>
                <span>{selectedChamado.local}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Prioridade:</strong>
                <span>{selectedChamado.urgente ? 'Alta (Urgente)' : 'Normal (Rotina)'}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Data de Registro:</strong>
                <span>{selectedChamado.data}</span>
              </div>
              <div className={styles.detailBox}>
                <strong>Descrição da Ocorrência:</strong>
                <p>{selectedChamado.descricao}</p>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setSelectedChamado(null)} className={styles.btnCancel}>
                Fechar
              </button>
              <button 
                type="button" 
                className={styles.btnSubmit}
                onClick={() => {
                  setChamadoParaAssumir(selectedChamado);
                }}
              >
                <UserCheck size={16} /> Assumir Esta Demanda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE ASSUMIR DEMANDA */}
      {chamadoParaAssumir && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div className={styles.alertIconCircle}>
              <AlertTriangle size={28} />
            </div>
            <h3 style={{ color: '#065f46', margin: '0 0 0.5rem 0' }}>Confirmar Atribuição</h3>
            <p style={{ color: '#047857', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
              Deseja encaminhar o chamado <strong>#{chamadoParaAssumir.id} - {chamadoParaAssumir.titulo}</strong> para uma equipe?
            </p>
            <label>Equipe responsável<select value={equipeDestino} onChange={e => setEquipeDestino(e.target.value)} style={{ width: '100%', padding: 10, margin: '10px 0 20px', border: '1px solid #d1fae5', borderRadius: 8 }}><option value="">Selecione</option>{equipes.map(e => <option key={e.id_equipe} value={e.id_equipe}>{e.nome_equipe}</option>)}</select></label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button type="button" onClick={() => setChamadoParaAssumir(null)} className={styles.btnCancel}>
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={handleConfirmAssumir} 
                className={styles.btnSubmit}
              >
                Sim, Assumir Chamado
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
