import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Phone, Bell, ChevronDown, Leaf
} from 'lucide-react';

export default function Layout({ 
  children, 
  nomeSistema = "CADASTRO", 
  subtituloSistema = "SEGURO AMBIENTAL", 
  tituloPagina = "Cadastro Seguro Ambiental", 
  subtituloPagina = "Secretaria do Meio Ambiente" 
}) {
  const location = useLocation();

  return (
    <div className={styles.container}>
      
      {/* ================= MENU LATERAL (SIDEBAR) ================= */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Leaf size={32} />
          <div>
            <strong>{nomeSistema}</strong>
            <span>{subtituloSistema}</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
            <Home size={20} /> Dashboard
          </Link>
          <Link to="/mapa" className={location.pathname === '/mapa' ? styles.active : ''}>
            <MapIcon size={20} /> Mapa
          </Link>
          <Link to="/ocorrencias" className={location.pathname === '/ocorrencias' ? styles.active : ''}>
            <ClipboardList size={20} /> Ocorrências
          </Link>
          <Link to="/solicitacoes" className={location.pathname === '/solicitacoes' ? styles.active : ''}>
            <FileText size={20} /> Minhas Solicitações
          </Link>
          <Link to="/relatorios" className={location.pathname === '/relatorios' ? styles.active : ''}>
            <BarChart2 size={20} /> Relatórios
          </Link>
          <Link to="/orientacoes" className={location.pathname === '/orientacoes' ? styles.active : ''}>
            <HelpCircle size={20} /> Orientações
          </Link>
          <Link to="/contato" className={location.pathname === '/contato' ? styles.active : ''}>
            <Phone size={20} /> Contato
          </Link>
        </nav>

        <div className={styles.helpCard}>
          <div className={styles.helpIcon}><Phone size={20} /></div>
          <div>
            <strong>Precisa de ajuda?</strong>
            <p>Fale conosco</p>
          </div>
        </div>
      </aside>

      {/* ================= ÁREA PRINCIPAL ================= */}
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn}>☰</button>
            <div className={styles.headerTitles}>
              <h1>{tituloPagina}</h1>
              <p>{subtituloPagina}</p>
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.notification}>
              <Bell size={20} />
              <span className={styles.badge}>3</span>
            </div>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>AL</div>
              <div className={styles.userInfo}>
                <strong>Ana Luiza</strong>
                <span>Cidadão</span>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* CONTEÚDO DINÂMICO DAS PÁGINAS */}
        <main className={styles.pageContent}>
          <div className={styles.contentInner}>
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}