import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./perfil.module.css";

import prefeituraLogo from "../../../assets/prefeitura.png";
import arvoreLogo from "../../../assets/arvore.png";

import { 
  User, 
  Mail, 
  Phone, 
  FileBadge, 
  Lock, 
  ArrowLeft, 
  Save, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function Perfil() {
  const navigate = useNavigate();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const [formData, setFormData] = useState({
    nome: "Lucas Pereira",
    email: "lucas.pereira@gmail.com",
    celular: "(14) 99888-7777",
    cpf: "432.887.654-00",
    senha: "",
    confirmarSenha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      alert("As senhas informadas não coincidem.");
      return;
    }

    setMensagemSucesso("Perfil atualizado com sucesso!");
    setTimeout(() => setMensagemSucesso(""), 4000);
  };

  return (
    <div className={styles.appContainer}>
      {/* SIDEBAR INSTITUCIONAL COMPACTA */}
      <aside className={styles.sidebar}>
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
      </aside>

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
            <div className={styles.alertSuccess}>
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="senha">Nova Senha</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input 
                      id="senha"
                      name="senha"
                      type={senhaVisivel ? "text" : "password"} 
                      placeholder="Deixe em branco para não alterar"
                      value={formData.senha}
                      onChange={handleChange}
                      minLength={8}
                    />
                    <button 
                      type="button" 
                      className={styles.togglePassBtn}
                      onClick={() => setSenhaVisivel(!senhaVisivel)}
                    >
                      {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input 
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={confirmarSenhaVisivel ? "text" : "password"} 
                      placeholder="Confirme a nova senha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      minLength={8}
                    />
                    <button 
                      type="button" 
                      className={styles.togglePassBtn}
                      onClick={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
                    >
                      {confirmarSenhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.btnSalvar}>
                  <Save size={18} />
                  <span>Salvar Alterações</span>
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