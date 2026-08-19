import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./homec.module.css";

import {
  MapPin,
  FileWarning,
  FileText,
  Search,
  AlertCircle,
  User,
  LogOut,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Trees
} from "lucide-react";

import prefeituraLogo from "../../../assets/prefeitura.png";
import bannerFundo from "../../../assets/banner.png";

const duvidasFrequentes = [
  {
    pergunta: "Como denunciar descarte irregular de lixo ou entulho?",
    resposta: "Você pode utilizar a opção 'Relatar Problema' ou 'Denúncia Urgente'. Anexe fotos e informe o endereço exato para que a equipe de fiscalização vá até o local."
  },
  {
    pergunta: "Qual o prazo médio para atendimento das solicitações?",
    resposta: "O prazo varia de acordo com a gravidade e o tipo de serviço, sendo de 24h a 48h para casos urgentes e até 7 dias úteis para solicitações convencionais."
  },
  {
    pergunta: "Posso anexar fotos e localização GPS no relato?",
    resposta: "Sim! Ao preencher um relato ou solicitação, você pode enviar imagens do local e permitir que o sistema capture sua localização exata."
  },
  {
    pergunta: "Como acompanhar o andamento dos meus protocolos?",
    resposta: "Acesse 'Minhas Solicitações' através dos cards de acesso rápido ou pelo menu lateral para visualizar o status em tempo real."
  }
];

