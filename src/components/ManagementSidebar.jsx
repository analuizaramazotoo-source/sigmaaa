import { NavLink } from 'react-router-dom';
import { MapPin, Map, ClipboardList, FileText, BarChart2, BookOpen, User, Settings } from 'lucide-react';
import ResponsiveSidebar from './ResponsiveSidebar';
import styles from './StaffNavigation.module.css';
import tree from '../assets/arvore.png';
import city from '../assets/prefeitura.png';

const items = [
  ['/homeg', 'Visão Geral da Cidade', MapPin],
  ['/geoprocessamento', 'Geoprocessamento', Map],
  ['/fila-fiscalizacao', 'Fila de Fiscalização', ClipboardList],
  ['/autos-notificacoes-gestao', 'Autos e Notificações', FileText],
  ['/relatorios-tecnicos-gestao', 'Relatórios Técnicos', BarChart2],
  ['/legislacao', 'Legislação', BookOpen],
  ['/perfilg', 'Meu Perfil', User],
  ['/config', 'Configurações', Settings],
];

export default function ManagementSidebar() {
  return <ResponsiveSidebar className={styles.sidebar}>
    <div className={styles.brandHeader}>
      <div className={styles.logoIcon}><img src={tree} alt="Logo Meio Ambiente" className={styles.brandImg} /></div>
      <div className={styles.brandText}><strong>SISTEMA DE GESTÃO</strong><span>MUNICIPAL AMBIENTAL</span></div>
    </div>
    <nav className={styles.sidebarNav} aria-label="Menu da gestão">
      <span className={styles.navCategory}>Menu do Gestor</span>
      {items.map(([to, label, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}><span className={styles.navIcon}><Icon size={22} /></span><span>{label}</span></NavLink>)}
    </nav>
    <div className={styles.sidebarFooter}><img src={city} alt="Logo Prefeitura" className={styles.footerLogoImg} /></div>
  </ResponsiveSidebar>;
}
