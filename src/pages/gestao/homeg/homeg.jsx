import React, { useState } from 'react';
import styles from './homeg.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Phone, Bell, ChevronDown, Plus, ClipboardCheck, 
  Clock, Settings, CheckCircle2, Filter, Trash2, Flame, 
  Droplet, Volume2, Leaf, Menu, X, Shield, ArrowUpRight
} from 'lucide-react';

const STATS_DATA = [
  { 
    id: 'total',
    title: "Total do Município", 
    value: "124", 
    subtitle: "Ocorrências no sistema", 
    icon: ClipboardCheck,
    variant: 'neutral'
  },
  { 
    id: 'analise',
    title: "Aguardando Triagem", 
    value: "18", 
    subtitle: "Requer análise do fiscal", 
    icon: Clock,
    variant: 'warning'
  },
  { 
    id: 'andamento',
    title: "Equipes em Campo", 
    value: "89", 
    subtitle: "Ações fiscais em curso", 
    icon: Settings,
    variant: 'info'
  },
  { 
    id: 'resolvidas',
    title: "Concluídas no Mês", 
    value: "17", 
    subtitle: "Demandas finalizadas", 
    icon: CheckCircle2,
    variant: 'success'
  },
];

const FILA_TRABALHO_DATA = [
  { 
    id: 1, 
    title: "Descarte irregular de lixo", 
    address: "Rua das Flores, 123 - Centro", 
    date: "12/06/2026", 
    status: "Em campo", 
    statusType: "andamento",
    icon: Trash2 
  },
  { 
    id: 2, 
    title: "Queimada urbana", 
    address: "Av. Brasil, 456 - Jardim Novo", 
    date: "08/06/2026", 
    status: "Pendente triagem", 
    statusType: "analise",
    icon: Flame 
  },
  { 
    id: 3, 
    title: "Poluição de recursos hídricos", 
    address: "Rio das Pedras, s/n - Centro", 
    date: "02/06/2026", 
    status: "Fiscalizado", 
    statusType: "resolvida",
    icon: Droplet 
  },
  { 
    id: 4, 
    title: "Poluição sonora comercial", 
    address: "Rua da Paz, 78 - Vila Esperança", 
    date: "28/05/2026", 
    status: "Arquivado", 
    statusType: "naoAtendida",
    icon: Volume2 
  },
];

export default function Homeg() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.appContainer}>
      {sidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setSidebarOpen(false)} 
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR OPERACIONAL */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <Shield size={24} />
          </div>
          <div className={styles.brandText}>
            <strong>SISTEMA DE GESTÃO</strong>
            <span>MUNICIPAL AMBIENTAL</span>
          </div>
          <button 
            className={styles.closeMenuBtn} 
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.navigation}>
          <a href="#" className={styles.navItemActive}><Home size={18} /> Painel Geral</a>
          <a href="#" className={styles.navItem}><MapIcon size={18} /> Geoprocessamento</a>
          <a href="#" className={styles.navItem}><ClipboardList size={18} /> Fila de Fiscalização</a>
          <a href="#" className={styles.navItem}><FileText size={18} /> Autos e Notificações</a>
          <a href="#" className={styles.navItem}><BarChart2 size={18} /> Relatórios Técnicos</a>
          <a href="#" className={styles.navItem}><HelpCircle size={18} /> Legislação</a>
          <a href="#" className={styles.navItem}><Phone size={18} /> Suporte Interno</a>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.helpCard}>
            <div className={styles.helpIconWrapper}>
              <Phone size={18} />
            </div>
            <div className={styles.helpInfo}>
              <strong>Plantão de Fiscalização</strong>
              <p>Ramal 1920</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.hamburgerBtn} 
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className={styles.headerTitle}>Módulo Operacional de Gestão</h1>
              <span className={styles.headerSubtitle}>Secretaria Municipal do Meio Ambiente</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconButton} aria-label="Notificações Internas">
              <Bell size={18} />
              <span className={styles.badge}>5</span>
            </button>

            <div className={styles.dividerVertical} />

            <button className={styles.userDropdown}>
              <div className={styles.avatar}>AL</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Ana Luiza Silva</span>
                <span className={styles.userRole}>Fiscal Ambiental • Mat. 48.201</span>
              </div>
              <ChevronDown size={16} className={styles.dropdownIcon} />
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          {/* BANNER BOAS-VINDAS INTERNO */}
          <section className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
              <h2>Painel de Controle - Fiscalização</h2>
              <p>Há 18 ocorrências aguardando triagem técnica na sua região de cobertura.</p>
            </div>
            <button className={styles.btnPrimary}>
              <Plus size={18} /> Novo Registro Interno
            </button>
          </section>

          {/* ESTATÍSTICAS */}
          <section className={styles.statsGrid}>
            {STATS_DATA.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.id} className={styles.statCard}>
                  <div className={`${styles.statIcon} ${styles[`statIcon_${stat.variant}`]}`}>
                    <IconComponent size={22} />
                  </div>
                  <div className={styles.statData}>
                    <span className={styles.statTitle}>{stat.title}</span>
                    <strong className={styles.statValue}>{stat.value}</strong>
                    <span className={styles.statSubtitle}>{stat.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* GRID: MAPA DE FISCALIZAÇÃO E FILA DE TRABALHO */}
          <section className={styles.contentGrid}>
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Geoprocessamento e Chamados</h3>
                <button className={styles.btnSecondary}>
                  <Filter size={16} /> Filtrar por Setor
                </button>
              </div>

              <div className={styles.mapWrapper}>
                <div className={styles.mapPlaceholder}>
                  <MapIcon size={56} className={styles.mapPlaceholderIcon} />
                  <p>Mapa Tático de Ocorrências e Rotas de Fiscalização</p>
                </div>

                <div className={styles.mapLegend}>
                  <span className={styles.legendTitle}>Status das Ações:</span>
                  <div className={styles.legendItems}>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotWarning}`} /> Pendente triagem</span>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotInfo}`} /> Equipe em campo</span>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotSuccess}`} /> Vistoriado/Concluído</span>
                    <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotDanger}`} /> Arquivado/Improcedente</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Fila de Triagem e Despacho</h3>
                <a href="#" className={styles.linkAction}>Ver fila completa <ArrowUpRight size={14} /></a>
              </div>

              <div className={styles.requestsList}>
                {FILA_TRABALHO_DATA.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.id} className={styles.requestCard}>
                      <div className={styles.requestIcon}>
                        <ItemIcon size={18} />
                      </div>
                      <div className={styles.requestBody}>
                        <strong className={styles.requestTitle}>{item.title}</strong>
                        <p className={styles.requestAddress}>{item.address}</p>
                      </div>
                      <div className={styles.requestMeta}>
                        <span className={styles.requestDate}>{item.date}</span>
                        <span className={`${styles.badgeStatus} ${styles[`status_${item.statusType}`]}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* INFORMATIVO OPERACIONAL */}
          <section className={styles.infoBanner}>
            <div className={styles.infoContent}>
              <div className={styles.infoIcon}>
                <Leaf size={24} />
              </div>
              <div>
                <strong>Atenção: Atualização no Protocolo de Vistoria de Queimadas</strong>
                <p>Consulte as novas diretrizes normativas no módulo de Legislação antes do despacho de equipes.</p>
              </div>
            </div>
            <button className={styles.btnOutline}>Acessar Diretrizes</button>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>
    </div>
  );
}