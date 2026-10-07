import { useCollection } from '../../../services/originalScreens';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './legislacao.module.css';
import { 
  ArrowLeft, HelpCircle, BookOpen, Search, 
  FileText, ExternalLink, Scale, ShieldCheck,
  Shield, Map as MapIcon, ClipboardList, BarChart2, Home as HomeIcon,
  X, CheckCircle2, Copy
} from 'lucide-react';

// Links atualizados com URLs reais e funcionais
export default function Legislacao() {
  const navigate = useNavigate();
  const [documentos] = useCollection('/legislacao', l => ({ ...l, id: l.id_lei, descricao: (l.conteudo || '').split('\n\n')[1] || l.conteudo || '', categoria: l.categoria || '', conteudoCompleto: l.conteudo, linkDiario: l.url_oficial, data: '' }));
  const location = useLocation();

  const [busca, setBusca] = useState('');
  const [docSelecionado, setDocSelecionado] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  const isActive = (path) => location.pathname === path;

  const docsFiltrados = documentos.filter(doc => 
    doc.titulo.toLowerCase().includes(busca.toLowerCase()) || 
    doc.categoria.toLowerCase().includes(busca.toLowerCase()) ||
    doc.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleCopiarTrecho = (texto) => {
    navigator.clipboard.writeText(texto);
    setNotificationMsg("Resumo copiado para a área de transferência!");
    setTimeout(() => setNotificationMsg(''), 3000);
  };

  const handleAbrirLinkExterno = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
              <h1 className={styles.headerTitle}>Biblioteca de Legislação</h1>
              <span className={styles.headerSubtitle}>Base legal e normativas para fiscalização ambiental</span>
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
                  <strong>Copiado!</strong>
                  <p>{notificationMsg}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.cardPrincipal}>
            <div className={styles.cardHeader}>
              <div className={styles.headerIconBadge}>
                <HelpCircle size={24} />
              </div>
              <div>
                <h2>Consulta de Normas e Decretos</h2>
                <p>Acesse rapidamente a base jurídica para fundamentar autos e notificações.</p>
              </div>
            </div>

            <div className={styles.searchBar}>
              <div className={styles.inputContainer}>
                <Search size={20} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Pesquisar por número da lei, palavra-chave ou categoria..." 
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.listaDocumentos}>
              {docsFiltrados.length > 0 ? (
                docsFiltrados.map((doc) => (
                  <div key={doc.id} className={styles.itemDocumento}>
                    <div className={styles.docIconSide}>
                      <div className={styles.iconCircle}>
                        <BookOpen size={22} />
                      </div>
                    </div>
                    <div className={styles.docContent}>
                      <div className={styles.docHeaderInfo}>
                        <span className={styles.badgeCategoria}>{doc.categoria}</span>
                        <span className={styles.docData}>Publicado em {doc.data}</span>
                      </div>
                      <h3 className={styles.docTitulo}>{doc.titulo}</h3>
                      <p className={styles.docDescricao}>{doc.descricao}</p>
                      <div className={styles.docActions}>
                        <button 
                          type="button"
                          className={styles.btnVisualizar}
                          onClick={() => setDocSelecionado(doc)}
                        >
                          <FileText size={16} /> Ler Documento
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleAbrirLinkExterno(doc.linkDiario)} 
                          className={styles.btnLinkExterno}
                        >
                          <ExternalLink size={16} /> Consultar fonte oficial
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <Scale size={48} />
                  <p>Nenhum documento encontrado para sua busca.</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.ajudaFiscais}>
            <ShieldCheck size={20} />
            <span>Dica: Sempre fundamente seus autos com base no artigo específico da <strong>Lei nº 4.502/2021</strong>.</span>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE LEITURA DO DOCUMENTO */}
      {docSelecionado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.badgeCategoria}>{docSelecionado.categoria}</span>
                <h3 style={{ margin: '0.4rem 0 0 0', color: '#065f46' }}>{docSelecionado.titulo}</h3>
              </div>
              <button type="button" onClick={() => setDocSelecionado(null)} className={styles.closeBtnModal}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p style={{ fontSize: '0.85rem', color: '#047857' }}>{docSelecionado.descricao}</p>
              
              <div className={styles.textContainerDoc}>
                <pre>{docSelecionado.conteudoCompleto}</pre>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                type="button" 
                onClick={() => handleCopiarTrecho(docSelecionado.conteudoCompleto)}
                className={styles.btnLinkExterno}
              >
                <Copy size={16} /> Copiar resumo
              </button>
              <button type="button" onClick={() => setDocSelecionado(null)} className={styles.btnCancel}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
