import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './geoprocessamento.module.css';
import { ArrowLeft, Map as MapIcon, Layers, Filter, Search, Navigation } from 'lucide-react';

export default function Geoprocessamento() {
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.btnBack} onClick={() => navigate('/home')}>
              <ArrowLeft size={18} /> Voltar ao Painel
            </button>
            <div>
              <h1 className={styles.headerTitle}>Módulo de Geoprocessamento</h1>
              <span className={styles.headerSubtitle}>Mapeamento espacial e zonas ambientais</span>
            </div>
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