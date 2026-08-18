import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cadastrocidadao.module.css";
import {
  ArrowLeft,
  ShieldCheck,
  UserPlus
} from "lucide-react";

function CadastroCidadao() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Permite apenas números nos campos de Celular e CPF
  const handleOnlyNumbers = (e, setter) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setter(valorNumerico);
  };

  // Ao cadastrar, valida e vai para a área do cidadão
  const handleCadastrar = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem. Verifique e tente novamente.");
      return;
    }

    navigate("/cidadao");
  };

  return (
    <div className={styles.container}>
      {/* ÁREA PRINCIPAL SEM SIDEBAR */}
      <main className={styles.mainContent}>
        {/* CABEÇALHO SUPERIOR */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div>
              <h1 className={styles.pageTitle}>Cadastro Seguro Ambiental</h1>
              <p className={styles.subTitle}>Secretaria do Meio Ambiente</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button type="button" className={styles.btnVoltar} onClick={() => navigate("/")}>
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        {/* CORPO DA PÁGINA (CARD DE CADASTRO CENTRALIZADO) */}
        <div className={styles.contentBody}>
          <div className={styles.cardCadastro}>
            <div className={styles.cardHeaderArea}>
              <div className={styles.headerBadgeIcon}>
                <UserPlus size={22} color="#059669" />
              </div>
              <div>
                <h2 className={styles.cardTitle}>Cadastro do Cidadão</h2>
                <p className={styles.cardSub}>
                  Crie sua conta para relatar problemas ou solicitar serviços de meio ambiente na sua cidade.
                </p>
              </div>
            </div>

            <form onSubmit={handleCadastrar} className={styles.formGrid}>
              {/* ÁREA DOS INPUTS OBRIGATÓRIOS */}
              <div className={styles.inputsArea}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Nome Completo *</label>
                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    className={styles.inputField}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>E-mail *</label>
                  <input
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Celular *</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      maxLength={11}
                      value={celular}
                      onInput={(e) => handleOnlyNumbers(e, setCelular)}
                      className={styles.inputField}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>CPF *</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      maxLength={11}
                      value={cpf}
                      onInput={(e) => handleOnlyNumbers(e, setCpf)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.senhaGroup}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Senha *</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={styles.inputField}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Confirmar Senha *</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={styles.inputField}
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.btnArea}>
                  <button className={styles.btnCadastrar} type="submit">
                    FINALIZAR CADASTRO
                  </button>
                </div>
              </div>

              {/* ÁREA DA ILUSTRAÇÃO/INFORMAÇÃO */}
              <div className={styles.ilustrationArea}>
                <div className={styles.badgeSeguranca}>
                  <ShieldCheck size={64} className={styles.iconShield} />
                  <strong>Seus dados estão protegidos</strong>
                  <p>Cadastro oficial para acompanhamento e atendimento a solicitações ambientais.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CadastroCidadao;