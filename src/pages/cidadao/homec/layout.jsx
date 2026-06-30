import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';
import { 
  Home, Map as MapIcon, ClipboardList, FileText, BarChart2, 
  HelpCircle, Phone, Bell, ChevronDown, Leaf
} from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      
      {/* ================= MENU LATERAL ================= */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Leaf size={32} />
          <div>
            <strong>CADASTRO</strong>
            <span>SEGURO AMBIENTAL</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {/* Você pode ajustar os Links do 'to' para as suas rotas reais depois */}
          <Link to="/" className={styles.active}><Home size={20} /> Dashboard</Link>
          <Link to="/mapa"><MapIcon size={20} /> Mapa</Link>
          <Link to="/ocorrencias"><ClipboardList size={20} /> Ocorrências</Link>
          <Link to="/solicitacoes"><FileText size={20} /> Minhas Solicitações</Link>
          <Link to="/relatorios"><BarChart2 size={20} /> Relatórios</Link>
          <Link to="/orientacoes"><HelpCircle size={20} /> Orientações</Link>
          <Link to="/contato"><Phone size={20} /> Contato</Link>
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
      <main className={styles.mainWrapper}>
        
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.menuBtn}>☰</button>
            <div className={styles.headerTitles}>
              <h1>Cadastro Seguro Ambiental</h1>
              <p>Secretaria do Meio Ambiente</p>
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

        {/* CONTEÚDO DINÂMICO (Onde as telas vão aparecer) */}
        <div className={styles.pageContent}>
          {children}
        </div>

      </main>
    </div>
  );
}