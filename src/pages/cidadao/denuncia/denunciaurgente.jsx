import React, { useState } from 'react';
import { ShieldAlert, Send, CheckCircle2, RotateCcw, AlertOctagon } from 'lucide-react';

// Ajuste os níveis do caminho relativo conforme a pasta onde salvar o componente
import Layout from '../../../layout'; 

import styles from './DenunciaUrgente.module.css';

export default function DenunciaUrgente() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    endereco: '',
    referencia: '',
    detalhes: '',
    riscoImediato: 'sim'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Denúncia urgente enviada:', formData);
    setEnviado(true);
  };

  const handleNovaDenuncia = () => {
    setFormData({
      tipoDenuncia: '',
      endereco: '',
      referencia: '',
      detalhes: '',
      riscoImediato: 'sim'
    });
    setEnviado(false);
  };

  return (
    <Layout 
      nomeSistema="EMERGÊNCIA" 
      subtituloSistema="DENÚNCIA URGENTE"
      tituloPagina="Denúncia de Emergência" 
      subtituloPagina="Atendimento prioritário da Secretaria do Meio Ambiente"
    >
      <div className={styles.container}>
        {!enviado ? (
          /* ================= FORMULÁRIO DE DENÚNCIA URGENTE ================= */
          <div className={styles.card}>
            
            {/* CABEÇALHO DO CARD COM ALERTA */}
            <div className={styles.cardHeader}>
              <div className={styles.iconBadgeUrgent}>
                <ShieldAlert size={28} />
              </div>
              <div>
                <h2>Registrar Denúncia Urgente</h2>
                <p> Use este canal para crimes ambientais em andamento ou risco iminente. </p>
              </div>
            </div>

            {/* AVISO IMPORTANTE */}
            <div className={styles.avisoBox}>
              <AlertOctagon size={20} className={styles.avisoIcon} />
              <span>
                <strong>Atenção:</strong> Denúncias urgentes têm prioridade alta na fiscalização. Informe o local exato com o máximo de detalhes possível.
              </span>
            </div>

            {/* FORMULÁRIO */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                
                {/* Tipo de Ocorrência */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="tipoDenuncia">Tipo de Crime / Emergência *</label>
                  <select 
                    id="tipoDenuncia" 
                    value={formData.tipoDenuncia}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione o tipo de emergência</option>
                    <option value="queimada_grave">Incêndio / Queimada Ativa</option>
                    <option value="vazamento_quimico">Vazamento Tóxico / Químico</option>
                    <option value="maus_tratos">Maus-Tratos / Caça Ilegal em Andamento</option>
                    <option value="descarte_perigoso">Descarte de Resíduos Perigosos</option>
                    <option value="desmatamento_ativo">Desmatamento Ilegal em Andamento</option>
                    <option value="outro_urgente">Outro Crime em Andamento</option>
                  </select>
                </div>

                {/* Endereço / Local */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="endereco">Endereço Exato / Ponto de Localização *</label>
                  <input 
                    type="text" 
                    id="endereco" 
                    placeholder="Rua, Número, Bairro ou Coordenadas" 
                    value={formData.endereco}
                    onChange={handleChange}
                    required 
                  />
                </div>

                {/* Ponto de Referência */}
                <div className={styles.formGroup}>
                  <label htmlFor="referencia">Ponto de Referência</label>
                  <input 
                    type="text" 
                    id="referencia" 
                    placeholder="Ex: Próximo ao mercado X" 
                    value={formData.referencia}
                    onChange={handleChange}
                  />
                </div>

                {/* Risco Imediato */}
                <div className={styles.formGroup}>
                  <label htmlFor="riscoImediato">Risco à Vida ou Saúde Humana? *</label>
                  <select 
                    id="riscoImediato" 
                    value={formData.riscoImediato}
                    onChange={handleChange}
                    required
                  >
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>

                {/* Detalhes da Emergência */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="detalhes">Descrição da Situação *</label>
                  <textarea 
                    id="detalhes" 
                    rows="4" 
                    placeholder="Descreva a situação com rapidez (ex: quantidade de fumaça, veículos envolvidos, etc.)" 
                    value={formData.detalhes}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              {/* BOTÕES */}
              <div className={styles.actions}>
                <button type="button" className={styles.btnSecondary} onClick={() => window.history.back()}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnUrgent}>
                  <Send size={16} /> Enviar Denúncia Urgente
                </button>
              </div>
            </form>

          </div>
        ) : (
          /* ================= CONFIRMAÇÃO EM TELA ================= */
          <div className={styles.cardSucesso}>
            <div className={styles.iconBoxSucesso}>
              <CheckCircle2 size={64} className={styles.sucessoIcon} />
            </div>

            <h2>Denúncia Enviada com Prioridade!</h2>
            
            <p className={styles.descricaoSucesso}>
              Sua denúncia de emergência foi recebida e encaminhada imediatamente para a fiscalização de plantão.
            </p>

            <div className={styles.infoGroup}>
              <div className={styles.infoBox}>
                <span>Protocolo de Emergência:</span>
                <strong>#URG-2024/0089</strong>
              </div>
              <div className={styles.infoBox}>
                <span>Prioridade:</span>
                <span className={styles.badgeUrgente}>Alta / Imputada</span>
              </div>
            </div>

            <button type="button" className={styles.btnUrgent} onClick={handleNovaDenuncia}>
              <RotateCcw size={16} /> Registrar Outra Denúncia
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}