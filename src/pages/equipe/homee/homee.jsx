import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './homee.module.css';

// CAMINHOS DE IMPORTAÇÃO (Ajustados para os assets do seu projeto)
import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

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
  ArrowLeft
} from 'lucide-react';

export default function HomeE() {
  const navigate = useNavigate();

  // PONTOS PADRÃO
  const pontosPadrao = [
    {
      id: 1,
      titulo: 'Manutenção de Parques',
      descricao: 'Lixar e pintar bancos; vistoria no playground',
      prioridade: 'Médio',
      status: 'Em Andamento',
      corStatus: 'amarelo',
      data: 'Hoje, 10:30',
      posicaoTop: '45%',
      posicaoLeft: '48%'
    },
    {
      id: 2,
      titulo: 'Corte Irregular de Árvore',
      descricao: 'Fiscalizar denúncia na área urbana',
      prioridade: 'Alta',
      status: 'Não Visitado',
      corStatus: 'vermelho',
      data: 'Hoje, 09:15',
      posicaoTop: '58%',
      posicaoLeft: '28%'
    },
    {
      id: 3,
      titulo: 'Poda Concluída',
      descricao: 'Limpeza de galhos após tempestade',
      prioridade: 'Baixa',
      status: 'Já Visitado',
      corStatus: 'verde',
      data: 'Ontem, 16:40',
      posicaoTop: '32%',
      posicaoLeft: '62%'
    }
  ];

  const [ocorrenciasGestao, setOcorrenciasGestao] = useState([]);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);

  const carregarOcorrencias = () => {
    const salvas = localStorage.getItem('ocorrencias_mapa');
    if (salvas) {
      const dados = JSON.parse(salvas);
      setOcorrenciasGestao(dados);
      if (dados.length > 0 && !ocorrenciaSelecionada) {
        setOcorrenciaSelecionada(dados[0]);
      }
    } else {
      localStorage.setItem('ocorrencias_mapa', JSON.stringify(pontosPadrao));
      setOcorrenciasGestao(pontosPadrao);
      setOcorrenciaSelecionada(pontosPadrao[0]);
    }
  };

  useEffect(() => {
    carregarOcorrencias();

    const handleStorageChange = () => {
      carregarOcorrencias();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleMarcarConcluido = (id) => {
    const listaAtualizada = ocorrenciasGestao.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Já Visitado', corStatus: 'verde' };
      }
      return item;
    });

    setOcorrenciasGestao(listaAtualizada);
    
    const selecionadoAtualizado = listaAtualizada.find(i => i.id === id);
    setOcorrenciaSelecionada(selecionadoAtualizado);

    localStorage.setItem('ocorrencias_mapa', JSON.stringify(listaAtualizada));
    window.dispatchEvent(new Event('storage'));
  };

  // ROTAS CORRETAS DAS TELAS DA EQUIPE
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee', ativo: true },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe' },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/leise' }
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR DA EQUIPE */}
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader}>
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
            <h1 className={styles.headerTitle}>Olá, Equipe Ambiental!</h1>
            <span className={styles.headerSubtitle}>Pontos e vistorias atribuídos em tempo real pela Gestão</span>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} title="Notificações">
              <Bell size={20} />
            </button>

            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </div>

            <button 
              className={styles.btnLogout} 
              onClick={() => navigate('/login')}
              title="Sair do Sistema"
            >
              <LogOut size={18} />
            </button>

            {/* BOTÃO AMARELO DE VOLTAR PARA A TELA INICIAL */}
            <button 
              onClick={() => navigate('/')} 
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
          <div className={styles.mapGridContainer}>
            
            <section className={styles.listSection}>
              <div className={styles.legendaBox}>
                <h3>Legenda do Mapa</h3>
                <ul className={styles.legendaList}>
                  <li><span className={`${styles.dot} ${styles.dotRed}`}></span> Não Visitado</li>
                  <li><span className={`${styles.dot} ${styles.dotYellow}`}></span> Em Ação</li>
                  <li><span className={`${styles.dot} ${styles.dotGreen}`}></span> Já Visitado</li>
                </ul>
              </div>

              <div className={styles.listHeader}>
                <h3>Tarefas da Gestão ({ocorrenciasGestao.length})</h3>
              </div>

              <div className={styles.ocorrenciasList}>
                {ocorrenciasGestao.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${styles.cardOcorrencia} ${ocorrenciaSelecionada?.id === item.id ? styles.cardSelected : ''}`}
                    onClick={() => setOcorrenciaSelecionada(item)}
                  >
                    <div className={styles.cardHeaderTop}>
                      <span className={`${styles.badgeStatus} ${styles['status_' + item.corStatus]}`}>
                        ● {item.status}
                      </span>
                      <span className={styles.timeText}><Clock size={12} /> {item.data}</span>
                    </div>

                    <h4 className={styles.ocorrenciaTitle}>{item.titulo}</h4>
                    <p className={styles.ocorrenciaDesc}>{item.descricao}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.mapSection}>
              <div className={styles.mapControlsHeader}>
                <h2>VISÃO GERAL DA CIDADE:</h2>
                <button className={styles.btnEnviarRelatorio} onClick={() => navigate('/relatorioe')}>
                  Enviar Relatório
                </button>
              </div>

              <div className={styles.mapCanvas}>
                {ocorrenciasGestao.map((ponto) => (
                  <div 
                    key={ponto.id}
                    className={`${styles.mapDotPin} ${styles['dot_' + ponto.corStatus]} ${ocorrenciaSelecionada?.id === ponto.id ? styles.dotActive : ''}`}
                    style={{ top: ponto.posicaoTop, left: ponto.posicaoLeft }}
                    onClick={() => setOcorrenciaSelecionada(ponto)}
                  />
                ))}

                {ocorrenciaSelecionada && (
                  <div className={styles.mapPopupCard}>
                    <h4>{ocorrenciaSelecionada.titulo}</h4>
                    <p>{ocorrenciaSelecionada.descricao}</p>
                    <small>PRIORIDADE: {ocorrenciaSelecionada.prioridade}</small>

                    <div className={styles.popupFooter}>
                      <button 
                        className={styles.btnConcluir}
                        onClick={() => handleMarcarConcluido(ocorrenciaSelecionada.id)}
                      >
                        Marcar como Concluído
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}