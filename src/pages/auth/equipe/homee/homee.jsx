import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './homee.module.css';

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
  AlertTriangle, 
  Navigation,
  CheckCircle2,
  Clock,
  Filter,
  Layers
} from 'lucide-react';

export default function HomeE() {
  const navigate = useNavigate();

  // Simulação das ocorrências sincronizadas em tempo real vindas do Módulo da Gestão
  const [ocorrenciasGestao, setOcorrenciasGestao] = useState([
    {
      id: 1,
      titulo: 'Descarte Irregular de Entulho',
      endereco: 'Rua das Palmeiras, 142 - Centro',
      prioridade: 'Alta',
      status: 'Pendente',
      data: 'Hoje, 10:30',
      lat: -22.356,
      lng: -50.512
    },
    {
      id: 2,
      titulo: 'Corte Não Autorizado de Árvore',
      endereco: 'Av. Tamoios, 890 - Jardim Unesp',
      prioridade: 'Urgente',
      status: 'Em Andamento',
      data: 'Hoje, 09:15',
      lat: -22.361,
      lng: -50.505
    },
    {
      id: 3,
      titulo: 'Queimada Urbana / Fumaça',
      endereco: 'Rua Caingangs, 45 - Vila Vargas',
      prioridade: 'Média',
      status: 'Pendente',
      data: 'Ontem, 16:40',
      lat: -22.348,
      lng: -50.518
    }
  ]);

  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(ocorrenciasGestao[0]);

  const menuModulos = [
    { id: 'mapa', titulo: 'Mapa de Ocorrências', icon: <MapPin size={22} />, rota: '/homee', ativo: true },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/fila-fiscalizacao' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autos-notificacoes' },
    { id: 'relatorios', titulo: 'Relatórios de Campo', icon: <BarChart2 size={22} />, rota: '/relatorios-tecnicos' },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/legislacao' }
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR (MESMO PADRÃO DA HOMEG) */}
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
          <span className={styles.navCategory}>Menu do Fiscal</span>
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
            <h1 className={styles.headerTitle}>Mapa de Ocorrências e Vistorias</h1>
            <span className={styles.headerSubtitle}>Pontos demarcados em tempo real pela Coordenação / Gestão</span>
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
                <strong className={styles.userName}>Equipe Alpha 01</strong>
                <span className={styles.userRole}>Fiscalização Externa</span>
              </div>
            </div>

            <button 
              className={styles.btnLogout} 
              onClick={() => navigate('/')}
              title="Sair do Sistema"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.mapGridContainer}>
            {/* PAINEL LATERAL DE OCORRÊNCIAS */}
            <section className={styles.listSection}>
              <div className={styles.listHeader}>
                <h3>Ocorrências Marcadas ({ocorrenciasGestao.length})</h3>
                <span className={styles.liveBadge}>● Sincronizado com a Gestão</span>
              </div>

              <div className={styles.ocorrenciasList}>
                {ocorrenciasGestao.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${styles.cardOcorrencia} ${ocorrenciaSelecionada?.id === item.id ? styles.cardSelected : ''}`}
                    onClick={() => setOcorrenciaSelecionada(item)}
                  >
                    <div className={styles.cardHeaderTop}>
                      <span className={`${styles.badgePrioridade} ${styles[item.prioridade.toLowerCase()]}`}>
                        {item.prioridade}
                      </span>
                      <span className={styles.timeText}><Clock size={12} /> {item.data}</span>
                    </div>

                    <h4 className={styles.ocorrenciaTitle}>{item.titulo}</h4>
                    <p className={styles.ocorrenciaAddr}><Navigation size={14} /> {item.endereco}</p>

                    <div className={styles.cardFooterInfo}>
                      <span className={styles.statusLabel}>
                        <CheckCircle2 size={14} /> {item.status}
                      </span>
                      <button className={styles.btnVerDetalhes}>
                        Ver no mapa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ÁREA DO MAPA */}
            <section className={styles.mapSection}>
              <div className={styles.mapControlsHeader}>
                <div className={styles.controlGroup}>
                  <button className={styles.mapBtnActive}><Layers size={16} /> Satélite / Vias</button>
                  <button className={styles.mapBtn}><Filter size={16} /> Filtrar Urgentes</button>
                </div>
                {ocorrenciaSelecionada && (
                  <div className={styles.selectedLocationTag}>
                    <MapPin size={16} /> Selecionado: <strong>{ocorrenciaSelecionada.titulo}</strong>
                  </div>
                )}
              </div>

              {/* SIMULAÇÃO DA INTERFACE DO MAPA */}
              <div className={styles.mapCanvas}>
                <div className={styles.mapOverlayInfo}>
                  <p>📍 Marcadores inseridos pelo módulo da <strong>Gestão</strong> são refletidos automaticamente neste mapa.</p>
                </div>

                {/* PIN DE EXEMPLE NO MAPA */}
                {ocorrenciasGestao.map((ponto, idx) => (
                  <div 
                    key={ponto.id}
                    className={`${styles.mapPin} ${styles['pin' + (idx + 1)]} ${ocorrenciaSelecionada?.id === ponto.id ? styles.pinActive : ''}`}
                    onClick={() => setOcorrenciaSelecionada(ponto)}
                    title={ponto.titulo}
                  >
                    <div className={styles.pinIcon}>
                      <AlertTriangle size={16} />
                    </div>
                    <div className={styles.pinTooltip}>
                      <strong>{ponto.titulo}</strong>
                      <span>{ponto.endereco}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}