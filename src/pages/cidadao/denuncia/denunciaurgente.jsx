import { api, perform, getSession, categoryId, refreshScreens } from '../../../services/originalScreens';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  AlertOctagon,
  Trees,
  User,
  ArrowLeft
} from 'lucide-react';

import styles from './denunciaurgente.module.css';
import TupaMap from '../../../components/TupaMap';
import { coordinateBody } from '../../../services/mapCoordinates';

export default function DenunciaUrgente() {
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [localizacao, setLocalizacao] = useState(null);
  const [protocolo, setProtocolo] = useState('');
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    endereco: '',
    referencia: '',
    detalhes: '',
    riscoImediato: 'sim'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); if (enviando) return; setEnviando(true);
    await perform(async () => {
      const result = await api('/ocorrencias', { method: 'POST', body: {
        titulo_ocorrencia: `[URGENTE] ${formData.tipoDenuncia.replaceAll('_', ' ')}`,
        id_categoria: await categoryId(formData.tipoDenuncia), logradouro_ocorrencia: formData.endereco,
        descricao_ocorrencia: `${formData.detalhes}\nReferência: ${formData.referencia}\nRisco imediato à vida/saúde: ${formData.riscoImediato}`, ...coordinateBody(localizacao)
      }}); setProtocolo(result.protocolo_ocorrencia); refreshScreens(); setEnviado(true);
    }); setEnviando(false);
  };

  const handleNovaDenuncia = () => {
    setLocalizacao(null);
    setFormData({
      tipoDenuncia: '',
      endereco: '',
      referencia: '',
      detalhes: '',
      riscoImediato: 'sim'
    });
    setEnviado(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', minHeight: '100vh', backgroundColor: '#f0fdf4', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* CABEÇALHO SUPERIOR */}
      <header style={{ width: '100%', height: '80px', backgroundColor: '#ffffff', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
        
        {/* LOGO E TÍTULO À ESQUERDA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#059669', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trees size={22} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <strong style={{ fontSize: '14px', letterSpacing: '0.5px', color: '#064e3b', fontWeight: '800' }}>PAINEL DO CIDADÃO</strong>
            <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700', letterSpacing: '0.3px' }}>SEGURO AMBIENTAL</span>
          </div>
        </div>

        {/* PERFIL E BOTÃO VOLTAR À DIREITA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* BOX DO PERFIL */}
          <Link to="/perfil" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f0fdf4', border: '1px solid #d1fae5', padding: '6px 16px', borderRadius: '24px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#dcfce7', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <strong style={{ fontSize: '13px', color: '#064e3b', fontWeight: '700' }}>{getSession()?.usuario.nome_usuario}</strong>
              <span style={{ fontSize: '11px', color: '#047857' }}>Cidadão • Ativo</span>
            </div>
          </Link>

          {/* BOTÃO AMARELO DE VOLTAR */}
          <button 
            type="button" 
            onClick={() => navigate('/cidadao')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fbc02d', color: '#000000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {!enviado ? (
            <div className={styles.card}>
              
              <div className={styles.cardHeader}>
                <div className={styles.iconBadgeUrgent}>
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h2>Registrar Denúncia Urgente</h2>
                  <p>Use este canal para crimes ambientais em andamento ou risco iminente.</p>
                </div>
              </div>

              <div className={styles.avisoBox}>
                <AlertOctagon size={20} className={styles.avisoIcon} />
                <span>
                  <strong>Atenção:</strong> Denúncias urgentes têm prioridade alta na fiscalização. Informe o local exato com o máximo de detalhes possível.
                </span>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.grid}>
                  
                  <div className={styles.fullWidth}>
                    <div className={styles.formGroup}>
                      <label htmlFor="tipoDenuncia">Tipo de Crime / Emergência *</label>
                      <select 
                        id="tipoDenuncia" 
                        value={formData.tipoDenuncia}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Selecione o tipo de emergência</option>
                        <option value="queimada_grave">Incêndio / Queimada Ativa</option>
                        <option value="vazamento_quimico">Vazamento Tóxico / Químico</option>
                        <option value="maus_tratos">Maus-Tratos / Caça Ilegal em Andamento</option>
                        <option value="descarte_perigoso">Descarte de Resíduos Perigosos</option>
                        <option value="desmatamento_ativo">Desmatamento Ilegal em Andamento</option>
                        <option value="outro_urgente">Outro Crime em Andamento</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.fullWidth}>
                    <div className={styles.formGroup}>
                      <label htmlFor="endereco">Endereço Exato / Ponto de Localização *</label>
                      <input 
                        type="text" 
                        id="endereco" 
                        placeholder="Rua, Número, Bairro ou Coordenadas" 
                        value={formData.endereco}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="referencia">Ponto de Referência</label>
                    <input 
                      type="text" 
                      id="referencia" 
                      placeholder="Ex: Próximo ao mercado X" 
                      value={formData.referencia}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="riscoImediato">Risco à Vida ou Saúde Humana? *</label>
                    <select 
                      id="riscoImediato" 
                      value={formData.riscoImediato}
                      onChange={handleChange}
                      required
                    >
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>

                  <div className={styles.fullWidth}>
                    <div className={styles.formGroup}>
                      <label htmlFor="detalhes">Descrição da Situação *</label>
                      <textarea 
                        id="detalhes" 
                        rows="4" 
                        placeholder="Descreva a situação com rapidez (ex: quantidade de fumaça, veículos envolvidos, etc.)" 
                        value={formData.detalhes}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                </div>

                <TupaMap selectedLocation={localizacao} onPick={setLocalizacao} height={280} />
                {/* BOTÃO DE AÇÃO APENAS ENVIAR */}
                <div className={styles.actions}>
                  <button type="submit" disabled={enviando} className={styles.btnUrgent}>
                    <Send size={16} /> Enviar Denúncia Urgente
                  </button>
                </div>
              </form>

            </div>
          ) : (
            <div className={styles.cardSucesso}>
              <div className={styles.iconBoxSucesso}>
                <CheckCircle2 size={64} className={styles.sucessoIcon} />
              </div>

              <h2>Denúncia Enviada com Prioridade!</h2>
              
              <p className={styles.descricaoSucesso}>
                Sua denúncia de emergência foi registrada para análise da fiscalização.
              </p>

              <div className={styles.infoGroup}>
                <div className={styles.infoBox}>
                  <span>Protocolo de Emergência:</span>
                  <strong>{protocolo}</strong>
                </div>
                <div className={styles.infoBox}>
                  <span>Prioridade:</span>
                  <span className={styles.badgeUrgente}>Alta / Imputada</span>
                </div>
              </div>

              <button type="button" className={styles.btnUrgent} onClick={handleNovaDenuncia}>
                <RotateCcw size={16} /> Registrar Outra Denúncia
              </button>
            </div>
          )}
        </div>
      </main>

      <footer style={{ textAlign: 'center', fontSize: '12px', color: '#047857', padding: '20px', borderTop: '1px solid #d1fae5', marginTop: 'auto' }}>
        <p>© 2026 Prefeitura Municipal • Secretaria do Meio Ambiente • Uso Restrito a Servidores Autorizados.</p>
      </footer>
    </div>
  );
}
