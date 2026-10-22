import ManagementSidebar from '../../../components/ManagementSidebar';
import { downloadReport } from '../../../services/downloadDocument';
import { useCollection } from '../../../services/originalScreens';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './relatoriosTecnicos.module.css';
import { ArrowLeft, BarChart2, Download, Calendar, Filter, FileText, CheckCircle2 } from 'lucide-react';

export default function RelatoriosTecnicos() {
  const navigate = useNavigate();
  const [relatorios] = useCollection('/relatorios');

  const [periodoSelect, setPeriodoSelect] = useState('todos');
  const [periodoAtivo, setPeriodoAtivo] = useState('todos');
  const [notificationMsg, setNotificationMsg] = useState('');


  // Aplica o filtro selecionado
  const handleAplicarFiltros = () => {
    setPeriodoAtivo(periodoSelect);
    setNotificationMsg(`Filtro aplicado: Período ${periodoSelect.toUpperCase()}`);
    setTimeout(() => setNotificationMsg(''), 3000);
  };

  const handleDownload = async (item, formato) => {
    if (await downloadReport(item, formato)) {
      setNotificationMsg(`Download iniciado: relatório ${item.id_relatorio} (${formato === 'pdf' ? 'PDF' : 'CSV'})`); setTimeout(() => setNotificationMsg(''), 4000);
    }
  };

  const now = new Date();
  const inicio = new Date(now.getFullYear(), periodoAtivo === 'mensal' ? now.getMonth() : periodoAtivo === 'trimestral' ? Math.floor(now.getMonth() / 3) * 3 : 0, 1);
  const listaExibida = relatorios.filter(r => periodoAtivo === 'todos' || new Date(r.data_criacao) >= inicio);

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR FIXA */}
      <ManagementSidebar />

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
                <p>Consulte os relatórios enviados pela equipe e baixe cada documento em PDF ou CSV.</p>
              </div>


            </div>

            <div className={styles.filterBar}>
              <div className={styles.filterItem}>
                <Calendar size={18} className={styles.filterIcon} />
                <select aria-label="Período dos relatórios" value={periodoSelect} onChange={(e) => setPeriodoSelect(e.target.value)}>
                  <option value="todos">Todos os períodos</option>
                  <option value="mensal">Período: Mensal (mês atual)</option>
                  <option value="trimestral">Período: Trimestral (trimestre atual)</option>
                  <option value="anual">Período: Anual (ano atual)</option>
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
                  <div key={item.id_relatorio} className={styles.cardRelatorio}>
                    <div className={styles.infoRelatorio}>
                      <div className={styles.badgePdf}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className={styles.tituloRelatorio}>{item.titulo}</h3>
                        <p className={styles.descRelatorio}>{item.observacoes}</p>
                        <span className={styles.metaRelatorio}>REL-{item.id_relatorio} • {item.tipo || 'Relatório técnico'}</span>
                      </div>
                    </div>
                    <div className={styles.downloadActions}>
                      <button type="button" className={styles.btnDownload} onClick={() => handleDownload(item, 'pdf')}><Download size={16} /> PDF</button>
                      <button type="button" className={styles.btnDownload} onClick={() => handleDownload(item, 'excel')}><Download size={16} /> CSV</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <BarChart2 size={40} color="#059669" />
                  <p>Nenhum relatório encontrado neste período.</p>
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
