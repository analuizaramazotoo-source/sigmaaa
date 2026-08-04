import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './autosNotificacoes.module.css';
import { ArrowLeft, FileText, Plus, Search, FileCheck, AlertTriangle } from 'lucide-react';

export default function AutosNotificacoes() {
  const navigate = useNavigate();

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
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.btnBack} onClick={() => navigate('/home')}>
              <ArrowLeft size={18} /> Voltar ao Painel
            </button>
            <div>
              <h1 className={styles.headerTitle}>Autos e Notificações</h1>
              <span className={styles.headerSubtitle}>Registro de infrações e advertências ambientais</span>
            </div>
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