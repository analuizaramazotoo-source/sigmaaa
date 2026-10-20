import ImageAttachments from '../../../components/ImageAttachments';
import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { api, perform, useCollection, occurrenceView, refreshScreens, uploadFiles } from '../../../services/originalScreens';
import { downloadReport } from '../../../services/downloadDocument';
import { useState} from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import styles from './autosnotificacoes.module.css';

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
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function AutosNotificacoes() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [enviando, setEnviando] = useState(false);
  const [leis] = useCollection('/legislacao');

  // ESTADOS DO FORMULÁRIO
  const [tipoDocumento, setTipoDocumento] = useState('notificacao');
  const [ocorrenciaVinculada, setOcorrenciaVinculada] = useState(() => params.get('ocorrencia') || '');
  const [autuadoNome, setAutuadoNome] = useState('');
  const [autuadoDocumento, setAutuadoDocumento] = useState('');
  const [localInfracao, setLocalInfracao] = useState(null);
  const [artigoLei, setArtigoLei] = useState('');
  const [descricaoInfracao, setDescricaoInfracao] = useState('');
  const [valorMulta, setValorMulta] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [arquivos, setArquivos] = useState([]);
  const [autoSalvo, setAutoSalvo] = useState(null);

  // OCORRÊNCIAS DISPONÍVEIS PARA VINCULAR
  const [ocorrenciasDisponiveis] = useCollection('/ocorrencias', occurrenceView);
  const enderecoAtual = localInfracao ?? ocorrenciasDisponiveis.find(o => String(o.id) === ocorrenciaVinculada)?.address ?? '';

  // HISTÓRICO DE AUTOS EMITIDOS
  const [autosEmitidos] = useCollection('/autos', item => ({ ...item, id: `AUTO-${item.id_auto}`, tipo: item.tipo === 'notificacao' ? 'Notificação Preventiva' : 'Auto de Infração', infrator: item.autuado_nome, data: new Date(item.data_criacao).toLocaleDateString('pt-BR'), status: item.status, corStatus: item.status === 'entregue' ? 'verde' : 'amarelo' }));

  // SELECIONAR OCORRÊNCIA E PREENCHER ENDEREÇO AUTOMATICAMENTE
  const handleSelecionarOcorrencia = (e) => {
    const id = e.target.value;
    setOcorrenciaVinculada(id);
    const item = ocorrenciasDisponiveis.find(o => String(o.id) === String(id));
    if (item) {
      setLocalInfracao(item.address || item.descricao || '');
      setDescricaoInfracao('');
    }
  };

  // EMITIR DOCUMENTO
  const handleEmitirDocumento = async (e) => {
    e.preventDefault(); if (enviando) return; setEnviando(true);
    await perform(async () => {
      const record = autoSalvo || await api('/autos', { method: 'POST', body: {
        id_ocorrencia: Number(ocorrenciaVinculada), tipo: tipoDocumento === 'notificacao' ? 'notificacao' : 'infracao',
        autuado_nome: autuadoNome || 'Não identificado / Em apuração', autuado_documento: autuadoDocumento,
        local_infracao: enderecoAtual, artigo_lei: artigoLei, descricao_infracao: descricaoInfracao,
        valor_multa: Number(String(valorMulta).replace(',', '.') || 0)
      }}); setAutoSalvo(record); await uploadFiles(record.id_ocorrencia, arquivos, file => setArquivos(current => current.filter(item => item !== file))); setAutoSalvo(null); setArquivos([]); refreshScreens(); setMensagemSucesso(true);
      setAutuadoNome(''); setAutuadoDocumento(''); setLocalInfracao(''); setDescricaoInfracao(''); setValorMulta(''); setOcorrenciaVinculada('');
      setTimeout(() => setMensagemSucesso(false), 3000);
    }); setEnviando(false);
  };

  // MENU LATERAL PADRONIZADO DA EQUIPE
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/filae' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autoe', ativo: true },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorioe' },
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
            <h1 className={styles.headerTitle}>Emitir Auto / Notificação</h1>
            <span className={styles.headerSubtitle}>Emissão e registro de notificações ambientais e autos de infração em campo</span>
          </div>

          <div className={styles.headerRight}>
            {/* PERFIL DA EQUIPE CLICÁVEL (REDIRECIONA PARA /PERFILE) */}
            <Link to="/perfile" className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </Link>

            {/* BOTÃO AMARELO DE VOLTAR PARA A HOME DA EQUIPE */}
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
            
            {/* PAINEL CENTRAL: FORMULÁRIO DE EMISSÃO */}
            <section className={styles.formCardSection}>
              {mensagemSucesso && (
                <div className={styles.alertSuccess}>
                  <CheckCircle2 size={20} />
                  <span>Documento emitido com sucesso e sincronizado no sistema!</span>
                </div>
              )}

              <form onSubmit={handleEmitirDocumento} className={styles.formContainer}>
                <fieldset className={styles.documentFields} disabled={enviando || Boolean(autoSalvo)}>
                
                {/* TIPO DE DOCUMENTO */}
                <div className={styles.formGroup}>
                  <label className={styles.labelSection}>Tipo de Documento Oficial</label>
                  <div className={styles.radioGroup}>
                    <label className={`${styles.radioCard} ${tipoDocumento === 'notificacao' ? styles.radioSelected : ''}`}>
                      <input 
                        type="radio" 
                        name="tipoDoc" 
                        value="notificacao" 
                        checked={tipoDocumento === 'notificacao'}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                      />
                      <FileCheck size={18} />
                      <div>
                        <strong>Notificação Preventiva</strong>
                        <span>Solicitação de regularização ou adequação</span>
                      </div>
                    </label>

                    <label className={`${styles.radioCard} ${tipoDocumento === 'auto' ? styles.radioSelected : ''}`}>
                      <input 
                        type="radio" 
                        name="tipoDoc" 
                        value="auto" 
                        checked={tipoDocumento === 'auto'}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                      />
                      <AlertTriangle size={18} />
                      <div>
                        <strong>Auto de Infração</strong>
                        <span>Constatação de infração ambiental com penalidade</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* SELEÇÃO DA VISTORIA / OCORRÊNCIA */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Vistoria / Ocorrência Vinculada</label>
                    <select aria-label="Vistoria / Ocorrência Vinculada" disabled={enviando || Boolean(autoSalvo)} value={ocorrenciaVinculada} onChange={handleSelecionarOcorrencia} required>
                      <option value="">-- Selecione uma Ocorrência da Fila --</option>
                      {ocorrenciasDisponiveis.map(o => (
                        <option key={o.id} value={o.id}>
                          #{o.id} - {o.titulo} ({o.status})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* DADOS DO INFRATOR / AUTUADO */}
                <div className={styles.formRowTwoCols}>
                  <div className={styles.formGroup}>
                    <label>Nome / Razão Social do Autuado</label>
                    <input 
                      type="text" 
                      placeholder="Ex: João da Silva ou Empresa XYZ Ltda"
                      value={autuadoNome}
                      onChange={(e) => setAutuadoNome(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>CPF / CNPJ</label>
                    <input 
                      type="text" 
                      placeholder="000.000.000-00 ou 00.000.000/0001-00"
                      value={autuadoDocumento}
                      onChange={(e) => setAutuadoDocumento(e.target.value)}
                    />
                  </div>
                </div>

                {/* ENDEREÇO E LEGISLAÇÃO */}
                <div className={styles.formGroup}>
                  <label>Local do Fato / Endereço Completo</label>
                  <input 
                    type="text" 
                    placeholder="Rua, Número, Bairro e Ponto de Referência"
                    aria-label="Local do Fato / Endereço Completo"
                    value={enderecoAtual}
                    onChange={(e) => setLocalInfracao(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Fundamentação Legal / Legislação Aplicada</label>
                  <input aria-label="Fundamentação Legal / Legislação Aplicada" list="normas-cadastradas" value={artigoLei} onChange={(e) => setArtigoLei(e.target.value)} placeholder="Informe a norma e o artigo aplicáveis ao caso" />
                  <datalist id="normas-cadastradas">{leis.map(lei => <option key={lei.id_lei} value={lei.titulo} />)}</datalist>
                </div>

                {/* DESCRIÇÃO DA INFRAÇÃO */}
                <div className={styles.formGroup}>
                  <label>Relato Detalhado da Constatação / Infração</label>
                  <textarea 
                    rows={3}
                    placeholder="Descreva minuciosamente as irregularidades encontradas no local..."
                    value={descricaoInfracao}
                    onChange={(e) => setDescricaoInfracao(e.target.value)}
                    required
                  />
                </div>

                {/* CAMPO DE VALOR CASO SEJA AUTO DE INFRAÇÃO */}
                {tipoDocumento === 'auto' && (
                  <div className={styles.formGroup}>
                    <label>Valor Previsto da Multa (R$)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 1500.00"
                      value={valorMulta}
                      onChange={(e) => setValorMulta(e.target.value)}
                    />
                  </div>
                )}

                {/* ANEXAR FOTOS */}
                </fieldset>
                {autoSalvo && !enviando && <p role="status">Documento AUTO-{autoSalvo.id_auto} registrado. Confira os anexos pendentes e envie novamente para concluir.</p>}
                <ImageAttachments allowDocuments files={arquivos} onChange={setArquivos} disabled={enviando} />

                {/* AÇÕES */}
                <div className={styles.formActions}>
                  <button type="submit" disabled={enviando} className={styles.btnEmitir}>
                    <Send size={16} /> Emitir e Registrar
                  </button>
                </div>

              </form>
            </section>

            {/* PAINEL DIREITO: HISTÓRICO DE EMISSÕES */}
            <section className={styles.historyCardSection}>
              <div className={styles.historyHeader}>
                <h3>Emissões Recentes ({autosEmitidos.length})</h3>
              </div>

              <div className={styles.historyList}>
                {autosEmitidos.map((item) => (
                  <div key={item.id} className={styles.cardHistory}>
                    <div className={styles.cardHistoryHeader}>
                      <strong>{item.id}</strong>
                      <span className={`${styles.badgeStatus} ${styles['status_' + item.corStatus]}`}>
                        ● {item.status}
                      </span>
                    </div>
                    <span className={styles.historyTipo}>{item.tipo}</span>
                    <p className={styles.historyInfrator}>{item.infrator}</p>
                    <div className={styles.historyFooter}>
                      <small><Clock size={12} /> {item.data}</small>
                      <button className={styles.btnBaixarPdf} onClick={() => downloadReport({ ...item, documento: 'auto', id_relatorio: item.id_auto, titulo: `${item.tipo} - ${item.autuado_nome}`, observacoes: item.descricao_infracao, parecer: item.artigo_lei })}>
                        PDF
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
