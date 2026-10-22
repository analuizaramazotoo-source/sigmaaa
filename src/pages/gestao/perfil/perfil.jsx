import StaffProfileLink from '../../../components/StaffProfileLink';
import ManagementSidebar from '../../../components/ManagementSidebar';
import { api, getSession, perform, saveProfile } from '../../../services/originalScreens';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './perfil.module.css';
import { Save, Key, Mail, Phone, BadgeCheck, ArrowLeft } from 'lucide-react';

export default function Perfil() {
  const navigate = useNavigate();

  // Estado dos dados do Perfil
  const [userData, setUserData] = useState({ name: getSession()?.usuario.nome_usuario || '', email: getSession()?.usuario.email_usuario || '', phone: getSession()?.usuario.telefone_usuario || '', matricula: '', cargo: '', departamento: '', setor: '' });
  useEffect(() => { perform(async () => { const u = await api('/usuarios/me'); setUserData({ name: u.nome_usuario, email: u.email_usuario, phone: u.telefone_usuario || '', matricula: u.matricula_usuario || '', cargo: u.cargo_gestor || '', departamento: u.departamento_gestor || '', setor: u.setor_gestor || '' }); }); }, []);

  const [salvando, setSalvando] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); if (salvando) return; setSalvando(true); setSavedSuccess(false); await perform(async () => { await saveProfile({ nome_usuario: userData.name, email_usuario: userData.email, telefone_usuario: userData.phone }); setSavedSuccess(true); setTimeout(() => setSavedSuccess(false), 3000); }); setSalvando(false);
  };

  return (
    <div className={styles.appContainer}>
      {/* OVERLAY PARA MOBILE */}

      {/* SIDEBAR OPERACIONAL */}
      <ManagementSidebar />

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.headerTitle}>Perfil do Servidor</h1>
              <span className={styles.headerSubtitle}>Dados cadastrais e credenciais de acesso</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            {/* DROPDOWN USUÁRIO */}
            <StaffProfileLink name={userData.name} role={userData.cargo || 'Gestão'} active />

            {/* BOTÃO AMARELO DE VOLTAR */}
            <button 
              type="button"
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
                gap: '6px',
                marginLeft: '10px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CONTEÚDO DO PERFIL */}
        <main className={styles.mainContent}>
          {savedSuccess && (
            <div className={`${styles.infoBanner} ${styles.status_success}`}>
              <div className={styles.infoContent}>
                <BadgeCheck size={24} />
                <div>
                  <strong>Perfil atualizado com sucesso!</strong>
                  <p>Suas alterações foram salvas no sistema municipal.</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.contentGrid}>
            {/* CARTÃO DE CREDENCIAL INTERNA */}
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Identificação Funcional</h3>
              </div>

              <div className={styles.profileBadgeWrapper}>
                <div className={styles.profileAvatarWrapper}>
                  <div className={styles.profileAvatar}>{userData.name.slice(0, 2).toUpperCase()}</div>

                </div>

                <div>
                  <h2 className={styles.profileName}>{userData.name}</h2>
                  <span className={styles.profileRole}>{userData.cargo}</span>
                </div>

                <div className={styles.badgeFunctionalCard}>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Matrícula:</span>
                    <strong>{userData.matricula}</strong>
                  </div>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Órgão:</span>
                    <strong>{userData.departamento}</strong>
                  </div>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Setor:</span>
                    <strong>{userData.setor}</strong>
                  </div>
                  <div className={styles.badgeFunctionalItem}>
                    <span>Status:</span>
                    <span className={`${styles.badgeStatus} ${styles.status_resolvida}`}>
                      Conta ativa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO DE EDIÇÃO */}
            <div className={styles.cardSection}>
              <div className={styles.cardHeader}>
                <h3>Dados de Contato & Acesso</h3>
              </div>

              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <label>
                  Nome Completo
                  <input 
                    type="text" 
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    required
                  />
                </label>

                <label>
                  E-mail Institucional
                  <div className={styles.inputWithIcon}>
                    <Mail size={16} className={styles.inputIcon} />
                    <input 
                      type="email" 
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      required
                    />
                  </div>
                </label>

                <label>
                  Telefone / Ramal Interno
                  <div className={styles.inputWithIcon}>
                    <Phone size={16} className={styles.inputIcon} />
                    <input 
                      type="text" 
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      required
                    />
                  </div>
                </label>

                <div className={styles.menuDivider} />

                <div className={styles.profileFormActions}>
                  <button 
                    type="button" 
                    className={styles.btnSecondary} 
                    onClick={() => navigate("/alterar")}
                  >
                    <Key size={16} /> Alterar Senha
                  </button>
                  <button type="submit" disabled={salvando} className={styles.btnPrimaryModal}>
                    <Save size={16} /> {salvando ? 'Salvando...' : 'Salvar Perfil'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE SAÍDA */}

    </div>
  );
}
