import React, { useState } from 'react';
import { AlertTriangle, Send, CheckCircle2, RotateCcw } from 'lucide-react';

// Caminho para o Layout (ajuste a quantidade de ../ conforme a pasta onde seu arquivo está)
import Layout from '../../../layout'; 

import styles from './RelatarProblema.module.css';

export default function RelatarProblema() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    data: '',
    endereco: '',
    descricao: '',
    arquivos: null
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário enviados:', formData);
    setEnviado(true);
  };

  const handleNovoRelato = () => {
    setFormData({
      titulo: '',
      categoria: '',
      data: '',
      endereco: '',
      descricao: '',
      arquivos: null
    });
    setEnviado(false);
  };

  return (
    <Layout 
      nomeSistema="RELATAR" 
      subtituloSistema="OCORRÊNCIAS"
      tituloPagina="Relatar Ocorrência" 
      subtituloPagina="Secretaria do Meio Ambiente"
    >
      <div className={styles.container}>
        {!enviado ? (
          /* ================= FORMULÁRIO DE RELATO ================= */
          <div className={styles.card}>
            
            {/* CABEÇALHO DO CARD */}
            <div className={styles.cardHeader}>
              <div className={styles.iconBadge}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2>Relatar um Problema Ambiental</h2>
                <p>
                  Preencha os campos abaixo para que nossa equipe possa analisar e tomar as providências necessárias.
                </p>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                
                {/* Título */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="titulo">Título do Relato *</label>
                  <input 
                    type="text" 
                    id="titulo" 
                    placeholder="Ex: Descarte irregular de entulho na via pública" 
                    value={formData.titulo}
                    onChange={handleChange}
                    required 
                  />
                </div>

                {/* Categoria */}
                <div className={styles.formGroup}>
                  <label htmlFor="categoria">Categoria do Problema *</label>
                  <select 
                    id="categoria" 
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione uma categoria</option>
                    <option value="lixo">Lixo / Entulho Irregular</option>
                    <option value="esgoto">Esgoto a Céu Aberto</option>
                    <option value="desmatamento">Desmatamento / Poda Irregular</option>
                    <option value="queimada">Queimada / Fumaça</option>
                    <option value="agua">Poluição de Recursos Hídricos</option>
                    <option value="outro">Outros</option>
                  </select>
                </div>

                {/* Data da Ocorrência */}
                <div className={styles.formGroup}>
                  <label htmlFor="data">Data da Ocorrência *</label>
                  <input 
                    type="date" 
                    id="data" 
                    value={formData.data}
                    onChange={handleChange}
                    required 
                  />
                </div>

                {/* Endereço / Localização */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="endereco">Endereço / Localização do Ocorrido *</label>
                  <input 
                    type="text" 
                    id="endereco" 
                    placeholder="Rua, Número, Bairro e Ponto de Referência" 
                    value={formData.endereco}
                    onChange={handleChange}
                    required 
                  />
                </div>

                {/* Descrição Detalhada */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="descricao">Descrição Detalhada (Opcional)</label>
                  <textarea 
                    id="descricao" 
                    rows="4" 
                    placeholder="Descreva com detalhes o problema encontrado, se desejar..." 
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* BOTÕES DE AÇÃO */}
              <div className={styles.actions}>
                <button type="button" className={styles.btnSecondary} onClick={() => window.history.back()}>
                  Cancelar
                </button>
                <button type="submit" className={styles.btnPrimary}>
                  <Send size={16} /> Enviar Relato
                </button>
              </div>
            </form>

          </div>
        ) : (
          /* ================= MENSAGEM DE SUCESSO ================= */
          <div className={styles.cardSucesso}>
            <div className={styles.iconBoxSucesso}>
              <CheckCircle2 size={64} className={styles.sucessoIcon} />
            </div>

            <h2>Relato Enviado com Sucesso!</h2>
            
            <p className={styles.descricaoSucesso}>
              Sua solicitação foi registrada e encaminhada para a análise da Secretaria do Meio Ambiente.
            </p>

            <div className={styles.infoGroup}>
              <div className={styles.infoBox}>
                <span>Nº do Protocolo:</span>
                <strong>#2024/00143</strong>
              </div>
              <div className={styles.infoBox}>
                <span>Status Inicial:</span>
                <span className={styles.badgeStatus}>Em Análise</span>
              </div>
            </div>

            <button type="button" className={styles.btnPrimary} onClick={handleNovoRelato}>
              <RotateCcw size={16} /> Fazer Novo Relato
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}