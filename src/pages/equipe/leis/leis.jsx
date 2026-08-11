import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './leis.module.css';

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
  Search,
  Download,
  BookMarked,
  Scale,
  ExternalLink,
  ChevronRight,
  FileCheck,
  ArrowLeft
} from 'lucide-react';

export default function Leis() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('todas');

  // BASE DE DADOS DE LEIS E NORMAS
  const [leis] = useState([
    {
      id: 1,
      titulo: 'Lei Nº 9.605/1998 - Lei de Crimes Ambientais',
      esfera: 'Federal',
      categoria: 'crimes',
      resumo: 'Dispõe sobre as sanções penais e administrativas derivadas de condutas e atividades lesivas ao meio ambiente.',
      artigosChave: ['Art. 70 - Das Infrações Administrativas', 'Art. 54 - Causal de Poluição', 'Art. 38 - Destruição de Floresta'],
      data: '12/02/1998'
    },
    {
      id: 2,
      titulo: 'Lei Municipal Nº 4.210/2021 - Código Ambiental do Município',
      esfera: 'Municipal',
      categoria: 'codigo',
      resumo: 'Institui o Código Ambiental Municipal, regulamentando o licenciamento, fiscalização e penalidades ambientais.',
      artigosChave: ['Art. 12 - Da Autorização para Poda/Corte', 'Art. 45 - Do Descarte Irregular de Resíduos'],
      data: '18/05/2021'
    },
    {
      id: 3,
      titulo: 'Decreto Municipal Nº 1.890/2023 - Queimadas e Controle de Fumaça',
      esfera: 'Municipal',
      categoria: 'queimadas',
      resumo: 'Proíbe a realização de queimadas na zona urbana e estabelece multa progressiva em períodos de estiagem.',
      artigosChave: ['Art. 3º - Das Proibições de Queimada em Lotes Vagos', 'Art. 8º - Da Notificação Imediata'],
      data: '10/08/2023'
    },
    {
      id: 4,
      titulo: 'Instrução Normativa SMA Nº 04/2024 - Padrões de Emissão Sonora',
      esfera: 'Municipal',
      categoria: 'ruido',
      resumo: 'Estipula os limites máximos permissíveis de ruídos em zonas residenciais e comerciais conforme horário.',
      artigosChave: ['Tabela I - Limites de Decibéis (dB)', 'Art. 5º - Do Equipamento de Medição (Decibelímetro)'],
      data: '15/01/2024'
    }
  ]);

  const [leiSelecionada, setLeiSelecionada] = useState(leis[0]);

  // FILTRAGEM DE LEIS
  const leisFiltradas = leis.filter(lei => {
    const atendeBusca = lei.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                        lei.resumo.toLowerCase().includes(busca.toLowerCase());

    if (categoria === 'todas') return atendeBusca;
    return atendeBusca && lei.categoria === categoria;
  });

  // MENU LATERAL PADRONIZADO DA EQUIPE
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe' },
    { id: 'leis', titulo: 'Leis', icon: <BookOpen size={22} />, rota: '/leise', ativo: true }
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR PADRÃO DA EQUIPE */}
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
            <h1 className={styles.headerTitle}>Leis</h1>
            <span className={styles.headerSubtitle}>Base normativa e legal para embasamento de ações de fiscalização</span>
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

            <button className={styles.btnLogout} onClick={() => navigate('/login')} title="Sair do Sistema">
              <LogOut size={18} />
            </button>

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
            
            {/* PAINEL ESQUERDO: BUSCA E LISTA DE LEIS */}
            <section className={styles.listCardSection}>
              
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Pesquisar por artigo, assunto ou número da lei..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <div className={styles.categoryFilter}>
                <button 
                  className={categoria === 'todas' ? styles.chipActive : styles.chip} 
                  onClick={() => setCategoria('todas')}
                >
                  Todas
                </button>
                <button 
                  className={categoria === 'crimes' ? styles.chipActive : styles.chip} 
                  onClick={() => setCategoria('crimes')}
                >
                  Federal
                </button>
                <button 
                  className={categoria === 'codigo' ? styles.chipActive : styles.chip} 
                  onClick={() => setCategoria('codigo')}
                >
                  Código Municipal
                </button>
                <button 
                  className={categoria === 'queimadas' ? styles.chipActive : styles.chip} 
                  onClick={() => setCategoria('queimadas')}
                >
                  Queimadas
                </button>
              </div>

              <div className={styles.leisList}>
                {leisFiltradas.map((lei) => (
                  <div 
                    key={lei.id} 
                    className={`${styles.cardLei} ${leiSelecionada?.id === lei.id ? styles.cardSelected : ''}`}
                    onClick={() => setLeiSelecionada(lei)}
                  >
                    <div className={styles.cardHeaderTop}>
                      <span className={`${styles.badgeEsfera} ${lei.esfera === 'Federal' ? styles.badgeFederal : styles.badgeMunicipal}`}>
                        {lei.esfera}
                      </span>
                      <small>{lei.data}</small>
                    </div>

                    <h4 className={styles.leiTitulo}>{lei.titulo}</h4>
                    <p className={styles.leiResumo}>{lei.resumo}</p>

                    <div className={styles.cardFooter}>
                      <span>Ver detalhes legais</span>
                      <ChevronRight size={16} className={styles.arrowIcon} />
                    </div>
                  </div>
                ))}
              </div>

            </section>

            {/* PAINEL DIREITO: DETALHAMENTO DA LEI SELECIONADA */}
            <section className={styles.detailCardSection}>
              {leiSelecionada ? (
                <div className={styles.detailContainer}>
                  <div className={styles.detailHeader}>
                    <div className={styles.badgeGroup}>
                      <span className={`${styles.badgeEsfera} ${leiSelecionada.esfera === 'Federal' ? styles.badgeFederal : styles.badgeMunicipal}`}>
                        {leiSelecionada.esfera}
                      </span>
                      <small>Publicado em: {leiSelecionada.data}</small>
                    </div>
                    <h2>{leiSelecionada.titulo}</h2>
                  </div>

                  <div className={styles.detailBody}>
                    <div className={styles.infoBox}>
                      <strong>SÍNTESE EXECUTIVA</strong>
                      <p>{leiSelecionada.resumo}</p>
                    </div>

                    <div className={styles.artigosSection}>
                      <h4><Scale size={16} /> Principais Dispositivos para Fiscalização</h4>
                      <ul className={styles.artigosList}>
                        {leiSelecionada.artigosChave.map((art, index) => (
                          <li key={index}>
                            <FileCheck size={16} className={styles.checkIcon} />
                            <span>{art}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.orientacaoBox}>
                      <BookMarked size={20} />
                      <div>
                        <strong>Instrução ao Fiscal</strong>
                        <p>Cite obrigatoriamente a fundamentação legal nos Autos de Infração ou Notificações preventivas para garantir a validade jurídica.</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.detailActions}>
                    <button className={styles.btnDownloadPdf} onClick={() => alert(`Baixando PDF completo de: ${leiSelecionada.titulo}`)}>
                      <Download size={16} /> Baixar PDF Íntegra
                    </button>
                    <button className={styles.btnAbrirDiario} onClick={() => alert('Direcionando para o Diário Oficial')}>
                      <ExternalLink size={16} /> Ver no Diário Oficial
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyDetail}>
                  <BookOpen size={48} />
                  <p>Selecione uma lei ou decreto no painel ao lado para visualizar a fundamentação legal.</p>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}