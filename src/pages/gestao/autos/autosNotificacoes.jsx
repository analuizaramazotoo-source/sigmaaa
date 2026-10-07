import { api, perform, useCollection, occurrenceView, refreshScreens } from '../../../services/originalScreens';
import { useState} from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './autosNotificacoes.module.css';
import { 
  ArrowLeft, FileText, Plus, Search, FileCheck, 
  Shield, Map as MapIcon, ClipboardList, BarChart2, HelpCircle, Home as HomeIcon,
  X, CheckCircle2} from 'lucide-react';

export default function AutosNotificacoes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ocorrencias] = useCollection('/ocorrencias', occurrenceView);
  const [autos] = useCollection('/autos', a => ({ ...a, id: `AUTO-${a.id_auto}`, infrator: a.autuado_nome, data: new Date(a.data_criacao).toLocaleDateString('pt-BR'), tipo: a.tipo_infracao || (a.tipo === 'infracao' ? 'Auto de Infração' : 'Notificação'), descricao: a.descricao_infracao, status: ({ notificado: 'Notificado', autuado: 'Autuado', em_analise: 'Em Análise', emitido: 'Autuado', entregue: 'Notificado', cancelado: 'Cancelado' })[a.status] || a.status, statusClass: a.status === 'em_analise' ? styles.statusAnalise : a.tipo === 'infracao' ? styles.statusAutuado : styles.statusNotificado }));
  const [searchTerm, setSearchTerm] = useState('');
  const [modalNovoAuto, setModalNovoAuto] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Formulário de Novo Auto
  const [formData, setFormData] = useState({
    id_ocorrencia: '',
    infrator: '',
    tipo: 'Descarte Irregular',
    status: 'Notificado',
    descricao: ''
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Autuado': return styles.statusAutuado;
      case 'Em Análise': return styles.statusAnalise;
      default: return styles.statusNotificado;
    }
  };

  const handleCreateAuto = async (e) => {
    e.preventDefault();
    await perform(async () => {
      const result = await api('/autos', { method: 'POST', body: { id_ocorrencia: Number(formData.id_ocorrencia), tipo: formData.status === 'Autuado' ? 'infracao' : 'notificacao', tipo_infracao: formData.tipo, autuado_nome: formData.infrator, descricao_infracao: formData.descricao, status: ({ Notificado: 'notificado', Autuado: 'autuado', 'Em Análise': 'em_analise' })[formData.status] }});
      refreshScreens(); setModalNovoAuto(false); setFormData({ id_ocorrencia: '', infrator: '', tipo: 'Descarte Irregular', status: 'Notificado', descricao: '' }); setSuccessMessage(`Documento AUTO-${result.id_auto} salvo.`); setTimeout(() => setSuccessMessage(''), 4000);
    });
  };

  const handleUpdateStatus = async (autoId, novoStatus) => {
    await perform(async () => {
      const item = autos.find(a => a.id === autoId); if (!item) return;
      await api(`/autos/${item.id_auto}`, { method: 'PATCH', body: { status: ({ Notificado: 'notificado', Autuado: 'autuado', 'Em Análise': 'em_analise' })[novoStatus] }});
      refreshScreens(); setSelectedAuto(prev => prev ? { ...prev, status: novoStatus, statusClass: getStatusClass(novoStatus) } : null); setSuccessMessage(`Status atualizado para ${novoStatus}.`); setTimeout(() => setSuccessMessage(''), 4000);
    });
  };

  const isActive = (path) => location.pathname === path;

  const filteredAutos = autos.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.infrator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className={styles.headerTitle}>Autos e Notificações</h1>
              <span className={styles.headerSubtitle}>Registro de infrações e advertências ambientais ({autos.length})</span>
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
          {successMessage && (
            <div className={`${styles.infoBanner} ${styles.status_success}`}>
              <div className={styles.infoContent}>
                <CheckCircle2 size={24} />
                <div>
                  <strong>Operação Concluída!</strong>
                  <p>{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.loginCard}>
            <div className={styles.loginCardHeader}>
              <div className={styles.headerIconBadge}>
                <FileText size={24} />
              </div>
              <div>
                <h2>Documentos Fiscais Emitidos</h2>
                <p>Consulte ou emita novos autos de infração e notificações oficiais.</p>
              </div>
            </div>

            <div className={styles.actionsBar}>
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Buscar por auto ou infrator..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button 
                type="button"
                className={styles.btnSubmit}
                onClick={() => setModalNovoAuto(true)}
              >
                <Plus size={18} /> Novo Auto de Infração
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nº Auto</th>
                    <th>Infrator / Empresa</th>
                    <th>Tipo de Infração</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAutos.length > 0 ? (
                    filteredAutos.map((item) => (
                      <tr key={item.id}>
                        <td className={styles.codeCell}>
                          <FileCheck size={16} /> {item.id}
                        </td>
                        <td><strong>{item.infrator}</strong></td>
                        <td>{item.tipo}</td>
                        <td>{item.data}</td>
                        <td>
                          <span className={`${styles.badgeStatus} ${item.statusClass}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            type="button"
                            className={styles.btnAction}
                            onClick={() => setSelectedAuto(item)}
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                        Nenhum documento fiscal encontrado para a busca.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL NOVO AUTO DE INFRAÇÃO */}
      {modalNovoAuto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Emitir Novo Auto de Infração</h3>
              <button type="button" onClick={() => setModalNovoAuto(false)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAuto} className={styles.modalForm}>
              <label>Ocorrência vinculada *<select required value={formData.id_ocorrencia} onChange={e => setFormData({ ...formData, id_ocorrencia: e.target.value })}><option value="">Selecione</option>{ocorrencias.map(o => <option key={o.id} value={o.id}>{o.protocolo_ocorrencia} — {o.titulo}</option>)}</select></label>
              <label>
                Infrator / Razão Social
                <input 
                  type="text" 
                  placeholder="Ex: Construtora Silva LTDA"
                  value={formData.infrator}
                  onChange={(e) => setFormData({...formData, infrator: e.target.value})}
                  required
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label>
                  Tipo de Infração
                  <select 
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  >
                    <option value="Descarte Irregular">Descarte Irregular</option>
                    <option value="Vazamento / Poluição">Vazamento / Poluição</option>
                    <option value="Desmatamento">Desmatamento</option>
                    <option value="Queimada Urbana">Queimada Urbana</option>
                    <option value="Poluição Sonora">Poluição Sonora</option>
                  </select>
                </label>

                <label>
                  Status Inicial
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Notificado">Notificado</option>
                    <option value="Autuado">Autuado</option>
                    <option value="Em Análise">Em Análise</option>
                  </select>
                </label>
              </div>

              <label>
                Descrição / Fundamentação
                <textarea 
                  rows="3"
                  placeholder="Relate brevemente a irregularidade constatada..."
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                />
              </label>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setModalNovoAuto(false)} className={styles.btnCancel}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  <FileCheck size={16} /> Emitir Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALHES DO AUTO */}
      {selectedAuto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Ficha do Documento {selectedAuto.id}</h3>
              <button type="button" onClick={() => setSelectedAuto(null)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <strong>Nº Auto:</strong>
                <span>{selectedAuto.id}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Infrator:</strong>
                <span>{selectedAuto.infrator}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Tipo de Infração:</strong>
                <span>{selectedAuto.tipo}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Data de Emissão:</strong>
                <span>{selectedAuto.data}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Status Atual:</strong>
                <span className={`${styles.badgeStatus} ${selectedAuto.statusClass}`}>
                  {selectedAuto.status}
                </span>
              </div>

              <div className={styles.detailBox}>
                <strong>Resumo da Infração:</strong>
                <p>{selectedAuto.descricao}</p>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#065f46', display: 'block', marginBottom: '0.5rem' }}>
                  Alterar Status do Processo:
                </strong>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button"
                    onClick={() => handleUpdateStatus(selectedAuto.id, 'Notificado')}
                    className={styles.statusOptionBtn}
                  >
                    Notificado
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleUpdateStatus(selectedAuto.id, 'Autuado')}
                    className={styles.statusOptionBtn}
                  >
                    Autuado
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleUpdateStatus(selectedAuto.id, 'Em Análise')}
                    className={styles.statusOptionBtn}
                  >
                    Em Análise
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setSelectedAuto(null)} className={styles.btnCancel}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}