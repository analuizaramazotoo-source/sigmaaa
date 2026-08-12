import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './legislacao.module.css';
import { 
  ArrowLeft, HelpCircle, BookOpen, Search, 
  FileText, ExternalLink, Scale, ShieldCheck,
  Shield, Map as MapIcon, ClipboardList, BarChart2, Home as HomeIcon 
} from 'lucide-react';

export default function Legislacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const [busca, setBusca] = useState('');

  const isActive = (path) => location.pathname === path;

  const documentos = [
    {
      id: 1,
      titulo: "Lei Municipal nº 4.502/2021",
      categoria: "Código Ambiental",
      descricao: "Dispõe sobre a Política Municipal de Meio Ambiente e o Código de Proteção Ambiental.",
      data: "15/01/2021"
    },
    {
      id: 2,
      titulo: "Decreto nº 1.209/2023",
      categoria: "Queimadas Urbanas",
      descricao: "Regulamenta a fiscalização, penalidades e ritos de apuração para queimadas em áreas urbanas.",
      data: "10/05/2023"
    },
    {
      id: 3,
      titulo: "Instrução Normativa SEMMA 04/2024",
      categoria: "Poda e Supressão",
      descricao: "Estabelece critérios técnicos para autorização de poda e supressão de vegetação nativa.",
      data: "02/02/2024"
    },
    {
      id: 4,
      titulo: "Lei Federal nº 9.605/1998",
      categoria: "Crimes Ambientais",
      descricao: "Lei de Crimes Ambientais - Sanções penais e administrativas derivadas de condutas lesivas ao meio ambiente.",
      data: "12/02/1998"
    }
  ];

  const docsFiltrados = documentos.filter(doc => 
    doc.titulo.toLowerCase().includes(busca.toLowerCase()) || 
    doc.categoria.toLowerCase().includes(busca.toLowerCase())
  );

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
              <h1 className={styles.headerTitle}>Biblioteca de Legislação</h1>
              <span className={styles.headerSubtitle}>Base legal e normativas para fiscalização ambiental</span>
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
                        <button className={styles.btnVisualizar}>
                          <FileText size={16} /> Ler Documento
                        </button>
                        <button className={styles.btnLinkExterno}>
                          <ExternalLink size={16} /> Ver no Diário Oficial
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
      </div>
    </div>
  );
}