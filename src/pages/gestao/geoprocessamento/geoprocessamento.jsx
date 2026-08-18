import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './geoprocessamento.module.css';
import { 
  ArrowLeft, Map as MapIcon, Layers, Filter, Navigation, 
  Shield, ClipboardList, FileText, BarChart2, HelpCircle, Home as HomeIcon,
  X, CheckCircle2, Eye, MapPin, Flame, AlertCircle
} from 'lucide-react';

const INITIAL_PONTOS = [
  { id: 1, top: '35%', left: '42%', titulo: 'Zona de Preservação - APP Rio Verde', tipo: 'app', status: 'Preservado', cor: '#10b981' },
  { id: 2, top: '55%', left: '60%', titulo: 'Alerta de Queimada - Lote Vago', tipo: 'queimada', status: 'Alerta Crítico', cor: '#f59e0b' },
  { id: 3, top: '48%', left: '28%', titulo: 'Vistoria de Poda Irregular', tipo: 'vistoria', status: 'Em Campo', cor: '#3b82f6' }
];

export default function Geoprocessamento() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pontosMapa, setPontosMapa] = useState(INITIAL_PONTOS);
  const [pontoAtivo, setPontoAtivo] = useState(null);
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

  const handleAddPontoClique = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const novo = {
      id: Date.now(),
      top: `${y.toFixed(1)}%`,
      left: `${x.toFixed(1)}%`,
      titulo: 'Novo Ponto de Marcação',
      tipo: 'vistoria',
      status: 'Aguardando Análise',
      cor: '#ef4444'
    };

    setPontosMapa(prev => [...prev, novo]);
  };

  const pontosExibidos = pontosMapa.filter(p => {
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
                <p>Monitore zonas de preservação, alertas de satélite e áreas sob vistoria.</p>
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
                <Filter size={16} /> Filtros de Área ({regiaoAtiva})
              </button>
            </div>

            {/* CANVAS INTERATIVO DO MAPA */}
            <div 
              className={styles.mapCanvasContainer}
              onClick={() => setPontoAtivo(null)}
              onDoubleClick={handleAddPontoClique}
              title="Clique duplo para marcar um novo ponto no mapa"
            >
              <div className={styles.mapWatermark}>
                <Navigation size={48} />
                <span>Clique duplo no mapa para marcar um ponto</span>
              </div>

              {/* RENDERIZAÇÃO DOS PINOS */}
              {pontosExibidos.map((p) => (
                <div
                  key={p.id}
                  className={styles.mapPin}
                  style={{ top: p.top, left: p.left, backgroundColor: p.cor }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPontoAtivo(p);
                  }}
                >
                  <MapPin size={16} color="#ffffff" />
                </div>
              ))}

              {/* CARD DE INFORMAÇÕES DO PIN SELECIONADO */}
              {pontoAtivo && (
                <div 
                  className={styles.popupCard}
                  style={{ top: pontoAtivo.top, left: pontoAtivo.left }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.popupHeader}>
                    <strong>{pontoAtivo.titulo}</strong>
                    <button type="button" onClick={() => setPontoAtivo(null)} className={styles.closeBtnPopup}>
                      <X size={14} />
                    </button>
                  </div>
                  <p>Status: <span style={{ color: pontoAtivo.cor, fontWeight: 'bold' }}>{pontoAtivo.status}</span></p>
                  <button 
                    type="button" 
                    className={styles.btnActionPopup}
                    onClick={() => navigate('/fila-fiscalizacao')}
                  >
                    Ver Ocorrências Próximas
                  </button>
                </div>
              )}
            </div>
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
                <span>Áreas de Preservação (APP)</span>
                <input 
                  type="checkbox" 
                  checked={camadas.app} 
                  onChange={() => toggleCamada('app')}
                  style={{ width: 'auto' }}
                />
              </label>

              <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Alertas de Queimadas</span>
                <input 
                  type="checkbox" 
                  checked={camadas.queimadas} 
                  onChange={() => toggleCamada('queimadas')}
                  style={{ width: 'auto' }}
                />
              </label>

              <label style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Lotes sob Vistoria</span>
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
              <h3>Filtrar por Região</h3>
              <button type="button" onClick={() => setModalFiltro(false)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalForm}>
              <label>
                Selecione o Setor do Município:
                <select 
                  value={regiaoAtiva} 
                  onChange={(e) => setRegiaoAtiva(e.target.value)}
                >
                  <option value="Todas">Todas as Regiões</option>
                  <option value="Zona Norte">Setor Norte</option>
                  <option value="Zona Sul">Setor Sul</option>
                  <option value="Centro">Centro Urbano</option>
                  <option value="Zona Rural">Área Rural / Mananciais</option>
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