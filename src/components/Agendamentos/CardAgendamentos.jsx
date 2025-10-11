import React from 'react';

const CardAgendamentos = ({ todosAgendamentos }) => {
  //Retorna a classe CSS conforme o status
  const getTempoRestanteClass = (diasRestantes) =>{
    if(diasRestantes === 'Agendamento Expirado'){
      return 'tempo-restante atrasado'
    }
    return 'tempo-restante'
  };

  // Calcula o tempo restante (ou atraso) em horas/minutos, para reuniões marcadas para "Hoje"
const calcularTempoHoje = (isoDataTime) => {
  if (!isoDataTime) return "Horário não informado";

  const dataReuniao = new Date(
  new Date(isoDataTime).toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
);
const agora = new Date(
  new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
);

  // diferença em milissegundos
  const diffMs = dataReuniao - agora;

  // converte para horas e minutos
  const diffAbs = Math.abs(diffMs);
  const horas = Math.floor(diffAbs / (1000 * 60 * 60));
  const minutos = Math.floor((diffAbs / (1000 * 60)) % 60);

  if (diffMs > 0) {
    // reunião ainda vai acontecer
    return `Reunião em ${horas}h ${minutos}min`;
  } else {
    // reunião já passou
    return `Reunião Atrasada há ${horas}h ${minutos}min`;
  }
};


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
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
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
              <p><strong>Vendedor:</strong> {agendamento.emailUsuario || "Não atribuído"}</p>
            </div>

            <div className={getTempoRestanteClass(agendamento.tempoRestante)}>
              ⏳ Tempo Restante: <span className={agendamento.tempoRestante === 'atrasado' ? 'pulse' : ''}>
                {agendamento.tempoRestante === 'Hoje' ?
                calcularTempoHoje(agendamento.dataTime) :
                agendamento.tempoRestante
                }</span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CardAgendamentos;