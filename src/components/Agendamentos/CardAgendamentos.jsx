import React from 'react';

const CardAgendamentos = ({ todosAgendamentos }) => {

  // Formata a data em dd/MM/yyyy considerando apenas UTC
  const formatDataUTC = (isoString) => {
    if (!isoString) return "Não informado";
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // months 0-11
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // Formata horário em HH:mm considerando apenas UTC
  const formatHorarioUTC = (isoString) => {
    if (!isoString) return "Não informado";
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      {todosAgendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        todosAgendamentos.map((agendamento) => (
          <div className="card" key={agendamento._id}>
            <h3 className="empresa">{agendamento.nomeEmpresa}</h3>

            <div className="telefone">
              <strong>📞</strong> {agendamento.telefone || "Não informado"}
            </div>

            <div className="agendamento-info">
              <p><strong>📅 Data:</strong> {formatDataUTC(agendamento.retornoAgendado)}</p>
              <p><strong>⏰ Horário:</strong> {formatHorarioUTC(agendamento.dataTime)}</p>
              <p><strong>📝 Obs.:</strong> {agendamento.observacao || "Nenhuma"}</p>
            </div>

            <div className="extra-info">
              <p><strong>Nicho:</strong> {agendamento.nicho || "Não informado"}</p>
              <p><strong>Vendedor:</strong> {agendamento.usuarioNome || "Não atribuído"}</p>
            </div>

            <div className="tempo-restante">
              ⏳ Tempo Restante: <span>{agendamento.diasRestantes}</span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CardAgendamentos;