export default function Homec() {
  const navigate = useNavigate();
  const location = useLocation();

  const [duvidaAberta, setDuvidaAberta] = useState(null);
  const [modalSairAberto, setModalSairAberto] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleDuvida = (index) => {
    setDuvidaAberta(duvidaAberta === index ? null : index);
  };

  const handleConfirmarSair = () => {
    navigate("/");
  };

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR INSTITUCIONAL */}
      <aside className={styles.sidebar}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <Trees size={22} color="#ffffff" />
          </div>
          <div className={styles.brandText}>
            <strong>PAINEL DO CIDADÃO</strong>
            <span>SEGURO AMBIENTAL</span>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <span className={styles.navCategory}>Menu do Cidadão</span>

          <Link
            to="/cidadao"
            className={`${styles.navItem} ${isActive("/cidadao") ? styles.navItemActive : ""}`}
          >
            <MapPin size={18} />
            <span>Visão Geral do Portal</span>
          </Link>

          <Link
            to="/relatar-problema"
            className={`${styles.navItem} ${isActive("/relatar-problema") ? styles.navItemActive : ""}`}
          >
            <FileWarning size={18} />
            <span>Relatar Problema</span>
          </Link>

          <Link
            to="/solicitar"
            className={`${styles.navItem} ${isActive("/solicitar") ? styles.navItemActive : ""}`}
          >
            <FileText size={18} />
            <span>Solicitar Serviço</span>
          </Link>

          <Link
            to="/status"
            className={`${styles.navItem} ${isActive("/status") ? styles.navItemActive : ""}`}
          >
            <Search size={18} />
            <span>Minhas Solicitações</span>
          </Link>

          <Link
            to="/denuncia"
            className={`${styles.navItem} ${isActive("/denuncia") ? styles.navItemActive : ""}`}
          >
            <AlertCircle size={18} />
            <span>Denúncia Urgente</span>
          </Link>

          <Link
            to="/perfil"
            className={`${styles.navItem} ${isActive("/perfil") ? styles.navItemActive : ""}`}
          >
            <User size={18} />
            <span>Meu Perfil</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooterLogo}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Portal do Cidadão</h1>
              <p className={styles.subTitle}>Preservação e Atendimento Ambiental Municipal</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <Bell size={18} />
              <span className={styles.badgeCount}>2</span>
            </div>

            <Link to="/perfil" className={styles.userInfoBox}>
              <div className={styles.userAvatarIcon}>
                <User size={18} />
              </div>
              <div className={styles.userDetails}>
                <strong>Ana Luiza Silva</strong>
                <span>Cidadão • Ativo</span>
              </div>
            </Link>

            <button 
              className={styles.btnSairTopo} 
              onClick={() => setModalSairAberto(true)} 
              type="button"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className={styles.mainContent}>
          <div className={styles.pageContainer}>
            
            {/* CARD BANNER PRINCIPAL */}
            <section className={styles.bannerCard}>
              <h2>Visão Geral do Portal</h2>
              <p>Acompanhe e solicite serviços ambientais no seu município em tempo real.</p>
            </section>

            {/* CARDS DE MÉTRICAS / AÇÕES RÁPIDAS */}
            <section className={styles.cardsGrid}>
              <div className={styles.metricCard}>
                <div className={`${styles.metricIcon} ${styles.iconBlue}`}>
                  <FileWarning size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span>Relatar Ocorrência</span>
                  <strong>Enviar Relato</strong>
                  <p>Informe irregularidades na cidade</p>
                </div>
                <Link to="/relatar-problema" className={styles.cardLink} />
              </div>

              <div className={styles.metricCard}>
                <div className={`${styles.metricIcon} ${styles.iconYellow}`}>
                  <MapPin size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span>Serviços Urbanos</span>
                  <strong>Solicitar Serviço</strong>
                  <p>Poda, coleta e vistorias</p>
                </div>
                <Link to="/solicitar" className={styles.cardLink} />
              </div>

              <div className={styles.metricCard}>
                <div className={`${styles.metricIcon} ${styles.iconGreen}`}>
                  <Search size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span>Acompanhamento</span>
                  <strong>Minhas Solicitações</strong>
                  <p>Consulte seus protocolos ativos</p>
                </div>
                <Link to="/status" className={styles.cardLink} />
              </div>
            </section>

            {/* ÁREA INFERIOR DE CONTEÚDO */}
            <div className={styles.bottomGrid}>
              
              {/* CARD DE DENÚNCIA URGENTE */}
              <div className={styles.cardUrgente}>
                <div className={styles.cardUrgenteHeader}>
                  <ShieldAlert size={28} />
                  <div>
                    <h3>Denúncia Urgente</h3>
                    <p className={styles.urgenteSubtitle}>Emergências ambientais em tempo real</p>
                  </div>
                </div>
                <p className={styles.urgenteDesc}>
                  Utilize para relatar imediatamente situações graves de queimadas, contaminação de mananciais ou descarte de produtos perigosos.
                </p>
                <button
                  className={styles.btnEmergencia}
                  onClick={() => navigate("/denuncia")}
                >
                  RELATAR EMERGÊNCIA AMBIENTAL
                </button>
              </div>

              {/* CARD DE DÚVIDAS FREQUENTES */}
              <div className={styles.cardDuvidas}>
                <div className={styles.cardDuvidasHeader}>
                  <HelpCircle size={22} />
                  <h3>Dúvidas Frequentes</h3>
                </div>
                <div className={styles.listaDuvidas}>
                  {duvidasFrequentes.map((item, index) => (
                    <div key={index} className={styles.duvidaBox}>
                      <button 
                        className={styles.itemDuvida}
                        onClick={() => toggleDuvida(index)}
                        type="button"
                      >
                        <span>{item.pergunta}</span>
                        <ChevronDown 
                          size={18} 
                          className={`${styles.chevronDuvida} ${duvidaAberta === index ? styles.chevronOpen : ""}`} 
                        />
                      </button>
                      {duvidaAberta === index && (
                        <div className={styles.respostaDuvida}>
                          <p>{item.resposta}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>

        <footer className={styles.footerGlobal}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE SAÍDA */}
      {modalSairAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalIconBadge}>
              <LogOut size={28} />
            </div>
            <h2>Encerrar Sessão</h2>
            <p>Tem certeza que quer sair?</p>

            <div className={styles.modalActions}>
              <button 
                className={styles.btnModalCancelar} 
                onClick={() => setModalSairAberto(false)}
              >
                Cancelar
              </button>
              <button 
                className={styles.btnModalConfirmar} 
                onClick={handleConfirmarSair}
              >
                Sim, Quero Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}