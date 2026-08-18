import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './autosNotificacoes.module.css';
import { 
  ArrowLeft, FileText, Plus, Search, FileCheck, 
  Shield, Map as MapIcon, ClipboardList, BarChart2, HelpCircle, Home as HomeIcon,
  X, CheckCircle2, AlertTriangle, Eye
} from 'lucide-react';

const INITIAL_AUTOS = [
  { 
    id: "AUTO-2026/089", 
    infrator: "Construtora Silva LTDA", 
    data: "01/08/2026", 
    status: "Notificado",
    statusClass: styles.statusNotificado,
    tipo: "Descarte Irregular",
    descricao: "Depósito não autorizado de resíduos de construção civil em calçada pública."
  },
  { 
    id: "AUTO-2026/090", 
    infrator: "Posto Central S/A", 
    data: "03/08/2026", 
    status: "Autuado",
    statusClass: styles.statusAutuado,
    tipo: "Vazamento / Poluição",
    descricao: "Vazamento de efluente oleoso atingindo a rede de drenagem pluvial urbana."
  },
  { 
    id: "AUTO-2026/091", 
    infrator: "Comércio de Madeiras Verde", 
    data: "05/08/2026", 
    status: "Em Análise",
    statusClass: styles.statusAnalise,
    tipo: "Desmatamento",
    descricao: "Supressão de espécimes arbóreos nativos sem licença ambiental prévia."
  }
];

export default function AutosNotificacoes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [autos, setAutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalNovoAuto, setModalNovoAuto] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Formulário de Novo Auto
  const [formData, setFormData] = useState({
    infrator: '',
    tipo: 'Descarte Irregular',
    status: 'Notificado',
    descricao: ''
  });

  // Carrega e sincroniza com localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('autos_notificacoes_dados');
    if (salvos) {
      setAutos(JSON.parse(salvos));
    } else {
      localStorage.setItem('autos_notificacoes_dados', JSON.stringify(INITIAL_AUTOS));
      setAutos(INITIAL_AUTOS);
    }
  }, []);

  const salvarAutos = (novaLista) => {
    setAutos(novaLista);
    localStorage.setItem('autos_notificacoes_dados', JSON.stringify(novaLista));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Autuado': return styles.statusAutuado;
      case 'Em Análise': return styles.statusAnalise;
      default: return styles.statusNotificado;
    }
  };

  const handleCreateAuto = (e) => {
    e.preventDefault();
    if (!formData.infrator.trim()) return;

    const ano = new Date().getFullYear();
    const numRandom = Math.floor(Math.random() * 900) + 100;
    const novoId = `AUTO-${ano}/${numRandom}`;

    const novoItem = {
      id: novoId,
      infrator: formData.infrator,
      tipo: formData.tipo,
      data: new Date().toLocaleDateString('pt-BR'),
      status: formData.status,
      statusClass: getStatusClass(formData.status),
      descricao: formData.descricao || "Documento fiscal emitido via sistema municipal."
    };

    const novaLista = [novoItem, ...autos];
    salvarAutos(novaLista);

    setFormData({ infrator: '', tipo: 'Descarte Irregular', status: 'Notificado', descricao: '' });
    setModalNovoAuto(false);
    setSuccessMessage(`Documento ${novoId} emitido com sucesso!`);

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleUpdateStatus = (autoId, novoStatus) => {
    const novaLista = autos.map(item => {
      if (item.id === autoId) {
        return {
          ...item,
          status: novoStatus,
          statusClass: getStatusClass(novoStatus)
        };
      }
      return item;
    });

    salvarAutos(novaLista);
    setSelectedAuto(prev => prev ? { ...prev, status: novoStatus, statusClass: getStatusClass(novoStatus) } : null);
    setSuccessMessage(`Status do ${autoId} atualizado para ${novoStatus}!`);
    setTimeout(() => setSuccessMessage(''), 4000);
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