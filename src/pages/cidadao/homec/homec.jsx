import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './homec.module.css';
import { getSession, logout } from '../../../services/api';

import {
  FileWarning,
  MapPin,
  Search,
  HelpCircle,
  ChevronDown,
  User,
  LogOut,
  ShieldAlert,
  Trees
} from "lucide-react";

import bannerFundo from "../../../assets/banner.png";

const duvidasFrequentes = [
  {
    pergunta: "Como denunciar lixo irregular?",
    resposta: "Você pode utilizar a opção 'Relatar um Problema' ou 'Denúncia Urgente' anexando fotos e localização exata do ocorrido."
  },
  {
    pergunta: "Quanto tempo demora para resolver?",
    resposta: "O prazo depende da avaliação da Secretaria. Acompanhe o andamento na área de solicitações."
  },
  {
    pergunta: "Posso enviar fotos do problema?",
    resposta: "Sim! Ao preencher a solicitação ou relato, você pode anexar fotos do local diretamente pelo formulário."
  }
];

export default function Homec() {
  const navigate = useNavigate();
  const [duvidaAberta, setDuvidaAberta] = useState(null);
  const [modalSairAberto, setModalSairAberto] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const toggleDuvida = (index) => {
    setDuvidaAberta(duvidaAberta === index ? null : index);
  };

  const handleConfirmarSair = async () => {
    try { await logout(); } catch { /* A sessão local já foi encerrada. */ }
    navigate("/");
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        
        {/* CABEÇALHO SUPERIOR PADRONIZADO (BARRA BRANCA) */}
        <header className={styles.topHeader}>
          <div className={styles.brandHeader}>
            <div className={styles.logoIcon}>
              <Trees size={22} color="#ffffff" />
            </div>
            <div className={styles.brandText}>
              <strong>PAINEL DO CIDADÃO</strong>
              <span>SEGURO AMBIENTAL</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <Link to="/perfil" className={styles.userInfoBox}>
              <div className={styles.userAvatarIcon}>
                <User size={18} />
              </div>
              <div className={styles.userDetails}>
                <strong>{getSession()?.usuario.nome_usuario}</strong>
                <span>Cidadão • Ativo</span>
              </div>
            </Link>

            {/* BOTÃO DE SAIR COM EFEITO HOVER VERMELHO */}
            <button 
              type="button" 
              className={styles.btnSairTopo} 
              onClick={() => setModalSairAberto(true)}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              title="Encerrar Sessão"
              style={{
                backgroundColor: isLogoutHovered ? '#dc2626' : '#ffffff',
                border: isLogoutHovered ? '1px solid #dc2626' : '1px solid #d1fae5',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={18} color={isLogoutHovered ? '#ffffff' : '#dc2626'} />
            </button>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className={styles.mainContent}>
          <div className={styles.pageContainer}>
            
            {/* BANNER PRINCIPAL */}
            <section
              className={styles.banner}
              style={{ backgroundImage: `url(${bannerFundo})` }}
            >
              <div className={styles.overlayBanner}>
                <h1>Bem-vindo!</h1>
                <p>Colabore com o Meio Ambiente!</p>
              </div>
            </section>

            {/* TRÊS CARDS SUPERIORES */}
            <section className={styles.cardsGrid}>
              
              <div className={`${styles.cardAction} ${styles.cardAzul}`}>
                <div className={styles.cardHeaderArea}>
                  <div className={styles.cardIconBadge}>
                    <FileWarning size={22} />
                  </div>
                  <h3>Relatar um Problema</h3>
                </div>
                <p>Utilize este espaço para descrever detalhadamente qualquer problema encontrado.</p>
                <Link to="/relatar-problema" className={styles.btnCard}>
                  ENVIAR RELATO
                </Link>
              </div>

              <div className={`${styles.cardAction} ${styles.cardVerde}`}>
                <div className={styles.cardHeaderArea}>
                  <div className={styles.cardIconBadge}>
                    <MapPin size={22} />
                  </div>
                  <h3>Solicitar Serviço</h3>
                </div>
                <p>Faça solicitações ambientais e acompanhe todo o andamento.</p>
                <Link to="/solicitar" className={styles.btnCard}>
                  PREENCHER SOLICITAÇÃO
                </Link>
              </div>

              <div className={`${styles.cardAction} ${styles.cardLaranja}`}>
                <div className={styles.cardHeaderArea}>
                  <div className={styles.cardIconBadge}>
                    <Search size={22} />
                  </div>
                  <h3>Acompanhar Solicitação</h3>
                </div>
                <p>Consulte o andamento das suas solicitações em tempo real.</p>
                <Link to="/status" className={styles.btnCard}>
                  MINHAS SOLICITAÇÕES
                </Link>
              </div>

            </section>

            {/* ÁREA INFERIOR DE CONTEÚDO */}
            <div className={styles.bottomGrid}>
              
              <div className={styles.cardUrgente}>
                <div className={styles.cardUrgenteContent}>
                  <div className={styles.urgenteHeaderGroup}>
                    <ShieldAlert size={24} color="#dc2626" />
                    <h3 className={styles.urgenteTitle}>Denúncia Urgente</h3>
                  </div>
                  <p className={styles.urgenteSub}>
                    EM CASO DE EMERGÊNCIAS AMBIENTAIS, FAÇA UMA DENÚNCIA RÁPIDA.
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.btnEmergencia}
                  onClick={() => navigate("/denuncia")}
                >
                  RELATAR EMERGÊNCIA
                </button>
              </div>

              <div className={styles.cardDuvidas}>
                <div className={styles.cardDuvidasHeader}>
                  <HelpCircle size={22} />
                  <h3>Dúvidas Frequentes</h3>
                </div>
                
                <div className={styles.listaDuvidas}>
                  {duvidasFrequentes.map((item, index) => (
                    <div key={index} className={styles.duvidaBox}>
                      <button 
                        className={styles.itemDuvida}
                        onClick={() => toggleDuvida(index)}
                        type="button"
                      >
                        <span>{item.pergunta}</span>
                        <ChevronDown 
                          size={18} 
                          className={`${styles.chevronDuvida} ${duvidaAberta === index ? styles.chevronOpen : ""}`} 
                        />
                      </button>
                      {duvidaAberta === index && (
                        <div className={styles.respostaDuvida}>
                          <p>{item.resposta}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>

        <footer className={styles.footerGlobal}>
          <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
        </footer>
      </div>

      {/* MODAL DE SAÍDA */}
      {modalSairAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalIconBadge}>
              <LogOut size={28} />
            </div>
            <h2>Encerrar Sessão</h2>
            <p>Tem certeza que quer sair?</p>

            <div className={styles.modalActions}>
              <button 
                className={styles.btnModalCancelar} 
                onClick={() => setModalSairAberto(false)}
              >
                Cancelar
              </button>
              <button 
                className={styles.btnModalConfirmar} 
                onClick={handleConfirmarSair}
              >
                Sim, Quero Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
