import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LogOut, 
  Bell, 
  Send,
  Upload,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export default function RelatoriosTecnicos() {
  const navigate = useNavigate();

  // ESTADOS DO FORMULÁRIO
  const [ocorrenciaVinculada, setOcorrenciaVinculada] = useState('');
  const [tituloRelatorio, setTituloRelatorio] = useState('');
  const [tipoRelatorio, setTipoRelatorio] = useState('Vistoria de Campo');
  const [observacoesTécnicas, setObservacoesTecnicas] = useState('');
  const [parecerTecnico, setParecerTecnico] = useState('Procedente - Requer Medidas Corretivas');
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  // OCORRÊNCIAS DA FILA (LOCALSTORAGE)
  const [ocorrenciasDisponiveis, setOcorrenciasDisponiveis] = useState([]);

  // HISTÓRICO DE RELATÓRIOS ENVIADOS
  const [relatoriosEnviados, setRelatoriosEnviados] = useState([
    {
      id: 'REL-2026-088',
      titulo: 'Relatório de Vistoria - Queimada Urbana',
      data: 'Hoje, 10:15',
      parecer: 'Procedente',
      status: 'Enviado',
      corStatus: 'verde'
    },
    {
      id: 'REL-2026-087',
      titulo: 'Relatório de Inspeção de Arborização',
      data: 'Ontem, 15:30',
      parecer: 'Aguardando Análise',
      status: 'Em Triagem',
      corStatus: 'amarelo'
    }
  ]);

  useEffect(() => {
    const salvas = localStorage.getItem('ocorrencias_mapa');
    if (salvas) {
      setOcorrenciasDisponiveis(JSON.parse(salvas));
    }
  }, []);

  // SELECIONAR OCORRÊNCIA E PREENCHER DADOS AUTOMATICAMENTE
  const handleSelecionarOcorrencia = (e) => {
    const id = e.target.value;
    setOcorrenciaVinculada(id);
    const item = ocorrenciasDisponiveis.find(o => String(o.id) === String(id));
    if (item) {
      setTituloRelatorio(`Relatório Técnico: ${item.titulo || item.title}`);
      setObservacoesTecnicas(`Vistoria realizada no endereço ${item.descricao || item.address}. Constatada a situação no local e aplicadas as medidas iniciais.`);
    }
  };

  // ENVIAR RELATÓRIO
  const handleEnviarRelatorio = (e) => {
    e.preventDefault();

    const novoRelatorio = {
      id: `REL-2026-0${relatoriosEnviados.length + 89}`,
      titulo: tituloRelatorio || 'Relatório de Vistoria Operacional',
      data: 'Hoje, agora',
      parecer: parecerTecnico,
      status: 'Enviado',
      corStatus: 'verde'
    };

    setRelatoriosEnviados([novoRelatorio, ...relatoriosEnviados]);
    setMensagemSucesso(true);

    setTimeout(() => {
      setMensagemSucesso(false);
      setTituloRelatorio('');
      setObservacoesTecnicas('');
      setOcorrenciaVinculada('');
    }, 3000);
  };

  // MENU LATERAL
  const menuModulos = [
    { id: 'mapa', titulo: 'Visão Geral da Cidade', icon: <MapPin size={22} />, rota: '/homee' },
    { id: 'fila', titulo: 'Fila de Vistorias', icon: <ClipboardList size={22} />, rota: '/fila-fiscalizacao' },
    { id: 'autos', titulo: 'Emitir Auto / Notificação', icon: <FileText size={22} />, rota: '/autos-notificacoes' },
    { id: 'relatorios', titulo: 'Enviar Relatório', icon: <BarChart2 size={22} />, rota: '/relatorios-tecnicos', ativo: true },
    { id: 'legislacao', titulo: 'Consulta a Leis', icon: <BookOpen size={22} />, rota: '/legislacao' }
  ];

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR PADRÃO */}
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
            <h1 className={styles.headerTitle}>Enviar Relatório Técnico</h1>
            <span className={styles.headerSubtitle}>Consolidação e envio de pareceres e relatórios de fiscalização em campo</span>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.iconBtn} title="Notificações">
              <Bell size={20} />
            </button>

            <div className={styles.userProfile} onClick={() => navigate('/perfil')} style={{ cursor: 'pointer' }}>
              <div className={styles.userAvatar}>
                <Users size={18} />
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>Equipe de Campo</strong>
                <span className={styles.userRole}>Operacional</span>
              </div>
            </div>

            <button className={styles.btnLogout} onClick={() => navigate('/')} title="Sair do Sistema">
              <LogOut size={18} />
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
                
                {/* VINCULAÇÃO DE OCORRÊNCIA */}
                <div className={styles.formGroup}>
                  <label>Vistoria / Ocorrência Correspondente</label>
                  <select value={ocorrenciaVinculada} onChange={handleSelecionarOcorrencia} required>
                    <option value="">-- Selecione uma Ocorrência Ativa --</option>
                    {ocorrenciasDisponiveis.map(o => (
                      <option key={o.id} value={o.id}>
                        #{o.id} - {o.titulo} ({o.status})
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
                      value={tituloRelatorio}
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
                  <select value={parecerTecnico} onChange={(e) => setParecerTecnico(e.target.value)}>
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
                    value={observacoesTécnicas}
                    onChange={(e) => setObservacoesTecnicas(e.target.value)}
                    required
                  />
                </div>

                {/* ANEXAR ARQUIVOS / FOTOS */}
                <div className={styles.uploadBox}>
                  <Upload size={20} className={styles.uploadIcon} />
                  <div>
                    <strong>Anexar Fotos da Vistoria / Documentos Suportados</strong>
                    <span>Formatos aceitos: JPG, PNG ou PDF (Máx. 10MB)</span>
                  </div>
                </div>

                {/* BOTAO DE ACAO */}
                <div className={styles.formActions}>
                  <button type="submit" className={styles.btnEnviar}>
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
                      <button className={styles.btnBaixarPdf} onClick={() => alert(`Baixando PDF do ${item.id}`)}>
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