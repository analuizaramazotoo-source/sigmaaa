import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Status.module.css";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  HelpCircle,
  Phone,
  ArrowLeft,
  Bell,
  Truck,
  FileText,
  User
} from "lucide-react";

const etapas = [
  { label: "Enviado", cor: "#e74c3c" },
  { label: "Análise", cor: "#e67e22" },
  { label: "Equipe a caminho", cor: "#f1c40f" },
  { label: "Resolvendo", cor: "#27ae60" },
  { label: "Concluído", cor: "#196f3d" },
];

const mensagens = [
  "Sua solicitação foi enviada com sucesso.",
  "Sua solicitação está sendo analisada pela equipe.",
  "A equipe da prefeitura está a caminho do local da ocorrência.",
  "A equipe está resolvendo o problema no local.",
  "Problema resolvido com sucesso. Obrigado!",
];

export default function Status() {
  const [etapaAtiva, setEtapaAtiva] = useState(2);
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* 1. SIDEBAR FIXA À ESQUERDA (NOVO PADRÃO) */}
      <aside style={{ width: "250px", backgroundColor: "#1e5631", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 15px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🌱</span>
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "1px", margin: 0, color: "#fff" }}>SOLICITAR</h2>
              <p style={{ fontSize: "10px", opacity: 0.8, margin: 0, color: "#d1e2d4" }}>SERVIÇOS AMBIENTAIS</p>
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", padding: "15px 0", flex: 1 }}>
          <Link to="/cidadao" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", color: "#d1e2d4", textDecoration: "none", fontSize: "14px" }}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/relatar-problema" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", color: "#d1e2d4", textDecoration: "none", fontSize: "14px" }}>
            <AlertTriangle size={20} />
            <span>Ocorrências</span>
          </Link>
          <Link to="/status" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", color: "#fff", backgroundColor: "#2e7d32", textDecoration: "none", fontSize: "14px", borderRadius: "8px", margin: "0 10px", fontWeight: "bold" }}>
            <ClipboardList size={20} />
            <span>Minhas Solicitações</span>
          </Link>
          <Link to="/solicitar" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", color: "#d1e2d4", textDecoration: "none", fontSize: "14px" }}>
            <FileText size={20} />
            <span>Solicitar Serviço</span>
          </Link>
          <Link to="/perfil" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", color: "#d1e2d4", textDecoration: "none", fontSize: "14px" }}>
            <User size={20} />
            <span>Perfil</span>
          </Link>
        </nav>

        <div style={{ padding: "15px" }}>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "12px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", fontSize: "12px" }}>
            <Phone size={18} />
            <div>
              <strong>Precisa de ajuda?</strong>
              <p style={{ margin: 0 }}>Fale conosco</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. ÁREA PRINCIPAL DA PÁGINA */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* CABEÇALHO SUPERIOR BRANCO */}
        <header style={{ backgroundColor: "#ffffff", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0" }}>
          <div>
            <h1 style={{ fontSize: "18px", color: "#2e7d32", fontWeight: "600", margin: 0 }}>Status da Solicitação</h1>
            <p style={{ fontSize: "12px", color: "#777", margin: 0 }}>Acompanhe o andamento em tempo real do seu chamado</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button 
              onClick={() => navigate(-1)} 
              style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#fbc02d", color: "#000", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CORPO CENTRAL COM O CARD DE STATUS */}
        <div style={{ flex: 1, padding: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "35px", width: "100%", maxWidth: "700px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)", border: "1px solid #eef0f2", textAlign: "center" }}>
            
            <h2 style={{ color: "#2e7d32", fontSize: "22px", marginBottom: "8px" }}>Status da Solicitação</h2>
            <p style={{ color: "#666", fontSize: "13px", marginBottom: "30px" }}>Confira as etapas do atendimento</p>

            {/* BARRA DE PROGRESSO / ETAPAS */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", position: "relative" }}>
              {etapas.map((etapa, i) => (
                <React.Fragment key={i}>
                  <div style={{ textAlign: "center", zIndex: 2, cursor: "pointer" }} onClick={() => setEtapaAtiva(i)}>
                    <div
                      style={{
                        width: i === etapaAtiva ? "24px" : "18px",
                        height: i === etapaAtiva ? "24px" : "18px",
                        borderRadius: "50%",
                        backgroundColor: i <= etapaAtiva ? etapa.cor : "#ccc",
                        margin: "0 auto",
                        boxShadow: i === etapaAtiva ? `0 0 0 4px ${etapa.cor}44` : "none",
                        transition: "all 0.3s ease"
                      }}
                    />
                    <span style={{ fontSize: "11px", fontWeight: i === etapaAtiva ? "bold" : "normal", color: i === etapaAtiva ? "#2e7d32" : "#666", display: "block", marginTop: "6px" }}>
                      {etapa.label}
                    </span>
                  </div>

                  {i < etapas.length - 1 && (
                    <div style={{ flex: 1, height: "3px", backgroundColor: i < etapaAtiva ? "#2e7d32" : "#e0e0e0", margin: "0 -8px", marginTop: "-16px" }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* QUADRO DO MAPA */}
            <div style={{ width: "100%", height: "220px", backgroundColor: "#d0d8e0", borderRadius: "10px", border: "1px solid #bbb", position: "relative", overflow: "hidden", margin: "20px 0" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "3px", backgroundColor: "rgba(0,0,0,0.15)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "3px", backgroundColor: "rgba(0,0,0,0.15)" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "58%", width: "6px", backgroundColor: "rgba(52, 152, 219, 0.6)", transform: "rotate(8deg)" }} />

              <div style={{ position: "absolute", top: "36%", left: "28%", fontSize: "28px" }}>🚛</div>
              <div style={{ position: "absolute", top: "62%", left: "64%", width: "14px", height: "14px", backgroundColor: "#f1c40f", borderRadius: "50%", border: "2px solid #fff" }} />
            </div>

            {/* MENSAGEM DO STATUS */}
            <p style={{ color: "#555", fontSize: "14px", fontWeight: "500", marginTop: "15px" }}>
              {mensagens[etapaAtiva]}
            </p>

          </div>
        </div>
      </main>

    </div>
  );
}