import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './geoprocessamento.module.css';
import { ArrowLeft, Map as MapIcon, Layers, Filter, Navigation } from 'lucide-react';

export default function Geoprocessamento() {
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO COM O BOTÃO AMARELO NO CANTO DIREITO */}
        <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Módulo de Geoprocessamento</h1>
              <span className={styles.headerSubtitle}>Mapeamento espacial e zonas ambientais</span>
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
                <MapIcon size={24} />
              </div>
              <div>
                <h2>Mapa Interativo de Análise Territorial</h2>
                <p>Monitore zonas de preservação, alertas de satélite e áreas sob vistoria.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button className={styles.btnSubmit} style={{ flex: 'none', width: 'auto' }}>
                <Layers size={16} /> Camadas do Mapa
              </button>
              <button className={styles.btnSubmit} style={{ flex: 'none', width: 'auto', backgroundColor: '#f1f5f9', color: '#047857' }}>
                <Filter size={16} /> Filtros de Área
              </button>
            </div>

            <div style={{ 
              backgroundColor: '#ecfdf5', 
              border: '2px dashed #a7f3d0', 
              borderRadius: '12px', 
              minHeight: '400px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#059669' 
            }}>
              <Navigation size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <p style={{ fontWeight: 600 }}>Camada de Geoprocessamento Carregada</p>
              <small style={{ opacity: 0.8 }}>Integração com dados GIS e Satélite em Tempo Real</small>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}