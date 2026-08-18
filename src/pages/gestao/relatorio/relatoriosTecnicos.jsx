import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './relatoriosTecnicos.module.css';
import { 
  ArrowLeft, BarChart2, Download, Calendar, Filter, FileSpreadsheet, FileText,
  Shield, Map as MapIcon, ClipboardList, HelpCircle, Home as HomeIcon, CheckCircle2
} from 'lucide-react';

const DATABASE_RELATORIOS = {
  mensal: [
    {
      id: 1,
      titulo: "Relatório Mensal de Ocorrências",
      descricao: "Métricas consolidadas de vistorias, denúncias e atendimentos de campo do mês corrente.",
      formato: "PDF",
      tamanho: "2.4 MB",
      tipo: "pdf",
      nomeArquivo: "Relatorio_Mensal_Ocorrencias_Agosto_2026.pdf"
    },
    {
      id: 2,
      titulo: "Balanço Geral de Infrações e Multas",
      descricao: "Histórico detalhado por categoria de infração e valores aplicados no período.",
      formato: "XLSX",
      tamanho: "1.1 MB",
      tipo: "excel",
      nomeArquivo: "Balanco_Infracoes_Multas_Agosto_2026.xlsx"
    },
    {
      id: 3,
      titulo: "Mapeamento de Queimadas Urbanas",
      descricao: "Levantamento estatístico dos focos de calor registrados por região municipal.",
      formato: "PDF",
      tamanho: "3.8 MB",
      tipo: "pdf",
      nomeArquivo: "Mapeamento_Queimadas_Agosto_2026.pdf"
    }
  ],
  trimestral: [
    {
      id: 4,
      titulo: "Consolidado Trimestral de Vistorias (Q3)",
      descricao: "Estatísticas agregadas de fiscalização ambiental e resolutividade do terceiro trimestre.",
      formato: "PDF",
      tamanho: "5.2 MB",
      tipo: "pdf",
      nomeArquivo: "Consolidado_Trimestral_Q3_2026.pdf"
    },
    {
      id: 5,
      titulo: "Planilha de Arrecadação de Fines e Licenças",
      descricao: "Demostrativo financeiro de multas quitadas e taxas de licenciamento ambiental.",
      formato: "XLSX",
      tamanho: "2.8 MB",
      tipo: "excel",
      nomeArquivo: "Arrecadacao_Trimestral_Q3_2026.xlsx"
    }
  ],
  anual: [
    {
      id: 6,
      titulo: "Relatório Anual de Gestão Ambiental",
      descricao: "Balanço completo dos indicadores de sustentabilidade e fiscalização do município.",
      formato: "PDF",
      tamanho: "12.4 MB",
      tipo: "pdf",
      nomeArquivo: "Relatorio_Anual_Gestao_Ambiental_2026.pdf"
    },
    {
      id: 7,
      titulo: "Série Histórica de Infrações Fiscais",
      descricao: "Matriz de dados consolidada com todas as autuações e notificações emitidas no ano.",
      formato: "XLSX",
      tamanho: "4.5 MB",
      tipo: "excel",
      nomeArquivo: "Serie_Historica_Infracoes_2026.xlsx"
    }
  ]
};

