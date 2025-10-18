// prospecHelpers.js

/**
 * Converte uma string de data e hora em formato ISO
 * ajustando corretamente para o fuso de São Paulo (UTC-3)
 */
export function horaStringParaISO(dataStr, horaStr) {
  if (!horaStr || !dataStr) return null;

  const [h, m] = horaStr.split(":");
  const [ano, mes, dia] = dataStr.split("-");

  // Cria Date local no fuso de SP
  const dateLocal = new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia),
    Number(h),
    Number(m),
    0,
    0
  );

  // Converte para UTC mantendo o horário correto de SP
  const dateUTC = new Date(
    dateLocal.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  return dateUTC.toISOString();
}

/**
 * Monta o payload padronizado para atualizar a prospecção
 */
export function montarPayload({
  prospec,
  resultado,
  observacao,
  notaAtual,
  funil,
  data,
  hora,
  onAgendou,
}) {
  let retornoAgendado = "";
  let dataTime = "";

  if (onAgendou && data && hora) {
    const iso = horaStringParaISO(data, hora);
    retornoAgendado = iso;
    dataTime = iso;
  }

  return {
    empresaId: prospec.empresaId,
    indicador: resultado,
    observacao,
    interesse: notaAtual,
    funil,
    retornoAgendado,
    dataTime,
  };
}
