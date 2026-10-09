import { api, perform, useCollection, occurrenceView, refreshScreens } from '../../../services/originalScreens';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './geoprocessamento.module.css';
import TupaMap from '../../../components/TupaMap';
import { coordinateBody, coordinatesInTupa } from '../../../services/mapCoordinates';
import { 
  ArrowLeft, Map as MapIcon, Layers, Filter,
  Shield, ClipboardList, FileText, BarChart2, HelpCircle, Home as HomeIcon,
  X } from 'lucide-react';

export default function Geoprocessamento() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pontosMapa] = useCollection('/ocorrencias', o => ({ ...occurrenceView(o), tipo: /queimada/i.test(o.nome_categoria || '') ? 'queimada' : /poda|desmat|vegetação/i.test(o.nome_categoria || '') ? 'app' : 'vistoria' }));
  const [ocorrenciaId, setOcorrenciaId] = useState('');
  const [localizacao, setLocalizacao] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [modalCamadas, setModalCamadas] = useState(false);
  const [modalFiltro, setModalFiltro] = useState(false);
  const [regiaoAtiva, setRegiaoAtiva] = useState('Todas');

  const [camadas, setCamadas] = useState({
    app: true,
    queimadas: true,
    vistorias: true
  });

  const isActive = (path) => location.pathname === path;

  const toggleCamada = (chave) => {
    setCamadas(prev => ({ ...prev, [chave]: !prev[chave] }));
  };

  const selectOccurrence = occurrence => {
    setOcorrenciaId(String(occurrence?.id || ''));
    const coordinates = coordinatesInTupa(occurrence);
    setLocalizacao(coordinates ? { lat: coordinates[0], lng: coordinates[1] } : null);
    setMensagem('');
  };
  const saveLocation = async () => {
    if (!ocorrenciaId || !coordinatesInTupa(localizacao) || salvando) return;
    setSalvando(true);
    await perform(async () => {
      await api(`/ocorrencias/${ocorrenciaId}`, { method: 'PATCH', body: coordinateBody(localizacao) });
      refreshScreens(); setMensagem('Localização salva. O ponto aparecerá nos painéis da gestão, equipe e cidadão.');
    });
    setSalvando(false);
  };

  const pontosExibidos = pontosMapa.filter(p => {
    if (regiaoAtiva !== 'Todas' && p.status_ocorrencia !== regiaoAtiva) return false;
    if (p.tipo === 'app' && !camadas.app) return false;
    if (p.tipo === 'queimada' && !camadas.queimadas) return false;
    if (p.tipo === 'vistoria' && !camadas.vistorias) return false;
    return true;
  });

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
              <h1 className={styles.headerTitle}>Módulo de Geoprocessamento</h1>
              <span className={styles.headerSubtitle}>Mapeamento espacial e zonas ambientais</span>
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
          <div className={styles.loginCard}>
            <div className={styles.loginCardHeader}>
              <div className={styles.headerIconBadge}>
                <MapIcon size={24} />
              </div>
              <div>
                <h2>Mapa Interativo de Análise Territorial</h2>
                <p>Consulte as ruas de Tupã e as localizações das ocorrências cadastradas.</p>
              </div>
            </div>

            {/* BARRA DE FERRAMENTAS DO MAPA */}
            <div className={styles.mapToolsBar}>
              <button 
                type="button" 
                className={styles.btnSubmit}
                onClick={() => setModalCamadas(!modalCamadas)}
              >
                <Layers size={16} /> Camadas do Mapa
              </button>

              <button 
                type="button" 
                className={styles.btnSecondary}
                onClick={() => setModalFiltro(!modalFiltro)}
              >
                <Filter size={16} /> Filtrar por status
              </button>
            </div>

            <div className={styles.modalForm} style={{ marginBottom: '16px' }}>
              <label>Localizar ou corrigir uma ocorrência
                <select value={ocorrenciaId} onChange={event => selectOccurrence(pontosMapa.find(point => String(point.id) === event.target.value))}>
                  <option value="">Selecione um protocolo para marcar o local</option>
                  {pontosMapa.map(point => <option key={point.id} value={point.id}>{point.protocolo_ocorrencia} - {point.titulo}</option>)}
                </select>
              </label>
            </div>
            <TupaMap occurrences={pontosExibidos} selectedLocation={localizacao} onPick={ocorrenciaId ? setLocalizacao : undefined} onOccurrenceClick={selectOccurrence} height={440} />
            {ocorrenciaId && <button type="button" className={styles.btnSubmit} style={{ marginTop: '12px' }} disabled={salvando || !coordinatesInTupa(localizacao)} onClick={saveLocation}>{salvando ? 'Salvando...' : 'Salvar localização da ocorrência'}</button>}
            {mensagem && <p role="status">{mensagem}</p>}
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE SELEÇÃO DE CAMADAS */}
      {modalCamadas && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '380px' }}>
            <div className={styles.modalHeader}>
              <h3>Camadas do Mapa</h3>
              <button type="button" onClick={() => setModalCamadas(false)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>
            
            <div className={styles.modalForm}>
              <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Ocorrências de vegetação</span>
                <input 
                  type="checkbox" 
                  checked={camadas.app} 
                  onChange={() => toggleCamada('app')}
                  style={{ width: 'auto' }}
                />
              </label>

              <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Relatos de queimadas</span>
                <input 
                  type="checkbox" 
                  checked={camadas.queimadas} 
                  onChange={() => toggleCamada('queimadas')}
                  style={{ width: 'auto' }}
                />
              </label>

              <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Outras ocorrências</span>
                <input 
                  type="checkbox" 
                  checked={camadas.vistorias} 
                  onChange={() => toggleCamada('vistorias')}
                  style={{ width: 'auto' }}
                />
              </label>
            </div>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setModalCamadas(false)} className={styles.btnSubmit}>
                Aplicar Camadas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE FILTROS DE ÁREA */}
      {modalFiltro && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '380px' }}>
            <div className={styles.modalHeader}>
              <h3>Filtrar por status</h3>
              <button type="button" onClick={() => setModalFiltro(false)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalForm}>
              <label>
                Situação da ocorrência:
                <select 
                  value={regiaoAtiva} 
                  onChange={(e) => setRegiaoAtiva(e.target.value)}
                >
                  <option value="Todas">Todos os status</option>
                  <option value="aberta">Aberta</option>
                  <option value="em_analise">Em análise</option>
                  <option value="em_andamento">Em andamento</option>
                  <option value="resolvida">Resolvida</option>
                  <option value="arquivada">Arquivada</option>
                </select>
              </label>
            </div>

            <div className={styles.modalActions}>
              <button type="button" onClick={() => setModalFiltro(false)} className={styles.btnSubmit}>
                Confirmar Filtro
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
