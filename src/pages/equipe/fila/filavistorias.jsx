import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { api, perform, useCollection, occurrenceView, canonicalStatus, refreshScreens } from '../../../services/originalScreens';
import { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './filavistorias.module.css';
import { normalizeAddress } from '../../../services/addressParts';

// CAMINHOS DE IMPORTAÇÃO DAS IMAGENS
import prefeituraLogo from '../../../assets/prefeitura.png';
import arvoreLogo from '../../../assets/arvore.png';

import { 
  MapPin, 
  ClipboardList, 
  FileText, 
  BarChart2, 
  BookOpen, 
  Users, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function FilaVistorias() {
  const navigate = useNavigate();

  const [vistorias, , consulta] = useCollection('/ocorrencias', occurrenceView);
  const [atualizando, setAtualizando] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // MARCAR COMO CONCLUÍDO / CONCLUIR VISTORIA
  const handleAtualizarStatus = async (id, novoStatus) => {
    if (atualizando) return;
    setAtualizando(true);
    await perform(async () => { const value = await api(`/ocorrencias/${id}`, { method: 'PATCH', body: { status_ocorrencia: canonicalStatus(novoStatus) }}); setItemSelecionado(current => occurrenceView({ ...current, ...value })); refreshScreens(); });
    setAtualizando(false);
  };

  // NAVEGAÇÃO DA SIDEBAR PADRONIZADA (IGUAL À HOME DA EQUIPE)
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae', ativo: true },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe' },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/leise' },
    { id: 'perfil', titulo: 'Perfil da Equipe', icon: <Users size={22} />, rota: '/perfile' },
  ];

  // FILTRAGEM E BUSCA
  const vistoriasFiltradas = vistorias.filter(item => {
    const atendeBusca = normalizeAddress([item.protocolo_ocorrencia, item.titulo, item.endereco, item.descricao, item.nome_categoria].join(' ')).includes(normalizeAddress(busca));

    if (filtroStatus === 'todos') return atendeBusca;
    if (filtroStatus === 'pendentes') return atendeBusca && ['aberta', 'em_analise'].includes(item.status_ocorrencia);
    if (filtroStatus === 'andamento') return atendeBusca && item.corStatus === 'amarelo';
    if (filtroStatus === 'concluidos') return atendeBusca && item.corStatus === 'verde';

    return atendeBusca;
  });

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR PADRÃO DA EQUIPE */}
      <ResponsiveSidebar className={styles.sidebar}>
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
      </ResponsiveSidebar>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>Fila de Vistorias</h1>
            <span className={styles.headerSubtitle}>Gerenciamento e execução das vistorias de campo</span>
          </div>

          <div className={styles.headerRight}>
            {/* PERFIL DA EQUIPE CLICÁVEL (REDIRECIONA PARA /PERFILE) */}
            <Link to="/perfile" className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </Link>

            {/* BOTÃO AMARELO DE VOLTAR PARA A HOME DA EQUIPE */}
            <button 
              onClick={() => navigate('/homee')} 
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

        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            
            {/* PAINEL ESQUERDO: CONTROLES E LISTA DE VISTORIAS */}
            <section className={styles.listCardSection}>
              <div className={styles.filterBar}>
                <div className={styles.searchBox}>
                  <Search size={16} className={styles.searchIcon} />
                  <input 
                    type="text" 
                    aria-label="Buscar vistorias"
                    placeholder="Protocolo, título ou endereço..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>

                <div className={styles.statusChips}>
                  <button 
                    className={filtroStatus === 'todos' ? styles.chipActive : styles.chip}
                    onClick={() => setFiltroStatus('todos')}
                  >
                    Todos ({vistorias.length})
                  </button>
                  <button 
                    className={filtroStatus === 'pendentes' ? styles.chipActive : styles.chip}
                    onClick={() => setFiltroStatus('pendentes')}
                  >
                    Pendentes
                  </button>
                  <button 
                    className={filtroStatus === 'andamento' ? styles.chipActive : styles.chip}
                    onClick={() => setFiltroStatus('andamento')}
                  >
                    Em Ação
                  </button>
                  <button 
                    className={filtroStatus === 'concluidos' ? styles.chipActive : styles.chip}
                    onClick={() => setFiltroStatus('concluidos')}
                  >
                    Concluídos
                  </button>
                </div>
              </div>

              <div className={styles.vistoriasList}>
                {vistoriasFiltradas.length === 0 ? (
                  <div className={styles.emptyState}>
                    <AlertCircle size={32} />
                    <p>{consulta.loading ? 'Carregando vistorias...' : consulta.error ? 'Não foi possível carregar as vistorias. Atualize a página para tentar novamente.' : 'Nenhuma vistoria encontrada com os filtros selecionados.'}</p>
                  </div>
                ) : (
                  vistoriasFiltradas.map((item) => (
                    <div 
                      key={item.id} 
                      className={`${styles.cardVistoria} ${itemSelecionado?.id === item.id ? styles.cardSelected : ''}`}
                      onClick={() => setItemSelecionado(item)}
                    >
                      <div className={styles.cardHeaderTop}>
                        <span className={`${styles.badgeStatus} ${styles['status_' + item.corStatus]}`}>
                          ● {item.status}
                        </span>
                        <span className={styles.timeText}><Clock size={12} /> {item.data || item.date}</span>
                      </div>

                      <h4 className={styles.vistoriaTitle}>{item.titulo || item.title}</h4>
                      <small>{item.protocolo_ocorrencia}</small>
                      <p className={styles.vistoriaDesc}>{item.descricao || item.address}</p>

                      <div className={styles.cardFooter}>
                        <small>Prioridade: <strong>{item.prioridade || 'Média'}</strong></small>
                        <ChevronRight size={16} className={styles.arrowIcon} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* PAINEL DIREITO: DETALHAMENTO E AÇÕES DA VISTORIA */}
            <section className={styles.detailCardSection}>
              {itemSelecionado ? (
                <div className={styles.detailContainer}>
                  <div className={styles.detailHeader}>
                    <div>
                      <span className={`${styles.badgeStatus} ${styles['status_' + itemSelecionado.corStatus]}`}>
                        ● {itemSelecionado.status}
                      </span>
                      <h2>{itemSelecionado.titulo || itemSelecionado.title}</h2>
                    </div>
                  </div>

                  <div className={styles.detailBody}>
                    <div className={styles.infoRow}>
                      <strong>Localização / Endereço:</strong>
                      <p>{itemSelecionado.descricao || itemSelecionado.address}</p>
                    </div>

                    <div className={styles.infoGroupGrid}>
                      <div className={styles.infoBox}>
                        <span>Nível de Prioridade</span>
                        <strong>{itemSelecionado.prioridade || 'Média'}</strong>
                      </div>
                      <div className={styles.infoBox}>
                        <span>Data do Registro</span>
                        <strong>{itemSelecionado.data || itemSelecionado.date}</strong>
                      </div>
                    </div>

                    <div className={styles.instrucoesBox}>
                      <h4>Instruções da Fiscalização</h4>
                      <p>
                        Dirija-se ao local para apuração dos fatos. Verifique a necessidade de emissão de auto de infração ou notificação preventiva.
                      </p>
                    </div>
                  </div>

                  <div className={styles.detailActions}>
                    {['aberta', 'em_analise'].includes(itemSelecionado.status_ocorrencia) && <p>Inicie a vistoria para habilitar a conclusão.</p>}
                    <button 
                      className={styles.btnAcaoAmarelo}
                      disabled={atualizando || !['aberta', 'em_analise'].includes(itemSelecionado.status_ocorrencia)}
                      onClick={() => handleAtualizarStatus(itemSelecionado.id, 'Em Andamento', 'amarelo')}
                    >
                      Iniciar Vistoria
                    </button>

                    <button 
                      className={styles.btnAcaoVerde}
                      disabled={atualizando || itemSelecionado.status_ocorrencia !== 'em_andamento'}
                      onClick={() => handleAtualizarStatus(itemSelecionado.id, 'Já Visitado', 'verde')}
                    >
                      <CheckCircle2 size={16} /> Marcar como Concluído
                    </button>

                    <button 
                      className={styles.btnAcaoRelatorio}
                      onClick={() => navigate(`/relatorioe?ocorrencia=${itemSelecionado.id}`)}
                    >
                      Emitir Relatório de Campo
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyDetail}>
                  <ClipboardList size={48} />
                  <p>Selecione uma vistoria na lista ao lado para ver os detalhes e executar a ação.</p>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
