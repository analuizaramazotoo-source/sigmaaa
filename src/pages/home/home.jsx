import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

import prefeituraLogo from "../../assets/prefeitura.png";
import arvoreLogo from "../../assets/arvore.png";

import { 
  MapPin, 
  ClipboardList, 
  FileText, 
  BarChart2, 
  BookOpen, 
  Users, 
  LogOut, 
  Bell, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const modulos = [
    {
      id: "geoprocessamento",
      titulo: "Geoprocessamento",
      descricao: "Mapeamento espacial, mapas de calor e análise de áreas ambientais.",
      icon: <MapPin size={26} />,
      rota: "/geoprocessamento",
      badge: "GIS"
    },
    {
      id: "fila",
      titulo: "Fila de Fiscalização",
      descricao: "Ocorrências e denúncias pendentes para vistoria de campo.",
      icon: <ClipboardList size={26} />,
      rota: "/fila-fiscalizacao",
      badge: "Prioritário"
    },
    {
      id: "autos",
      titulo: "Autos e Notificações",
      descricao: "Emissão e consulta de autos de infração e advertências fiscais.",
      icon: <FileText size={26} />,
      rota: "/autos-notificacoes",
      badge: "Documentos"
    },
    {
      id: "relatorios",
      titulo: "Relatórios Técnicos",
      descricao: "Indicadores operacionais, consolidados estatísticos e exportação.",
      icon: <BarChart2 size={26} />,
      rota: "/relatorios-tecnicos",
      badge: "Métricas"
    },
    {
      id: "legislacao",
      titulo: "Biblioteca de Legislação",
      descricao: "Consulta a leis municipais, decretos e instrução normativa.",
      icon: <BookOpen size={26} />,
      rota: "/legislacao",
      badge: "Base Legal"
    }
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <img src={arvoreLogo} alt="Logo Meio Ambiente" className={styles.brandImg} />
          </div>
          <div className={styles.brandText}>
            <strong>GESTÃO AMBIENTAL</strong>
            <span>PAINEL OPERACIONAL</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <span className={styles.navCategory}>Módulos do Sistema</span>
          {modulos.map(item => (
            <button 
              key={item.id} 
              className={styles.navItem} 
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
            <h1 className={styles.headerTitle}>Painel de Controle</h1>
            <span className={styles.headerSubtitle}>Bem-vindo ao Sistema de Fiscalização e Gestão Ambiental</span>
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
                <strong className={styles.userName}>Fiscal de Serviço</strong>
                <span className={styles.userRole}>Equipe de Campo</span>
              </div>
            </div>

            <button 
              className={styles.btnLogout} 
              onClick={() => navigate("/")}
              title="Sair do Sistema"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          {/* BANNER */}
          <div className={styles.welcomeBanner}>
            <div className={styles.bannerInfo}>
              <div className={styles.bannerBadge}>
                <ShieldCheck size={20} /> Módulo Ativo
              </div>
              <h2>Operações Ambientais em Campo</h2>
              <p>Selecione um dos módulos abaixo para gerir ocorrências, emitir autos ou consultar a legislação ambiental vigente.</p>
            </div>
          </div>

          {/* CARDS DOS MÓDULOS */}
          <section className={styles.modulesSection}>
            <h3 className={styles.sectionTitle}>Selecione um Módulo</h3>
            <div className={styles.gridModules}>
              {modulos.map((modulo) => (
                <div 
                  key={modulo.id} 
                  className={styles.cardModulo} 
                  onClick={() => navigate(modulo.rota)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBadge}>
                      {modulo.icon}
                    </div>
                    <span className={styles.badgeLabel}>{modulo.badge}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{modulo.titulo}</h4>
                    <p className={styles.cardDesc}>{modulo.descricao}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span>Acessar Módulo</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}