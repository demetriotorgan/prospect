// utilsAgendamentos.js

// Retorna a classe CSS conforme o status do agendamento
export const getTempoRestanteClass = (diasRestantes) => {
  if (diasRestantes === "Agendamento Expirado") {
    return "tempo-restante atrasado";
  }
  return "tempo-restante";
};

// Calcula o tempo restante (ou atraso) em horas/minutos, para reuniões marcadas para "Hoje"
export const calcularTempoHoje = (isoDataTime) => {
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
    return `Reunião em ${horas}h ${minutos}min`;
  } else {
    return `Reunião Atrasada há ${horas}h ${minutos}min`;
  }
};

// Formata a data em dd/MM/yyyy considerando UTC
export const formatDataUTC = (isoString) => {
  if (!isoString) return "Não informado";
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

// Formata horário em HH:mm considerando UTC
export const formatHorarioUTC = (isoString) => {
  if (!isoString) return "Não informado";
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
