import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './filavistorias.module.css';

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
  LogOut, 
  Bell, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

export default function FilaVistorias() {
  const navigate = useNavigate();

  const [vistorias, setVistorias] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // CARREGAR E ESCUTAR SINCRONIZAÇÃO EM TEMPO REAL
  const carregarVistorias = () => {
    const salvas = localStorage.getItem('ocorrencias_mapa');
    if (salvas) {
      const dados = JSON.parse(salvas);
      setVistorias(dados);
      if (dados.length > 0 && !itemSelecionado) {
        setItemSelecionado(dados[0]);
      }
    }
  };

  useEffect(() => {
    carregarVistorias();

    const handleStorageChange = () => {
      carregarVistorias();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // MARCAR COMO CONCLUÍDO / CONCLUIR VISTORIA
  const handleAtualizarStatus = (id, novoStatus, novaCor) => {
    const listaAtualizada = vistorias.map(item => {
      if (item.id === id) {
        return { ...item, status: novoStatus, corStatus: novaCor };
      }
      return item;
    });

    setVistorias(listaAtualizada);
    const selecionadoAtualizado = listaAtualizada.find(i => i.id === id);
    setItemSelecionado(selecionadoAtualizado);

    localStorage.setItem('ocorrencias_mapa', JSON.stringify(listaAtualizada));
    window.dispatchEvent(new Event('storage'));
  };

  // NAVEGAÇÃO DA SIDEBAR
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/fila-fiscalizacao', ativo: true },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autos-notificacoes' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorios-tecnicos' },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/legislacao' }
  ];

  // FILTRAGEM E BUSCA
  const vistoriasFiltradas = vistorias.filter(item => {
    const atendeBusca = (item.titulo || item.title || '').toLowerCase().includes(busca.toLowerCase()) ||
                        (item.descricao || item.address || '').toLowerCase().includes(busca.toLowerCase());

    if (filtroStatus === 'todos') return atendeBusca;
    if (filtroStatus === 'pendentes') return atendeBusca && item.corStatus === 'vermelho';
    if (filtroStatus === 'andamento') return atendeBusca && item.corStatus === 'amarelo';
    if (filtroStatus === 'concluidos') return atendeBusca && item.corStatus === 'verde';

    return atendeBusca;
  });

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR PADRÃO */}
      <aside className={styles.sidebar}>
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
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>Fila de Vistorias</h1>
            <span className={styles.headerSubtitle}>Gerenciamento e execução das vistorias de campo</span>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} title="Notificações">
              <Bell size={20} />
            </button>

            <div className={styles.userProfile} onClick={() => navigate('/perfil')} style={{ cursor: 'pointer' }}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </div>

            <button className={styles.btnLogout} onClick={() => navigate('/')} title="Sair do Sistema">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            
            {/* PAINEL ESQUERDO: CONTROLES E LISTA DE VISTORIAS */}
            <section className={styles.listCardSection}>
              
              {/* BARRA DE PESQUISA E FILTROS */}
              <div className={styles.filterBar}>
                <div className={styles.searchBox}>
                  <Search size={16} className={styles.searchIcon} />
                  <input 
                    type="text" 
                    placeholder="Buscar por título ou local..."
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

              {/* LISTA DE VISTORIAS */}
              <div className={styles.vistoriasList}>
                {vistoriasFiltradas.length === 0 ? (
                  <div className={styles.emptyState}>
                    <AlertCircle size={32} />
                    <p>Nenhuma vistoria encontrada com os filtros selecionados.</p>
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

                  {/* AÇÕES DE MUDANÇA DE STATUS */}
                  <div className={styles.detailActions}>
                    <button 
                      className={styles.btnAcaoAmarelo}
                      onClick={() => handleAtualizarStatus(itemSelecionado.id, 'Em Andamento', 'amarelo')}
                    >
                      Iniciar Vistoria
                    </button>

                    <button 
                      className={styles.btnAcaoVerde}
                      onClick={() => handleAtualizarStatus(itemSelecionado.id, 'Já Visitado', 'verde')}
                    >
                      <CheckCircle2 size={16} /> Marcar como Concluído
                    </button>

                    <button 
                      className={styles.btnAcaoRelatorio}
                      onClick={() => navigate('/relatorios-tecnicos')}
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