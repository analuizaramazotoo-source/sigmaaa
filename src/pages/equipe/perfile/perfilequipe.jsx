import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { api } from '../../../services/originalScreens';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './perfilequipe.module.css';

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
  ArrowLeft,
  Shield,
  Mail,
  Phone,
  User,
  Radio,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function PerfilEquipe() {
  const navigate = useNavigate();

  const [consulta, setConsulta] = useState({ loading: true, error: '' });
  // DADOS DA EQUIPE E INTEGRANTES
  const [dadosEquipe, setDadosEquipe] = useState({ codigoEquipe: '', nomeEquipe: 'Nenhuma equipe vinculada', status: '', turno: 'Não informado', membros: [] });
  useEffect(() => {
    let active = true;
    api('/equipes/minha').then(equipe => {
      if (!active) return;
      if (equipe) setDadosEquipe({ codigoEquipe: `EQP-${equipe.id_equipe}`, nomeEquipe: equipe.nome_equipe, status: equipe.status_equipe, turno: 'Não informado', membros: equipe.membros.map(m => ({ id: m.id_membro, nome: m.nome_usuario, cargo: m.funcao_na_equipe || '', matricula: m.matricula_usuario || '', email: m.email_usuario, telefone: m.telefone_usuario || '', lider: /líder|lider|encarregado/i.test(m.funcao_na_equipe || '') })) });
      setConsulta({ loading: false, error: '' });
    }).catch(error => { if (active) setConsulta({ loading: false, error: error.message }); });
    return () => { active = false; };
  }, []);

  const nomeEquipe = consulta.loading ? 'Carregando equipe...' : consulta.error ? 'Equipe indisponível' : dadosEquipe.nomeEquipe;

  // MENU LATERAL
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe'},
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/leise' },
    { id: 'perfil', titulo: 'Perfil da Equipe', icon: <Users size={22} />, rota: '/perfile',  ativo: true  },
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR PADRÃO */}
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
            <h1 className={styles.headerTitle}>Perfil da Equipe</h1>
            <span className={styles.headerSubtitle}>Informações do grupo, código de identificação e integrantes</span>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.userProfileActive}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>{nomeEquipe}</strong>
                <span className={styles.userRole}>Perfil do Grupo</span>
              </div>
            </div>

            <button type="button" className={styles.btnVoltar} onClick={() => navigate('/homee')}>
              <ArrowLeft size={16} aria-hidden="true" /> Voltar
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            
            {/* PAINEL SUPERIOR/ESQUERDO: CARTÃO DE IDENTIFICAÇÃO DA EQUIPE */}
            <section className={styles.teamCardSection}>
              <div className={styles.teamCardHeader}>
                {dadosEquipe.codigoEquipe && <div className={styles.codeBadge}>
                  <Shield size={20} />
                  <span>CÓDIGO: {dadosEquipe.codigoEquipe}</span>
                </div>}
                <h2>{nomeEquipe}</h2>
                {!consulta.loading && !dadosEquipe.codigoEquipe && <p role={consulta.error ? 'alert' : 'status'}>{consulta.error || 'Peça à gestão para vincular sua conta em Configurações → Equipes e integrantes. Suas vistorias aparecerão após o encaminhamento ao grupo.'}</p>}
              </div>

              <div className={styles.teamStatsGrid}>
                <div className={styles.statBox}>
                  <Radio size={18} className={styles.statIcon} />
                  <div>
                    <span>Status Operacional</span>
                    <strong>{({ disponivel: 'Disponível', em_campo: 'Em campo', ocupada: 'Ocupada', inativa: 'Inativa' })[dadosEquipe.status] || 'Não informado'}</strong>
                  </div>
                </div>

                <div className={styles.statBox}>
                  <Calendar size={18} className={styles.statIcon} />
                  <div>
                    <span>Turno de Trabalho</span>
                    <strong>{dadosEquipe.turno}</strong>
                  </div>
                </div>

                <div className={styles.statBox}>
                  <Users size={18} className={styles.statIcon} />
                  <div>
                    <span>Total de Membros</span>
                    <strong>{dadosEquipe.membros.length} Servidores</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* PAINEL DE INTEGRANTES */}
            <section className={styles.membrosSection}>
              <div className={styles.sectionHeader}>
                <h3><Users size={18} /> Integrantes da Equipe</h3>
                {dadosEquipe.codigoEquipe && <span className={styles.subBadge}>● Equipe sincronizada</span>}
              </div>

              {!consulta.loading && dadosEquipe.membros.length === 0 && <p>{dadosEquipe.codigoEquipe ? 'Nenhum integrante cadastrado nesta equipe.' : 'Não há integrantes para exibir sem uma equipe vinculada.'}</p>}
              <div className={styles.membrosGrid}>
                {dadosEquipe.membros.map((membro) => (
                  <div key={membro.id} className={styles.cardMembro}>
                    <div className={styles.membroHeader}>
                      <div className={styles.avatarCircle}>
                        <User size={22} />
                      </div>
                      <div>
                        <h4>{membro.nome}</h4>
                        <span className={styles.cargoText}>{membro.cargo}</span>
                      </div>
                      {membro.lider && (
                        <span className={styles.liderBadge}>
                          <CheckCircle2 size={12} /> Líder
                        </span>
                      )}
                    </div>

                    <div className={styles.membroDetails}>
                      <div className={styles.detailItem}>
                        <Shield size={14} />
                        <span>Matrícula: <strong>{membro.matricula}</strong></span>
                      </div>
                      <div className={styles.detailItem}>
                        <Mail size={14} />
                        <span>{membro.email}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Phone size={14} />
                        <span>{membro.telefone}</span>
                      </div>
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
