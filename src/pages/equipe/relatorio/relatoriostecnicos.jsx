import ImageAttachments from '../../../components/ImageAttachments';
import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { downloadReport } from '../../../services/downloadDocument';
import { api, perform, useCollection, occurrenceView, refreshScreens, uploadFiles } from '../../../services/originalScreens';
import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import styles from './relatoriostecnicos.module.css';

// CAMINHOS DE IMPORTAÇÃO DAS IMAGENS
import prefeituraLogo from '../../../assets/prefeitura.png';
import arvoreLogo from '../../../assets/arvore.png';

import { 
  MapPin, 
  ClipboardList, 
  FileText, 
  BarChart2, 
  BookOpen, 
  Users, 
  Send,
  CheckCircle2,
  Clock,
  Download,
  ArrowLeft,
} from 'lucide-react';

export default function RelatoriosTecnicos() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [enviando, setEnviando] = useState(false);

  // ESTADOS DO FORMULÁRIO
  const [ocorrenciaVinculada, setOcorrenciaVinculada] = useState(() => params.get('ocorrencia') || '');
  const [tituloRelatorio, setTituloRelatorio] = useState(null);
  const [tipoRelatorio, setTipoRelatorio] = useState('Vistoria de Campo');
  const [observacoesTecnicas, setObservacoesTecnicas] = useState('');
  const [parecerTecnico, setParecerTecnico] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  // ESTADO DE ANEXOS / FOTOS
  const [arquivosAnexados, setArquivosAnexados] = useState([]);

  // OCORRÊNCIAS DA FILA
  const [ocorrenciasDisponiveis] = useCollection('/ocorrencias', occurrenceView);
  const [relatorioSalvo, setRelatorioSalvo] = useState(null);
  const ocorrenciaAtual = ocorrenciasDisponiveis.find(o => String(o.id) === ocorrenciaVinculada);
  const tituloAtual = tituloRelatorio ?? (ocorrenciaAtual ? `Relatório Técnico: ${ocorrenciaAtual.titulo}` : '');

  // HISTÓRICO DE RELATÓRIOS ENVIADOS
  const [relatoriosEnviados] = useCollection('/relatorios', item => ({ ...item, id: `REL-${item.id_relatorio}`, titulo: item.titulo, data: new Date(item.data_criacao).toLocaleDateString('pt-BR'), parecer: item.parecer, status: 'Enviado', corStatus: 'verde' }));

  // SELECIONAR OCORRÊNCIA E PREENCHER DADOS AUTOMATICAMENTE
  const handleSelecionarOcorrencia = (e) => {
    const id = e.target.value;
    setOcorrenciaVinculada(id);
    const item = ocorrenciasDisponiveis.find(o => String(o.id) === String(id));
    if (item) {
      setTituloRelatorio(`Relatório Técnico: ${item.titulo || item.title}`);
      setObservacoesTecnicas(''); setParecerTecnico('');
    }
  };

  // ENVIAR RELATÓRIO
  const handleEnviarRelatorio = async (e) => {
    e.preventDefault(); if (enviando) return; setEnviando(true);
    await perform(async () => {
      const record = relatorioSalvo || await api('/relatorios', { method: 'POST', body: { id_ocorrencia: Number(ocorrenciaVinculada), titulo: tituloAtual, tipo: tipoRelatorio, observacoes: observacoesTecnicas, parecer: parecerTecnico }});
      setRelatorioSalvo(record); await uploadFiles(record.id_ocorrencia, arquivosAnexados, file => setArquivosAnexados(current => current.filter(item => item !== file)));
      refreshScreens(); setMensagemSucesso(true); setParecerTecnico(''); setTipoRelatorio('Vistoria de Campo'); setTituloRelatorio(null); setObservacoesTecnicas(''); setOcorrenciaVinculada(''); setArquivosAnexados([]); setRelatorioSalvo(null);
      setTimeout(() => setMensagemSucesso(false), 3000);
    }); setEnviando(false);
  };

  // MENU LATERAL PADRONIZADO DA EQUIPE
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe', ativo: true },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/leise' },
    { id: 'perfil', titulo: 'Perfil da Equipe', icon: <Users size={22} />, rota: '/perfile' },
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR PADRÃO DA EQUIPE */}
      <ResponsiveSidebar className={styles.sidebar}>
        <div className={styles.brandHeader} onClick={() => navigate('/homee')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>
            <img src={arvoreLogo} alt="Logo Meio Ambiente" className={styles.brandImg} />
          </div>
          <div className={styles.brandText}>
            <strong>EQUIPE DE CAMPO</strong>
            <span>PAINEL OPERACIONAL</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <span className={styles.navCategory}>Menu do Servidor</span>
          {menuModulos.map(item => (
            <button 
              key={item.id} 
              className={`${styles.navItem} ${item.ativo ? styles.navItemActive : ''}`} 
              onClick={() => navigate(item.rota)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navTitle}>{item.titulo}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </ResponsiveSidebar>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>Enviar Relatório Técnico</h1>
            <span className={styles.headerSubtitle}>Consolidação e envio de pareceres e relatórios de fiscalização em campo</span>
          </div>

          <div className={styles.headerRight}>
            <Link to="/perfile" className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </Link>

            <button 
              onClick={() => navigate('/homee')} 
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
                gap: '6px',
                marginLeft: '10px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.contentGrid}>
            
            {/* PAINEL CENTRAL: FORMULÁRIO DO RELATÓRIO */}
            <section className={styles.formCardSection}>
              {mensagemSucesso && (
                <div className={styles.alertSuccess}>
                  <CheckCircle2 size={20} />
                  <span>Relatório enviado com sucesso à Secretaria do Meio Ambiente!</span>
                </div>
              )}

              <form onSubmit={handleEnviarRelatorio} className={styles.formContainer}>
                <fieldset className={styles.documentFields} disabled={enviando || Boolean(relatorioSalvo)}>
                
                {/* VINCULAÇÃO DE OCORRÊNCIA */}
                <div className={styles.formGroup}>
                  <label>Vistoria / Ocorrência Correspondente</label>
                  <select aria-label="Vistoria / Ocorrência Correspondente" disabled={enviando || Boolean(relatorioSalvo)} value={ocorrenciaVinculada} onChange={handleSelecionarOcorrencia} required>
                    <option value="">-- Selecione uma Ocorrência Ativa --</option>
                    {ocorrenciasDisponiveis.map(o => (
                      <option key={o.id} value={o.id}>
                        #{o.id} - {o.titulo || o.title} ({o.status})
                      </option>
                    ))}
                  </select>
                </div>

                {/* TÍTULO E TIPO */}
                <div className={styles.formRowTwoCols}>
                  <div className={styles.formGroup}>
                    <label>Título do Relatório</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Vistoria de Corte Irregular em Área Urbana"
                      aria-label="Título do Relatório"
                      value={tituloAtual}
                      onChange={(e) => setTituloRelatorio(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Tipo de Inspeção</label>
                    <select value={tipoRelatorio} onChange={(e) => setTipoRelatorio(e.target.value)}>
                      <option value="Vistoria de Campo">Vistoria de Campo</option>
                      <option value="Fiscalização de Queimada">Fiscalização de Queimada</option>
                      <option value="Inspeção de Recurso Hídrico">Inspeção de Recurso Hídrico</option>
                      <option value="Monitoramento de Flora/Fauna">Monitoramento de Flora/Fauna</option>
                    </select>
                  </div>
                </div>

                {/* PARECER TÉCNICO DA EQUIPE */}
                <div className={styles.formGroup}>
                  <label>Parecer Conclusivo do Fiscal</label>
                  <select aria-label="Parecer Conclusivo do Fiscal" required value={parecerTecnico} onChange={(e) => setParecerTecnico(e.target.value)}>
                    <option value="" disabled>Selecione o parecer da vistoria</option>
                    <option value="Procedente - Requer Medidas Corretivas">Procedente - Requer Medidas Corretivas</option>
                    <option value="Procedente - Notificação/Auto Emitido">Procedente - Notificação/Auto Emitido</option>
                    <option value="Improcedente - Denúncia Não Confirmada">Improcedente - Denúncia Não Confirmada</option>
                    <option value="Concluído - Regularização Verificada">Concluído - Regularização Verificada</option>
                  </select>
                </div>

                {/* CONTEÚDO E OBSERVAÇÕES */}
                <div className={styles.formGroup}>
                  <label>Relatório Circunstanciado e Constatações de Campo</label>
                  <textarea 
                    rows={4}
                    placeholder="Descreva detalhadamente o estado do local, equipamentos utilizados, condições ambientais e depoimentos..."
                    aria-label="Constatações de Campo"
                    value={observacoesTecnicas}
                    onChange={(e) => setObservacoesTecnicas(e.target.value)}
                    required
                  />
                </div>

                </fieldset>
                {relatorioSalvo && !enviando && <p role="status">Relatório REL-{relatorioSalvo.id_relatorio} registrado. Confira os anexos pendentes e envie novamente para concluir.</p>}
                <ImageAttachments allowDocuments files={arquivosAnexados} onChange={setArquivosAnexados} disabled={enviando} />

                {/* BOTÃO DE AÇÃO */}
                <div className={styles.formActions}>
                  <button type="submit" disabled={enviando} className={styles.btnEnviar}>
                    <Send size={16} /> Enviar Relatório à Gestão
                  </button>
                </div>

              </form>
            </section>

            {/* PAINEL DIREITO: HISTÓRICO DE RELATÓRIOS */}
            <section className={styles.historyCardSection}>
              <div className={styles.historyHeader}>
                <h3>Relatórios Enviados ({relatoriosEnviados.length})</h3>
              </div>

              <div className={styles.historyList}>
                {relatoriosEnviados.map((item) => (
                  <div key={item.id} className={styles.cardHistory}>
                    <div className={styles.cardHistoryHeader}>
                      <strong>{item.id}</strong>
                      <span className={`${styles.badgeStatus} ${styles['status_' + item.corStatus]}`}>
                        ● {item.status}
                      </span>
                    </div>
                    <p className={styles.historyTitulo}>{item.titulo}</p>
                    <small className={styles.historyParecer}>Parecer: <strong>{item.parecer}</strong></small>
                    <div className={styles.historyFooter}>
                      <small><Clock size={12} /> {item.data}</small>
                      <button className={styles.btnBaixarPdf} onClick={() => downloadReport(item)}>
                        <Download size={12} /> PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
