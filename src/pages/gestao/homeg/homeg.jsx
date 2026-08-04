import React from 'react';
import styles from './homeg.module.css'; // <--- Atualizado para o teu nome de arquivo
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Phone, Bell, ChevronDown, Plus, ClipboardCheck, 
  Clock, Settings, CheckCircle2, Filter, Trash2, Flame, 
  Droplet, Volume2, Leaf
} from 'lucide-react';

export default function Homeg() { // <--- Nome do componente atualizado
  const stats = [
    { title: "Total de Ocorrências", value: "124", subtitle: "Todas as ocorrências registradas", icon: <ClipboardCheck size={24} className={styles.iconGreen} /> },
    { title: "Em Análise", value: "18", subtitle: "Aguardando avaliação", icon: <Clock size={24} className={styles.iconYellow} /> },
    { title: "Em Andamento", value: "89", subtitle: "Ações em andamento", icon: <Settings size={24} className={styles.iconGreen} /> },
    { title: "Resolvidas", value: "17", subtitle: "Ocorrências finalizadas", icon: <CheckCircle2 size={24} className={styles.iconLightGreen} /> },
  ];

  const solicitacoes = [
    { id: 1, title: "Descarte irregular de lixo", address: "Rua das Flores, 123 - Centro", date: "12/06/2025", status: "Em andamento", statusClass: styles.tagAndamento, icon: <Trash2 size={20} /> },
    { id: 2, title: "Queimada", address: "Av. Brasil, 456 - Jardim Novo", date: "08/06/2025", status: "Em análise", statusClass: styles.tagAnalise, icon: <Flame size={20} /> },
    { id: 3, title: "Poluição de água", address: "Rio das Pedras, sn - Centro", date: "02/06/2025", status: "Resolvida", statusClass: styles.tagResolvida, icon: <Droplet size={20} /> },
    { id: 4, title: "Poluição sonora", address: "Rua da Paz, 78 - Vila Esperança", date: "28/05/2025", status: "Não atendida", statusClass: styles.tagNaoAtendida, icon: <Volume2 size={20} /> },
  ];

  return (
    <div className={styles.container}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Leaf size={32} />
          <div>
            <strong>CADASTRO</strong>
            <span>SEGURO AMBIENTAL</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.active}><Home size={20} /> Dashboard</a>
          <a href="#"><MapIcon size={20} /> Mapa</a>
          <a href="#"><ClipboardList size={20} /> Ocorrências</a>
          <a href="#"><FileText size={20} /> Minhas Solicitações</a>
          <a href="#"><BarChart2 size={20} /> Relatórios</a>
          <a href="#"><HelpCircle size={20} /> Orientações</a>
          <a href="#"><Phone size={20} /> Contato</a>
        </nav>

        <div className={styles.helpCard}>
          <div className={styles.helpIcon}><Phone size={20} /></div>
          <div>
            <strong>Precisa de ajuda?</strong>
            <p>Fale conosco</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn}>☰</button>
            <div className={styles.headerTitles}>
              <h1>Cadastro Seguro Ambiental</h1>
              <p>Secretaria do Meio Ambiente</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notification}>
              <Bell size={20} />
              <span className={styles.badge}>3</span>
            </div>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>AL</div>
              <div className={styles.userInfo}>
                <strong>Ana Luiza</strong>
                <span>Cidadão</span>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className={styles.dashboardBody}>
          <div className={styles.welcomeSection}>
            <div>
              <h2>Olá, Ana Luiza!</h2>
              <p>Acompanhe suas solicitações e ajude a construir uma cidade mais sustentável.</p>
            </div>
            <button className={styles.primaryBtn}>
              <Plus size={20} /> Nova Ocorrência
            </button>
          </div>

          {/* STATS CARDS */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIconWrapper}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <p>{stat.title}</p>
                  <h3>{stat.value}</h3>
                  <span>{stat.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          {/* MAP & LIST GRID */}
          <div className={styles.mapAndList}>
            {/* MAP SECTION */}
            <div className={styles.mapSection}>
              <div className={styles.sectionHeader}>
                <h3>Mapa de Ocorrências</h3>
                <button className={styles.filterBtn}><Filter size={16} /> Filtrar</button>
              </div>
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>Mapa Mockup (Adicione a imagem ou API aqui)</div>
                <div className={styles.mapLegend}>
                  <strong>Legenda</strong>
                  <ul>
                    <li><span className={styles.dotYellow}></span> Em análise</li>
                    <li><span className={styles.dotGreen}></span> Em andamento</li>
                    <li><span className={styles.dotLightGreen}></span> Resolvida</li>
                    <li><span className={styles.dotRed}></span> Não atendida</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* LIST SECTION */}
            <div className={styles.listSection}>
              <div className={styles.sectionHeader}>
                <h3>Minhas Solicitações</h3>
                <a href="#" className={styles.linkVerTodas}>Ver todas</a>
              </div>
              <div className={styles.list}>
                {solicitacoes.map((item) => (
                  <div key={item.id} className={styles.listItem}>
                    <div className={styles.itemIcon}>{item.icon}</div>
                    <div className={styles.itemInfo}>
                      <strong>{item.title}</strong>
                      <p>{item.address}</p>
                    </div>
                    <div className={styles.itemMeta}>
                      <span className={styles.date}>{item.date}</span>
                      <span className={`${styles.tag} ${item.statusClass}`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM BANNER */}
          <div className={styles.bottomBanner}>
            <div className={styles.bannerContent}>
              <Leaf size={32} className={styles.iconGreen} />
              <div>
                <strong>Sua participação faz a diferença!</strong>
                <p>Cada ocorrência registrada ajuda a construção de uma cidade mais limpa, segura e sustentável para todos.</p>
              </div>
            </div>
            <button className={styles.primaryBtn}>Saiba mais</button>
          </div>

          {/* FOOTER */}
          <footer className={styles.footer}>
            <p>© 2025 Secretaria do Meio Ambiente. Todos os direitos reservados.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}