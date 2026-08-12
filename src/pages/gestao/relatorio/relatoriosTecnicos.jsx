import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './relatoriosTecnicos.module.css';
import { 
  ArrowLeft, BarChart2, Download, Calendar, Filter, FileSpreadsheet, FileText,
  Shield, Map as MapIcon, ClipboardList, HelpCircle, Home as HomeIcon 
} from 'lucide-react';

export default function RelatoriosTecnicos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [periodo, setPeriodo] = useState('mensal');

  const isActive = (path) => location.pathname === path;

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
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      
      {/* SIDEBAR FIXA */}
      <aside 
        style={{ 
          width: '260px', 
          minWidth: '260px', 
          backgroundColor: '#ffffff', 
          borderRight: '1px solid #e2e8f0',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div>
          {/* TOPO DA SIDEBAR */}
          <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ backgroundColor: '#059669', color: '#fff', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13px', color: '#047857', display: 'block', lineHeight: '1.2' }}>SISTEMA DE GESTÃO</strong>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: 'bold' }}>MUNICIPAL AMBIENTAL</span>
            </div>
          </div>

          {/* MENU DE NAVEGAÇÃO */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#059669', letterSpacing: '0.5px', marginBottom: '8px', paddingLeft: '8px' }}>
              MENU DO GESTOR
            </span>

            {/* HOME */}
            <Link
              to="/homeg"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/homeg') ? '#059669' : 'transparent',
                color: isActive('/homeg') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <HomeIcon size={18} /> Home
            </Link>

            {/* GEOPROCESSAMENTO */}
            <Link
              to="/geoprocessamento"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/geoprocessamento') ? '#059669' : 'transparent',
                color: isActive('/geoprocessamento') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <MapIcon size={18} /> Geoprocessamento
            </Link>

            {/* FILA DE FISCALIZAÇÃO */}
            <Link
              to="/fila-fiscalizacao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/fila-fiscalizacao') ? '#059669' : 'transparent',
                color: isActive('/fila-fiscalizacao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <ClipboardList size={18} /> Fila de Fiscalização
            </Link>

            {/* AUTOS E NOTIFICAÇÕES */}
            <Link
              to="/autos-notificacoes-gestao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/autos-notificacoes-gestao') ? '#059669' : 'transparent',
                color: isActive('/autos-notificacoes-gestao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <FileText size={18} /> Autos e Notificações
            </Link>

            {/* RELATÓRIOS TÉCNICOS */}
            <Link
              to="/relatorios-tecnicos-gestao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/relatorios-tecnicos-gestao') ? '#059669' : 'transparent',
                color: isActive('/relatorios-tecnicos-gestao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <BarChart2 size={18} /> Relatórios Técnicos
            </Link>

            {/* LEGISLAÇÃO */}
            <Link
              to="/legislacao"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: isActive('/legislacao') ? '#059669' : 'transparent',
                color: isActive('/legislacao') ? '#ffffff' : '#047857',
                transition: 'all 0.2s'
              }}
            >
              <HelpCircle size={18} /> Legislação
            </Link>
          </nav>
        </div>

        {/* RODAPÉ DA SIDEBAR */}
        <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>Prefeitura Municipal</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Secretaria do Meio Ambiente</div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA TELA */}
      <div className={styles.mainWrapper} style={{ flex: 1, minWidth: 0 }}>
        
        {/* CABEÇALHO COM O BOTÃO AMARELO À DIREITA */}
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