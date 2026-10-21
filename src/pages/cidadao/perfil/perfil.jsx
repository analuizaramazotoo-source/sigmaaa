import ResponsiveSidebar from '../../../components/ResponsiveSidebar';
import { getSession, perform, saveProfile } from '../../../services/originalScreens';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './perfil.module.css';

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

import { 
  User, 
  Mail, 
  Phone, 
  FileBadge, 
  ArrowLeft, 
  Save, 
  KeyRound, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function Perfil() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const [formData, setFormData] = useState({
    nome: getSession()?.usuario.nome_usuario || "",
    email: getSession()?.usuario.email_usuario || "",
    celular: getSession()?.usuario.telefone_usuario || "",
    cpf: getSession()?.usuario.cpf_usuario || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (salvando) return;
    setSalvando(true); setMensagemSucesso('');
    await perform(async () => {
      const body = { nome_usuario: formData.nome, email_usuario: formData.email, telefone_usuario: formData.celular, cpf_usuario: formData.cpf };
      await saveProfile(body); setMensagemSucesso('Perfil atualizado com sucesso!');
      setTimeout(() => setMensagemSucesso(''), 4000);
    });
    setSalvando(false);
  };

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR INSTITUCIONAL COMPACTA */}
      <ResponsiveSidebar className={styles.sidebar}>
        <div className={styles.brandHeader}>
          <div className={styles.logoIcon}>
            <img src={arvoreLogo} alt="Logo Árvore" className={styles.brandImg} />
          </div>
          <div className={styles.brandText}>
            <strong>SISTEMA DE GESTÃO</strong>
            <span>MUNICIPAL AMBIENTAL</span>
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.avatarLarge}>
            <User size={48} />
          </div>
          <h2>{formData.nome}</h2>
          <p>{formData.email}</p>
          
          <div className={styles.statusBadge}>
            <ShieldCheck size={16} />
            <span>Cidadão Verificado</span>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <img src={prefeituraLogo} alt="Logo Prefeitura" className={styles.footerLogoImg} />
        </div>
      </ResponsiveSidebar>

      {/* ÁREA PRINCIPAL */}
      <div className={styles.mainWrapper}>
        {/* CABEÇALHO */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Meu Perfil de Cidadão</h1>
              <p className={styles.subTitle}>Gerencie suas informações cadastrais e segurança da conta</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button 
              type="button" 
              className={styles.btnVoltar} 
              onClick={() => navigate('/cidadao')}
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CONTEÚDO CENTRAL */}
        <main className={styles.mainContent}>
          {mensagemSucesso && (
            <div className={styles.alertSuccess} role="status">
              <CheckCircle2 size={18} />
              <span>{mensagemSucesso}</span>
            </div>
          )}

          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <User size={22} className={styles.headerIcon} />
                <div>
                  <h2>Informações Pessoais</h2>
                  <p>Mantenha seus dados de contato e identificação atualizados.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSalvar} className={styles.profileForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome Completo *</label>
                  <div className={styles.inputWithIcon}>
                    <User size={18} className={styles.inputIcon} />
                    <input 
                      id="nome"
                      name="nome"
                      type="text" 
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail *</label>
                  <div className={styles.inputWithIcon}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="celular">Celular / WhatsApp *</label>
                  <div className={styles.inputWithIcon}>
                    <Phone size={18} className={styles.inputIcon} />
                    <input 
                      id="celular"
                      name="celular"
                      type="text" 
                      value={formData.celular}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cpf">CPF *</label>
                  <div className={styles.inputWithIcon}>
                    <FileBadge size={18} className={styles.inputIcon} />
                    <input 
                      id="cpf"
                      name="cpf"
                      type="text" 
                      value={formData.cpf}
                      onChange={handleChange}
                      disabled
                      className={styles.disabledInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.sectionDivider}>
                <KeyRound size={18} />
                <span>Alterar Senha de Acesso</span>
              </div>

              <Link className={styles.btnSalvar} to="/alterar">Alterar minha senha</Link>

              <div className={styles.formActions}>
                <button type="submit" disabled={salvando} className={styles.btnSalvar}>
                  <Save size={18} />
                  <span>{salvando ? 'Salvando...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </form>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Painel do Cidadão.</p>
        </footer>
      </div>
    </div>
  );
}