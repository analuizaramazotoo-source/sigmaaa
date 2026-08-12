import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styles from './autosNotificacoes.module.css';
import { 
  ArrowLeft, FileText, Plus, Search, FileCheck, 
  Shield, Map as MapIcon, ClipboardList, BarChart2, HelpCircle, Home as HomeIcon 
} from 'lucide-react';

export default function AutosNotificacoes() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const autos = [
    { 
      id: "AUTO-2026/089", 
      infrator: "Construtora Silva LTDA", 
      data: "01/08/2026", 
      status: "Notificado",
      statusClass: styles.statusNotificado,
      tipo: "Descarte Irregular"
    },
    { 
      id: "AUTO-2026/090", 
      infrator: "Posto Central S/A", 
      data: "03/08/2026", 
      status: "Autuado",
      statusClass: styles.statusAutuado,
      tipo: "Vazamento / Poluição"
    },
    { 
      id: "AUTO-2026/091", 
      infrator: "Comércio de Madeiras Verde", 
      data: "05/08/2026", 
      status: "Em Análise",
      statusClass: styles.statusAnalise,
      tipo: "Desmatamento"
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
              <h1 className={styles.headerTitle}>Autos e Notificações</h1>
              <span className={styles.headerSubtitle}>Registro de infrações e advertências ambientais</span>
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
          <div className={styles.loginCard}>
            <div className={styles.loginCardHeader}>
              <div className={styles.headerIconBadge}>
                <FileText size={24} />
              </div>
              <div>
                <h2>Documentos Fiscais Emitidos</h2>
                <p>Consulte ou emita novos autos de infração e notificações oficiais.</p>
              </div>
            </div>

            <div className={styles.actionsBar}>
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Buscar por auto ou infrator..." />
              </div>

              <button className={styles.btnSubmit}>
                <Plus size={18} /> Novo Auto de Infração
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nº Auto</th>
                    <th>Infror / Empresa</th>
                    <th>Tipo de Infração</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {autos.map((item) => (
                    <tr key={item.id}>
                      <td className={styles.codeCell}>
                        <FileCheck size={16} /> {item.id}
                      </td>
                      <td><strong>{item.infrator}</strong></td>
                      <td>{item.tipo}</td>
                      <td>{item.data}</td>
                      <td>
                        <span className={`${styles.badgeStatus} ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.btnAction}>Ver Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}