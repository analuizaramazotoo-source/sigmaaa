import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './relatoriosTecnicos.module.css';
import { ArrowLeft, BarChart2, Download, Calendar, Filter, FileSpreadsheet, FileText } from 'lucide-react';

export default function RelatoriosTecnicos() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState('mensal');

  const relatorios = [
    {
      id: 1,
      titulo: "Relatório Mensal de Ocorrências",
      descricao: "Métricas consolidadas de vistorias, denúncias e atendimentos de campo.",
      formato: "PDF",
      tamanho: "2.4 MB",
      tipo: "pdf"
    },
    {
      id: 2,
      titulo: "Balanço Geral de Infrações e Multas",
      descricao: "Histórico detalhado por categoria de infração e valores aplicados.",
      formato: "XLSX",
      tamanho: "1.1 MB",
      tipo: "excel"
    },
    {
      id: 3,
      titulo: "Mapeamento de Queimadas Urbanas",
      descricao: "Levantamento estatístico dos focos de calor registrados por região.",
      formato: "PDF",
      tamanho: "3.8 MB",
      tipo: "pdf"
    }
  ];

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO REORGANIZADO COM O BOTÃO AMARELO À DIREITA */}
        <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Relatórios Técnicos</h1>
              <span className={styles.headerSubtitle}>Indicadores e métricas de desempenho ambiental</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button 
              onClick={() => navigate('/homeg')} 
              style={{
                backgroundColor: '#fbc02d',
                color: '#000',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.headerIconBadge}>
                <BarChart2 size={24} />
              </div>
              <div>
                <h2>Central de Relatórios e Exportação</h2>
                <p>Gere consolidados operacionais e estatísticos para acompanhamento da gestão.</p>
              </div>
            </div>

            <div className={styles.filterBar}>
              <div className={styles.filterItem}>
                <Calendar size={18} className={styles.filterIcon} />
                <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                  <option value="mensal">Período: Mensal (Agosto/2026)</option>
                  <option value="trimestral">Período: Trimestral (Q3 2026)</option>
                  <option value="anual">Período: Anual (2026)</option>
                </select>
              </div>

              <button className={styles.btnFilter}>
                <Filter size={16} /> Aplicar Filtros
              </button>
            </div>

            <div className={styles.gridRelatorios}>
              {relatorios.map((item) => (
                <div key={item.id} className={styles.cardRelatorio}>
                  <div className={styles.infoRelatorio}>
                    <div className={item.tipo === 'pdf' ? styles.badgePdf : styles.badgeExcel}>
                      {item.tipo === 'pdf' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                    </div>
                    <div>
                      <h3 className={styles.tituloRelatorio}>{item.titulo}</h3>
                      <p className={styles.descRelatorio}>{item.descricao}</p>
                      <span className={styles.metaRelatorio}>{item.formato} • {item.tamanho}</span>
                    </div>
                  </div>
                  <button className={styles.btnDownload}>
                    <Download size={16} /> Baixar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}