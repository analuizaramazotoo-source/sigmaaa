import { Link } from "react-router-dom";

export default function RelatoEnviado() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#dfe8d4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
          width: "500px",
        }}
      >
        <h1 style={{ color: "#2e7d32" }}>
          ✅ Relato enviado com sucesso!
        </h1>

        <p
          style={{
            marginTop: "15px",
            color: "#555",
            fontSize: "18px",
          }}
        >
          Seu relato foi encaminhado para análise da Secretaria do Meio
          Ambiente.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/cidadao">
            <button
              style={{
                padding: "12px 25px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#f57c00",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Voltar para Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}