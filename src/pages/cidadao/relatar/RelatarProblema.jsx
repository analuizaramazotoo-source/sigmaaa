import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Send, 
  Trees, 
  Bell, 
  User, 
  ArrowLeft 
} from 'lucide-react';

import styles from './RelatarProblema.module.css';

export default function RelatarProblema() {
  const navigate = useNavigate();

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
    alert('Relato de ocorrência enviado com sucesso!');
    navigate('/cidadao');
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.brandHeader}>
            <div className={styles.logoIcon}>
              <Trees size={22} color="#ffffff" />
            </div>
            <div className={styles.brandText}>
              <strong>PAINEL DO CIDADÃO</strong>
              <span>SEGURO AMBIENTAL</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <Bell size={18} />
              <span className={styles.badgeCount}>2</span>
            </div>

            {/* PERFIL */}
            <Link to="/perfil" className={styles.userInfoBox}>
              <div className={styles.userAvatarIcon}>
                <User size={18} />
              </div>
              <div className={styles.userDetails}>
                <strong>Ana Luiza Silva</strong>
                <span>Cidadão • Ativo</span>
              </div>
            </Link>

            {/* BOTÃO VOLTAR AMARELO (REPOSICIONADO APÓS O PERFIL) */}
            <button 
              type="button" 
              className={styles.btnVoltarTopo} 
              onClick={() => navigate('/cidadao')}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className={styles.mainContent}>
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
                  <button 
                    type="button" 
                    className={styles.btnSecondary}
                    onClick={() => navigate('/cidadao')}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.btnPrimary}>
                    <Send size={16} /> Enviar Relato
                  </button>
                </div>
              </form>

            </div>
          </div>
        </main>

        <footer className={styles.footerGlobal}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>
    </div>
  );
}