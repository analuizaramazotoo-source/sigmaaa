import React, { useState } from 'react';
import { AlertTriangle, UploadCloud, Send } from 'lucide-react';

// Caminho relativo para subir 3 níveis de pastas até 'src/layout.jsx'
import Layout from '../../../layout'; 

import styles from './RelatarProblema.module.css';

export default function RelatarProblema() {
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
  };

  return (
    <Layout 
      nomeSistema="RELATAR" 
      subtituloSistema="OCORRÊNCIAS"
      tituloPagina="Relatar Ocorrência" 
      subtituloPagina="Secretaria do Meio Ambiente"
    >
      <div className={styles.container}>
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

              {/* Descrição Detalhada (Opcional) */}
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
              <button type="button" className={styles.btnSecondary}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnPrimary}>
                <Send size={16} /> Enviar Relato
              </button>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  );
}