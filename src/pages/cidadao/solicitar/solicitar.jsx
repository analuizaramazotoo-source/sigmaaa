import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, UploadCloud, MapPin, AlertCircle, Send } from "lucide-react";

// Importação corrigida subindo 3 níveis até src/layout.jsx
import Layout from "../../../layout";

import styles from "./Solicitar.module.css";

export default function Solicitar() {
  const [problema, setProblema] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(file.name);
  };

  const handleEnviar = (e) => {
    e.preventDefault();

    if (!problema.trim()) {
      alert("Preencha o campo Problema.");
      return;
    }

    if (!descricao.trim()) {
      alert("Preencha o campo Descrição.");
      return;
    }

    navigate("/relato-enviado");
  };

  return (
    <Layout
      nomeSistema="SOLICITAR"
      subtituloSistema="SERVIÇOS AMBIENTAIS"
      tituloPagina="Solicitar Serviço"
      subtituloPagina="Informe um problema ambiental na sua região para podermos ajudar"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          
          {/* LADO ESQUERDO: FORMULÁRIO */}
          <div className={styles.cardEsquerdo}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBadge}>
                <Wrench size={24} />
              </div>
              <div>
                <h2>Detalhes do Problema</h2>
                <p>Preencha os dados abaixo com as informações da ocorrência.</p>
              </div>
            </div>

            <form onSubmit={handleEnviar} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="problema">Problema / Serviço *</label>
                <input
                  id="problema"
                  type="text"
                  placeholder="Ex: Poda de árvore com risco de queda"
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="descricao">Descrição Detalhada *</label>
                <textarea
                  id="descricao"
                  rows={4}
                  placeholder="Descreva a situação com detalhes..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Foto do Problema (Opcional)</label>
                <div className={styles.fileUpload}>
                  <UploadCloud size={28} />
                  <p>{foto ? foto : "Clique ou arraste uma foto aqui"}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFoto}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => navigate(-1)}
                >
                  Voltar
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  <Send size={16} /> Enviar Relato
                </button>
              </div>
            </form>
          </div>

          {/* LADO DIREITO: MAPA */}
          <div className={styles.cardDireito}>
            <div className={styles.mapaHeader}>
              <MapPin size={18} />
              <span>Localização da Ocorrência</span>
            </div>

            <div className={styles.mapaPlaceholder}>
              <div
                className={styles.mapaPonto}
                style={{ top: "30%", left: "65%" }}
              />
              <div
                className={styles.mapaPontoLaranja}
                style={{ top: "50%", left: "40%" }}
              />
              <div
                className={styles.mapaPontoAmarelo}
                style={{ top: "68%", left: "52%" }}
              />
              <div className={styles.mapaLinha} />
            </div>
          </div>

        </div>

        {/* AVISO INFORMATIVO */}
        <div className={styles.aviso}>
          <AlertCircle size={20} className={styles.avisoIcone} />
          <span>
            Certifique-se de selecionar corretamente a localização no mapa para
            facilitar o atendimento das equipes de campo.
          </span>
        </div>
      </div>
    </Layout>
  );
}