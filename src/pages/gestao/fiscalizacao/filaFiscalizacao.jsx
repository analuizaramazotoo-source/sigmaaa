import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './filaFiscalizacao.module.css';
import { ArrowLeft, ClipboardList, Flame, Trash2, Clock } from 'lucide-react';

export default function FilaFiscalizacao() {
  const navigate = useNavigate();

  const chamados = [
    { 
      id: 101, 
      titulo: "Descarte irregular de resíduos", 
      local: "Av. das Palmeiras, 450", 
      urgente: true,
      icon: <Trash2 size={20} color="#dc2626" />
    },
    { 
      id: 102, 
      titulo: "Queimada urbana em lote vago", 
      local: "Rua Ipê Amarelo, 88", 
      urgente: true,
      icon: <Flame size={20} color="#d97706" />
    },
    { 
      id: 103, 
      titulo: "Desmatamento não autorizado", 
      local: "Zona Rural - Setor Leste", 
      urgente: false,
      icon: <Clock size={20} color="#0284c7" />
    },
  ];

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO REORGANIZADO COM O BOTÃO AMARELO À DIREITA */}
        <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Fila de Fiscalização</h1>
              <span className={styles.headerSubtitle}>Chamados pendentes para vistoria em campo</span>
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
                <ClipboardList size={24} />
              </div>
              <div>
                <h2>Demandas Prioritárias</h2>
                <p>Selecione uma ocorrência para atribuir a uma equipe ou atualizar o status.</p>
              </div>
            </div>

            <div className={styles.listaChamados}>
              {chamados.map(item => (
                <div key={item.id} className={styles.cardChamado}>
                  <div className={styles.infoChamado}>
                    <div className={styles.iconWrapper}>
                      {item.icon}
                    </div>
                    <div>
                      <strong className={styles.tituloChamado}>
                        #{item.id} - {item.titulo}
                        {item.urgente && <span className={styles.badgeUrgente}>Urgente</span>}
                      </strong>
                      <span className={styles.localChamado}>{item.local}</span>
                    </div>
                  </div>
                  <button className={styles.btnSubmit}>
                    Assumir Chamado
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}