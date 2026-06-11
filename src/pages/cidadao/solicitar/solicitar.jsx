import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Solicitar.module.css";
import bannerFundo from "../../../assets/banner.png";
import arvoreLogo from "../../../assets/arvore.png";

export default function Solicitar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [problema, setProblema] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(file.name);
  };

  const handleEnviar = () => {
    if (!problema.trim()) {
      alert("Preencha o campo Problema.");
      return;
    }

    if (!descricao.trim()) {
      alert("Preencha o campo Descrição.");
      return;
    }

    // Foto continua opcional
    navigate("/relato-enviado");
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img src={arvoreLogo} alt="logo" />
          <div>
            <p>SECRETARIA DO</p>
            <h2>MEIO AMBIENTE</h2>
          </div>
        </div>

        <div className={styles.headerButtons}>
          <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
            Voltar
          </button>

          <button
            className={styles.menuIcon}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ⋮
          </button>
        </div>
      </header>

      {/* MENU LATERAL */}
      <div
        className={`${styles.menuLateral} ${
          menuAberto ? styles.menuAberto : ""
        }`}
      >
        <div className={styles.topoMenu}>
          <button
            className={styles.btnFechar}
            onClick={() => setMenuAberto(false)}
          >
            ✕
          </button>
        </div>

        <hr className={styles.menuDivisor} />

        <button
          className={`${styles.menuItem} ${styles.menuHome}`}
          onClick={() => navigate("/cidadao")}
        >
          🏠 Home
        </button>

        <button
          className={styles.menuItem}
          onClick={() => navigate("/relatar-problema")}
        >
          📄 Relatar problema
        </button>

        <button className={`${styles.menuItem} ${styles.menuAtivo}`}>
          📋 Solicitar serviço
        </button>

        <button
          className={styles.menuItem}
          onClick={() => navigate("/status")}
        >
          📊 Status
        </button>

        <button
          className={styles.menuItem}
          onClick={() => navigate("/chat")}
        >
          💬 Chat com Gestão
        </button>

        <button
          className={styles.menuItem}
          onClick={() => navigate("/perfil")}
        >
          👤 Perfil
        </button>
      </div>

      {/* BANNER */}
      <section
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerFundo})` }}
      >
        <div className={styles.bannerTexto}>
          <h1>Solicitar um serviço</h1>
          <p>
            Informe um problema ambiental na sua região para que
            <br />
            possamos ajudar a resolver!
          </p>
        </div>
      </section>

      {/* CARD PRINCIPAL */}
      <main className={styles.main}>
        <div className={styles.card}>
          {/* LADO ESQUERDO */}
          <div className={styles.cardEsquerdo}>
            <div className={styles.cardTituloArea}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="clipboard"
                className={styles.clipboardIcon}
              />
              <h3 className={styles.cardTitulo}>Detalhes do Problema</h3>
            </div>

            <label className={styles.labelCampo}>Problema:</label>
            <input
              type="text"
              className={styles.inputCampo}
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
            />

            <label className={styles.labelCampo}>Descrição:</label>
            <textarea
              className={styles.textareaCampo}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
            />

            <label className={styles.labelCampo}>Foto do Problema:</label>

            <div className={styles.fotoArea}>
              <div className={styles.fotoBox}>
                <span className={styles.fotoTexto}>
                  {foto ? foto : "Anexar foto (opcional)"}
                </span>
              </div>

              <div className={styles.fotoBotoes}>
                <label className={styles.btnCarregarFoto}>
                  CARREGAR FOTO
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFoto}
                  />
                </label>

                <button
                  className={styles.btnEnviarRelato}
                  onClick={handleEnviar}
                >
                  ENVIAR RELATO
                </button>
                
              </div>
            </div>
          </div>

          {/* LADO DIREITO - MAPA */}
          <div className={styles.cardDireito}>
            <div className={styles.mapaPlaceholder}>
              <div
                className={styles.mapaPonto}
                style={{ top: "30%", left: "65%" }}
              />
              <div
                className={styles.mapaPontoLaranja}
                style={{ top: "50%", left: "40%" }}
              />
              <div
                className={styles.mapaPontoAmarelo}
                style={{ top: "68%", left: "52%" }}
              />
              <div className={styles.mapaLinha} />
            </div>
          </div>
        </div>

        {/* AVISO */}
        <div className={styles.aviso}>
          <span className={styles.avisoIcone}>🟡</span>
          <span className={styles.avisoTexto}>
            Esteja localizado corretamente ao selecionar o local no mapa para
            facilitar o trabalho das equipes.
          </span>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer} />
    </div>
  );
}