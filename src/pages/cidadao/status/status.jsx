import React, { useState } from "react";
import { Clock, Truck, MapPin } from "lucide-react";

// Importação do Layout localizado na raiz da pasta 'src'
import Layout from "../../../layout";

import styles from "./Status.module.css";

const etapas = [
  { label: "Enviado", cor: "#e74c3c" },
  { label: "Análise", cor: "#e67e22" },
  { label: "Equipe a caminho", cor: "#f1c40f" },
  { label: "Resolvendo", cor: "#27ae60" },
  { label: "Concluído", cor: "#196f3d" },
];

const mensagens = [
  "Sua solicitação foi enviada com sucesso e recebida pelo sistema.",
  "Sua solicitação está sendo analisada pela equipe responsável.",
  "A equipe da prefeitura está a caminho do local da ocorrência.",
  "A equipe técnica está trabalhando na resolução do problema no local.",
  "Problema resolvido com sucesso! Agradecemos sua colaboração.",
];

export default function Status() {
  const [etapaAtiva, setEtapaAtiva] = useState(2);

  return (
    <Layout
      nomeSistema="STATUS"
      subtituloSistema="ACOMPANHAMENTO"
      tituloPagina="Status da Solicitação"
      subtituloPagina="Acompanhe o progresso do atendimento em tempo real"
    >
      <div className={styles.wrapperCentralizado}>
        <div className={styles.card}>
          
          {/* CABEÇALHO DO CARD */}
          <div className={styles.cardHeader}>
            <div className={styles.iconBadge}>
              <Clock size={32} />
            </div>
            <div>
              <h2>Acompanhamento do Pedido</h2>
              <p>Protocolo: <strong>#2024/00142</strong></p>
            </div>
          </div>

          {/* LINHA DO TEMPO / TIMELINE */}
          <div className={styles.timeline}>
            <div className={styles.timelineLinha}>
              {etapas.map((_, i) => (
                i < etapas.length - 1 && (
                  <div
                    key={i}
                    className={styles.timelineSegmento}
                    style={{
                      background: i < etapaAtiva ? "#1a4d33" : "#e2e8f0",
                    }}
                  />
                )
              ))}
            </div>

            <div className={styles.timelineEtapas}>
              {etapas.map((etapa, i) => (
                <div key={i} className={styles.etapaItem}>
                  <button
                    type="button"
                    className={styles.etapaPonto}
                    style={{
                      background: i <= etapaAtiva ? etapa.cor : "#cbd5e1",
                      boxShadow: i === etapaAtiva
                        ? `0 0 0 6px ${etapa.cor}44`
                        : "none",
                      transform: i === etapaAtiva ? "scale(1.25)" : "scale(1)",
                    }}
                    onClick={() => setEtapaAtiva(i)}
                  />
                  <span
                    className={styles.etapaLabel}
                    style={{
                      fontWeight: i === etapaAtiva ? "700" : "500",
                      color: i === etapaAtiva ? "#1a4d33" : "#64748b"
                    }}
                  >
                    {etapa.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MAPA */}
          <div className={styles.mapaWrapper}>
            <div className={styles.mapaHeader}>
              <MapPin size={20} />
              <span>Localização e Deslocamento</span>
            </div>
            <div className={styles.mapa}>
              <div className={styles.mapaLinhaH} />
              <div className={styles.mapaLinhaV} />
              
              <div className={styles.caminhao} title="Equipe a caminho">
                <Truck size={36} color="#1a4d33" />
              </div>
              
              <div className={styles.pontoAmarelo} title="Local da ocorrência" />
              <div className={styles.ruaAzul} />
            </div>
          </div>

          {/* MENSAGEM DO STATUS */}
          <div className={styles.mensagemCard}>
            <p className={styles.mensagem}>{mensagens[etapaAtiva]}</p>
          </div>

        </div>
      </div>
    </Layout>
  );
}