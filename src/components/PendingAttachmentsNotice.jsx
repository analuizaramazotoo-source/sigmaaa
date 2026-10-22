export default function PendingAttachmentsNotice({ record }) {
  if (!record) return null;
  return <p role="status" style={{ padding: 14, margin: '16px 0', border: '1px solid #a7f3d0', borderRadius: 8, color: '#065f46', background: '#f0fdf4', fontSize: 14, lineHeight: 1.6 }}>
    Ocorrência <strong>{record.protocolo_ocorrencia}</strong> já registrada. Os dados estão salvos; falta concluir o envio das imagens. Em caso de falha, envie novamente para retomar somente os anexos pendentes, sem criar outro registro.
  </p>;
}