export default function RelatoriosTecnicos() {
  const navigate = useNavigate();
  const location = useLocation();

  const [periodoSelect, setPeriodoSelect] = useState('mensal');
  const [periodoAtivo, setPeriodoAtivo] = useState('mensal');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [notificationMsg, setNotificationMsg] = useState('');

  const isActive = (path) => location.pathname === path;

  // Aplica o filtro selecionado
  const handleAplicarFiltros = () => {
    setPeriodoAtivo(periodoSelect);
    setNotificationMsg(`Filtro aplicado: Período ${periodoSelect.toUpperCase()}`);
    setTimeout(() => setNotificationMsg(''), 3000);
  };

  // Simula o download do arquivo gerando um Blob
  const handleDownload = (item) => {
    const conteudoExemplo = `Prefeitura Municipal - Secretaria do Meio Ambiente\nDocumento: ${item.titulo}\nPeríodo: ${periodoAtivo}\nGerado em: ${new Date().toLocaleString('pt-BR')}`;
    const blob = new Blob([conteudoExemplo], { type: item.tipo === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setNotificationMsg(`Download iniciado: ${item.nomeArquivo}`);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  const listaExibida = (DATABASE_RELATORIOS[periodoAtivo] || []).filter(item => {
    if (filtroTipo === 'pdf') return item.tipo === 'pdf';
    if (filtroTipo === 'excel') return item.tipo === 'excel';
    return true;
  });

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR FIXA */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brandHeader}>
            <div className={styles.logoIcon}>
              <Shield size={22} />
            </div>
            <div className={styles.brandText}>
              <strong>SISTEMA DE GESTÃO</strong>
              <span>MUNICIPAL AMBIENTAL</span>
            </div>
          </div>

          <nav className={styles.navigation}>
            <span className={styles.navCategory}>MENU DO GESTOR</span>

            <Link to="/homeg" className={isActive('/homeg') ? styles.navItemActive : styles.navItem}>
              <HomeIcon size={18} /> Home
            </Link>

            <Link to="/geoprocessamento" className={isActive('/geoprocessamento') ? styles.navItemActive : styles.navItem}>
              <MapIcon size={18} /> Geoprocessamento
            </Link>

            <Link to="/fila-fiscalizacao" className={isActive('/fila-fiscalizacao') ? styles.navItemActive : styles.navItem}>
              <ClipboardList size={18} /> Fila de Fiscalização
            </Link>

            <Link to="/autos-notificacoes-gestao" className={isActive('/autos-notificacoes-gestao') ? styles.navItemActive : styles.navItem}>
              <FileText size={18} /> Autos e Notificações
            </Link>

            <Link to="/relatorios-tecnicos-gestao" className={isActive('/relatorios-tecnicos-gestao') ? styles.navItemActive : styles.navItem}>
              <BarChart2 size={18} /> Relatórios Técnicos
            </Link>

            <Link to="/legislacao" className={isActive('/legislacao') ? styles.navItemActive : styles.navItem}>
              <HelpCircle size={18} /> Legislação
            </Link>
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerTitle}>Prefeitura Municipal</div>
          <div className={styles.footerSubtitle}>Secretaria do Meio Ambiente</div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DA TELA */}
      <div className={styles.mainWrapper}>
        
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Relatórios Técnicos</h1>
              <span className={styles.headerSubtitle}>Indicadores e métricas de desempenho ambiental</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button 
              type="button"
              onClick={() => navigate('/homeg')} 
              className={styles.btnVoltarAmarelo}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          {notificationMsg && (
            <div className={`${styles.infoBanner} ${styles.status_success}`}>
              <div className={styles.infoContent}>
                <CheckCircle2 size={24} />
                <div>
                  <strong>Operação Realizada!</strong>
                  <p>{notificationMsg}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.headerIconBadge}>
                <BarChart2 size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h2>Central de Relatórios e Exportação</h2>
                <p>Gere consolidados operacionais e estatísticos para acompanhamento da gestão.</p>
              </div>

              {/* FILTRO RÁPIDO DE FORMATO */}
              <div className={styles.formatFilter}>
                <button 
                  type="button" 
                  className={filtroTipo === 'todos' ? styles.filterBtnActive : styles.filterBtn}
                  onClick={() => setFiltroTipo('todos')}
                >
                  Todos
                </button>
                <button 
                  type="button" 
                  className={filtroTipo === 'pdf' ? styles.filterBtnActive : styles.filterBtn}
                  onClick={() => setFiltroTipo('pdf')}
                >
                  PDF
                </button>
                <button 
                  type="button" 
                  className={filtroTipo === 'excel' ? styles.filterBtnActive : styles.filterBtn}
                  onClick={() => setFiltroTipo('excel')}
                >
                  XLSX
                </button>
              </div>
            </div>

            <div className={styles.filterBar}>
              <div className={styles.filterItem}>
                <Calendar size={18} className={styles.filterIcon} />
                <select value={periodoSelect} onChange={(e) => setPeriodoSelect(e.target.value)}>
                  <option value="mensal">Período: Mensal (Agosto/2026)</option>
                  <option value="trimestral">Período: Trimestral (Q3 2026)</option>
                  <option value="anual">Período: Anual (2026)</option>
                </select>
              </div>

              <button 
                type="button"
                className={styles.btnFilter}
                onClick={handleAplicarFiltros}
              >
                <Filter size={16} /> Aplicar Filtros
              </button>
            </div>

            <div className={styles.gridRelatorios}>
              {listaExibida.length > 0 ? (
                listaExibida.map((item) => (
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
                    <button 
                      type="button"
                      className={styles.btnDownload}
                      onClick={() => handleDownload(item)}
                    >
                      <Download size={16} /> Baixar
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <BarChart2 size={40} color="#059669" />
                  <p>Nenhum relatório encontrado com o formato selecionado.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>
    </div>
  );
}