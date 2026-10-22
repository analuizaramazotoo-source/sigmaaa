import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import styles from './StaffNavigation.module.css';

export default function StaffProfileLink({ name, role, active = false }) {
  return <Link to="/perfilg" className={`${styles.userProfile} ${active ? styles.userProfileActive : ''}`} title="Acessar meu perfil">
    <span className={styles.userAvatar}><User size={18} aria-hidden="true" /></span>
    <span className={styles.userInfo}><strong className={styles.userName}>{name}</strong><span className={styles.userRole}>{role || 'Gestão'}</span></span>
  </Link>;
}
