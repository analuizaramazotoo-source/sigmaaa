import React from 'react';
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
  LogOut, 
  Bell, 
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

  // DADOS DA EQUIPE E INTEGRANTES
  const dadosEquipe = {
    codigoEquipe: 'EQP-ALPHA-01',
    nomeEquipe: 'Equipe Alpha 01 - Setor Urbano',
    status: 'Em Operação',
    turno: 'Diurno (07:30 - 17:00)',
    membros: [
      {
        id: 1,
        nome: 'Carlos Eduardo Santos',
        cargo: 'Fiscal Ambiental Líder',
        matricula: 'MAT-48.201',
        email: 'carlos.santos@prefeitura.gov.br',
        telefone: '(14) 99876-5432',
        lider: true
      },
      {
        id: 2,
        nome: 'Mariana Lima e Silva',
        cargo: 'Fiscal Ambiental',
        matricula: 'MAT-51.109',
        email: 'mariana.silva@prefeitura.gov.br',
        telefone: '(14) 99765-4321',
        lider: false
      },
      {
        id: 3,
        nome: 'Roberto Rocha',
        cargo: 'Técnico em Meio Ambiente',
        matricula: 'MAT-39.882',
        email: 'roberto.rocha@prefeitura.gov.br',
        telefone: '(14) 99654-3210',
        lider: false
      }
    ]
  };

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
            <h1 className={styles.headerTitle}>Perfil da Equipe</h1>
            <span className={styles.headerSubtitle}>Informações do grupo, código de identificação e integrantes</span>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} title="Notificações">
              <Bell size={20} />
            </button>

            <div className={styles.userProfileActive}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe Alpha 01</strong>
                <span className={styles.userRole}>Perfil do Grupo</span>
              </div>
            </div>

            <button className={styles.btnLogout} onClick={() => navigate('/')} title="Sair do Sistema">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            
            {/* PAINEL SUPERIOR/ESQUERDO: CARTÃO DE IDENTIFICAÇÃO DA EQUIPE */}
            <section className={styles.teamCardSection}>
              <div className={styles.teamCardHeader}>
                <div className={styles.codeBadge}>
                  <Shield size={20} />
                  <span>CÓDIGO: {dadosEquipe.codigoEquipe}</span>
                </div>
                <h2>{dadosEquipe.nomeEquipe}</h2>
              </div>

              <div className={styles.teamStatsGrid}>
                <div className={styles.statBox}>
                  <Radio size={18} className={styles.statIcon} />
                  <div>
                    <span>Status Operacional</span>
                    <strong>{dadosEquipe.status}</strong>
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
                <span className={styles.subBadge}>● Equipe Sincronizada</span>
              </div>

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