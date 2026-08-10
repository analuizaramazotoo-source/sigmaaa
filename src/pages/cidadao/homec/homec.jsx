import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./homec.module.css";

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

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#1a4d33",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          flexShrink: 0
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", padding: "0 8px" }}>
          <span style={{ fontSize: "24px" }}>🌱</span>
          <div>
            <h2 style={{ fontSize: "14px", margin: 0, fontWeight: "bold", color: "#fff" }}>CADASTRO</h2>
            <p style={{ fontSize: "10px", margin: 0, opacity: 0.8, color: "#e6f4ea" }}>SEGURO AMBIENTAL</p>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <Link
            to="/cidadao"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              backgroundColor: isActive("/cidadao") ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontWeight: isActive("/cidadao") ? "bold" : "normal"
            }}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/relatar-problema"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              backgroundColor: isActive("/relatar-problema") ? "rgba(255, 255, 255, 0.15)" : "transparent"
            }}
          >
            <AlertTriangle size={20} />
            <span>Relatar Problema</span>
          </Link>

          <Link
            to="/solicitar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              backgroundColor: isActive("/solicitar") ? "rgba(255, 255, 255, 0.15)" : "transparent"
            }}
          >
            <FileText size={20} />
            <span>Solicitar Serviço</span>
          </Link>

          <Link
            to="/status"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              backgroundColor: isActive("/status") ? "rgba(255, 255, 255, 0.15)" : "transparent"
            }}
          >
            <FileText size={20} />
            <span>Minhas Solicitações</span>
          </Link>

          <Link
            to="/denuncia"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              backgroundColor: isActive("/denuncia") ? "rgba(255, 255, 255, 0.15)" : "transparent"
            }}
          >
            <AlertCircle size={20} />
            <span>Denúncia Urgente</span>
          </Link>

          <Link
            to="/perfil"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              backgroundColor: isActive("/perfil") ? "rgba(255, 255, 255, 0.15)" : "transparent"
            }}
          >
            <User size={20} />
            <span>Perfil</span>
          </Link>
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "8px" }}>
            <Phone size={18} />
            <div>
              <strong style={{ display: "block", fontSize: "12px" }}>Precisa de ajuda?</strong>
              <span style={{ fontSize: "11px", opacity: 0.8 }}>Fale conosco</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
      <main style={{ flex: 1, overflowY: "auto", backgroundColor: "#f4f7f5" }}>
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
                onClick={() => navigate("/relatar-problema")}
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