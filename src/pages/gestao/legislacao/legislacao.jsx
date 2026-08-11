import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './legislacao.module.css';
import { 
  ArrowLeft, HelpCircle, BookOpen, Search, 
  FileText, ExternalLink, Scale, ShieldCheck 
} from 'lucide-react';

export default function Legislacao() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');

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
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO REORGANIZADO COM O BOTÃO AMARELO À DIREITA */}
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