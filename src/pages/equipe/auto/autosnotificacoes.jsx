import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LogOut, 
  Bell, 
  Send,
  FileCheck,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function AutosNotificacoes() {
  const navigate = useNavigate();

  // ESTADOS DO FORMULÁRIO
  const [tipoDocumento, setTipoDocumento] = useState('notificacao');
  const [ocorrenciaVinculada, setOcorrenciaVinculada] = useState('');
  const [autuadoNome, setAutuadoNome] = useState('');
  const [autuadoDocumento, setAutuadoDocumento] = useState('');
  const [localInfracao, setLocalInfracao] = useState('');
  const [artigoLei, setArtigoLei] = useState('Art. 70 da Lei Nº 9.605/1998 - Crimes Ambientais');
  const [descricaoInfracao, setDescricaoInfracao] = useState('');
  const [valorMulta, setValorMulta] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  // LISTA DE OCORRÊNCIAS PARA VINCULAR (LOCALSTORAGE)
  const [ocorrenciasDisponiveis, setOcorrenciasDisponiveis] = useState([]);

  // HISTÓRICO DE AUTOS EMITIDOS
  const [autosEmitidos, setAutosEmitidos] = useState([
    {
      id: 'AUTO-2026-004',
      tipo: 'Auto de Infração',
      infrator: 'Construtora Silva Ltda',
      data: 'Hoje, 11:20',
      status: 'Emitido',
      corStatus: 'amarelo'
    },
    {
      id: 'NOTIF-2026-012',
      tipo: 'Notificação Preventiva',
      infrator: 'Oficina Mecânica Central',
      data: 'Ontem, 14:45',
      status: 'Entregue',
      corStatus: 'verde'
    }
  ]);

  useEffect(() => {
    const salvas = localStorage.getItem('ocorrencias_mapa');
    if (salvas) {
      setOcorrenciasDisponiveis(JSON.parse(salvas));
    }
  }, []);

  // SELECIONAR OCORRÊNCIA E PREENCHER ENDEREÇO AUTOMATICAMENTE
  const handleSelecionarOcorrencia = (e) => {
    const id = e.target.value;
    setOcorrenciaVinculada(id);
    const item = ocorrenciasDisponiveis.find(o => String(o.id) === String(id));
    if (item) {
      setLocalInfracao(item.descricao || item.address || '');
      if (!descricaoInfracao) {
        setDescricaoInfracao(`Constatado no local: ${item.titulo}. Vistoria realizada em campo.`);
      }
    }
  };

  // EMITIR DOCUMENTO
  const handleEmitirDocumento = (e) => {
    e.preventDefault();

    const novoAuto = {
      id: tipoDocumento === 'notificacao' ? `NOTIF-2026-0${autosEmitidos.length + 13}` : `AUTO-2026-00${autosEmitidos.length + 5}`,
      tipo: tipoDocumento === 'notificacao' ? 'Notificação Preventiva' : 'Auto de Infração',
      infrator: autuadoNome || 'Não identificado / Em apuração',
      data: 'Hoje, agora',
      status: 'Emitido',
      corStatus: 'amarelo'
    };

    setAutosEmitidos([novoAuto, ...autosEmitidos]);
    setMensagemSucesso(true);

    // RESET DO FORMULÁRIO APÓS 3 SEGUNDOS
    setTimeout(() => {
      setMensagemSucesso(false);
      setAutuadoNome('');
      setAutuadoDocumento('');
      setLocalInfracao('');
      setDescricaoInfracao('');
      setValorMulta('');
      setOcorrenciaVinculada('');
    }, 3000);
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
      <aside className={styles.sidebar}>
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
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.headerTitle}>Emitir Auto / Notificação</h1>
            <span className={styles.headerSubtitle}>Emissão e registro de notificações ambientais e autos de infração em campo</span>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} title="Notificações">
              <Bell size={20} />
            </button>

            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </div>

            <button className={styles.btnLogout} onClick={() => navigate('/login')} title="Sair do Sistema">
              <LogOut size={18} />
            </button>

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
                    <select value={ocorrenciaVinculada} onChange={handleSelecionarOcorrencia} required>
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
                    value={localInfracao}
                    onChange={(e) => setLocalInfracao(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Fundamentação Legal / Legislação Aplicada</label>
                  <select value={artigoLei} onChange={(e) => setArtigoLei(e.target.value)}>
                    <option value="Art. 70 da Lei Nº 9.605/1998 - Crimes Ambientais">Art. 70 da Lei Nº 9.605/1998 - Crimes Ambientais</option>
                    <option value="Lei Municipal de Proteção à Arborização Urbana">Lei Municipal de Proteção à Arborização Urbana</option>
                    <option value="Código Ambiental do Município - Art. 12">Código Ambiental do Município - Art. 12</option>
                  </select>
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
                <div className={styles.uploadBox}>
                  <Upload size={20} className={styles.uploadIcon} />
                  <div>
                    <strong>Anexar Registros Fotográficos (Evidências)</strong>
                    <span>Arraste as fotos ou clique para carregar arquivos da fiscalização</span>
                  </div>
                </div>

                {/* AÇÕES */}
                <div className={styles.formActions}>
                  <button type="button" className={styles.btnRascunho}>
                    Salvar Rascunho
                  </button>
                  <button type="submit" className={styles.btnEmitir}>
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
                      <button className={styles.btnBaixarPdf} onClick={() => alert(`Baixando PDF do ${item.id}`)}>
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