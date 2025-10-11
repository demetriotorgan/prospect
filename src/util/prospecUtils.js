// Converte hora local (HH:mm) + data para ISO UTC corretamente
function horaStringParaISO(dataStr, horaStr) {
  if (!horaStr || !dataStr) return null;

  const [h, m] = horaStr.split(":");
  const [ano, mes, dia] = dataStr.split("-");

  // Cria objeto Date no fuso de São Paulo
  const dateLocal = new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia),
    Number(h),
    Number(m),
    0,
    0
  );

  // Converte para UTC mantendo o horário correto
  const dateUTC = new Date(
    dateLocal.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  return dateUTC.toISOString();
}

export function montarPayload({ empresa, user, resultado, observacao, tempoGasto, nota, dataReuniao, dataTime, prioridade }) {
  return {
    empresaId: empresa?._id || null,
    nomeEmpresa: empresa?.nome || "",
    usuarioId: user?._id || null,
    indicador: resultado || "nao-prospectado",
    nicho: empresa?.tipo || "",
    observacao: observacao?.trim() || "",
    tempoGasto: tempoGasto || 0,
    interesse: nota || 0,
    // Usa dataReuniao + dataTime para montar retornoAgendado corretamente
    retornoAgendado: dataReuniao && dataTime
      ? horaStringParaISO(dataReuniao, dataTime)
      : null,
    dataTime: horaStringParaISO(dataReuniao, dataTime),
    telefone: empresa?.telefone || "",
    site: empresa?.site || "",
    funil: prioridade || "topo",
  };
}

export const formatarMensagem = (payload, empresa) => (  
  ` ✅ Prospecção salva com sucesso!
  Empresa: ${empresa.nome}
  Nicho: ${empresa.tipo}
  Resultado: ${payload.indicador}
  Prioridade: ${payload.funil}
  Interesse: ${payload.interesse}
  Observação: ${payload.observacao || "Nenhuma"}
  ${payload.retornoAgendado ? `Reunião agendada para: ${payload.retornoAgendado} as ${payload.dataTime} h` : "Sem Agendamento"}`
);