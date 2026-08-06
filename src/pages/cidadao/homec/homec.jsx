import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./homec.module.css";

// Ícones para o menu lateral e a página
import {
  FileWarning,
  MapPin,
  Search,
  AlertTriangle,
  HelpCircle,
  LayoutDashboard,
  FileText,
  User,
  Phone,
  AlertCircle
} from "lucide-react";

import bannerFundo from "../../../assets/banner.png";

const duvidasFrequentes = [
  "Como denunciar lixo irregular?",
  "Quanto tempo demora para resolver?",
  "Posso enviar fotos do problema?",
  "Como acompanhar minha solicitação?",
];

export default function Homec() {
  const navigate = useNavigate();
  const location = useLocation();

  // Função para checar rota ativa no menu
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.layoutContainer || "layoutContainer"}>
      
      {/* SIDEBAR EMBUTIDA DIRETO NA PÁGINA */}
      <aside className={styles.sidebar || "sidebar"}>
        <div className={styles.sidebarHeader || "sidebarHeader"}>
          <span className={styles.logoIcon || "logoIcon"}>🌱</span>
          <div className={styles.logoText || "logoText"}>
            <h2>CADASTRO</h2>
            <p>SEGURO AMBIENTAL</p>
          </div>
        </div>

        <nav className={styles.navMenu || "navMenu"}>
          {/* DASHBOARD */}
          <Link
            to="/cidadao"
            className={`${styles.navItem} ${isActive("/cidadao") ? styles.active : ""}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          {/* OCORRÊNCIAS / RELATAR */}
          <Link
            to="/relatar-problema"
            className={`${styles.navItem} ${isActive("/relatar-problema") ? styles.active : ""}`}
          >
            <AlertTriangle size={20} />
            <span>Relatar Problema</span>
          </Link>

          {/* SOLICITAR SERVIÇO */}
          <Link
            to="/solicitar"
            className={`${styles.navItem} ${isActive("/solicitar") ? styles.active : ""}`}
          >
            <FileText size={20} />
            <span>Solicitar Serviço</span>
          </Link>

          {/* MINHAS SOLICITAÇÕES / STATUS */}
          <Link
            to="/status"
            className={`${styles.navItem} ${isActive("/status") ? styles.active : ""}`}
          >
            <FileText size={20} />
            <span>Minhas Solicitações</span>
          </Link>

          {/* DENÚNCIA URGENTE */}
          <Link
            to="/denuncia"
            className={`${styles.navItem} ${isActive("/denuncia") ? styles.active : ""}`}
          >
            <AlertCircle size={20} />
            <span>Denúncia Urgente</span>
          </Link>

          {/* PERFIL */}
          <Link
            to="/perfil"
            className={`${styles.navItem} ${isActive("/perfil") ? styles.active : ""}`}
          >
            <User size={20} />
            <span>Perfil</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter || "sidebarFooter"}>
          <div className={styles.ajudaCard || "ajudaCard"}>
            <Phone size={18} />
            <div>
              <strong>Precisa de ajuda?</strong>
              <p>Fale conosco</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainWrapper || "mainWrapper"}>
        <div className={styles.pageContainer}>
          
          {/* BANNER PRINCIPAL */}
          <section
            className={styles.banner}
            style={{ backgroundImage: `url(${bannerFundo})` }}
          >
            <div className={styles.overlayBanner}>
              <h1>Bem-vindo!</h1>
              <p>Colabore com o Meio Ambiente!</p>
            </div>
          </section>

          {/* CARDS DE AÇÃO RÁPIDA */}
          <section className={styles.cardsContainer}>
            <div className={`${styles.card} ${styles.cardAzul}`}>
              <div className={styles.cardIcon}><FileWarning size={28} /></div>
              <h2>Relatar um Problema</h2>
              <p>Utilize este espaço para descrever detalhadamente qualquer problema encontrado.</p>
              <Link to="/relatar-problema" className={styles.cardBtn}>ENVIAR RELATO</Link>
            </div>

            <div className={`${styles.card} ${styles.cardVerde}`}>
              <div className={styles.cardIcon}><MapPin size={28} /></div>
              <h2>Solicitar Serviço</h2>
              <p>Faça solicitações ambientais e acompanhe todo o andamento.</p>
              <Link to="/solicitar" className={styles.cardBtn}>PREENCHER SOLICITAÇÃO</Link>
            </div>

            <div className={`${styles.card} ${styles.cardLaranja}`}>
              <div className={styles.cardIcon}><Search size={28} /></div>
              <h2>Acompanhar Solicitação</h2>
              <p>Consulte o andamento das suas solicitações em tempo real.</p>
              <Link to="/status" className={styles.cardBtn}>MINHAS SOLICITAÇÕES</Link>
            </div>
          </section>

          {/* ÁREA INFERIOR: EMERGÊNCIA E FAQ */}
          <div className={styles.bottomGrid}>
            
            {/* DENÚNCIA URGENTE */}
            <div className={styles.cardUrgente}>
              <div className={styles.cardUrgenteHeader}>
                <AlertTriangle size={24} />
                <h3>Denúncia Urgente</h3>
              </div>
              <p>EM CASO DE EMERGÊNCIAS AMBIENTAIS, FAÇA UMA DENÚNCIA RÁPIDA.</p>
              <button
                className={styles.btnEmergencia}
                onClick={() => navigate("/denuncia")}
              >
                RELATAR EMERGÊNCIA
              </button>
            </div>

            {/* DÚVIDAS FREQUENTES */}
            <div className={styles.cardDuvidas}>
              <div className={styles.cardDuvidasHeader}>
                <HelpCircle size={24} />
                <h3>Dúvidas Frequentes</h3>
              </div>
              <div className={styles.listaDuvidas}>
                {duvidasFrequentes.map((duvida, index) => (
                  <button key={index} className={styles.itemDuvida}>
                    {duvida}
                  </button>
                ))}
              </div>
              <button className={styles.btnVerTodas}>Ver todas as perguntas</button>
            </div>

          </div>

          {/* RODAPÉ ESPECÍFICO DA PÁGINA */}
          <footer className={styles.footer}>
            <div className={styles.footerColuna}>
              <h4>Prefeitura do Meio Ambiente</h4>
              <p>Rua Verde, 123, Centro, Cidade - UF</p>
              <p>Atendimento: Segunda a Sexta, 8h - 17h</p>
              <p>email@meioambiente.gov.br</p>
              <p>(00) 1234-5678</p>
            </div>

            <div className={styles.footerColuna}>
              <h4>Sobre</h4>
              <a href="#">Política Ambiental</a>
              <a href="#">Contato</a>
            </div>
          </footer>
          
        </div>
      </main>
    </div>
  );
}