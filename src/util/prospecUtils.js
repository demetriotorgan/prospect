function horaStringParaISO(horaStr) {
  if (!horaStr) return null;
  const [h, m] = horaStr.split(":");

  // Usa o fuso correto (sem deslocar para UTC automaticamente)
  const dateLocal = new Date();
  dateLocal.setHours(Number(h));
  dateLocal.setMinutes(Number(m));
  dateLocal.setSeconds(0);
  dateLocal.setMilliseconds(0);

  // Converte explicitamente para UTC, mantendo o horário Brasil como base
  const dateUTC = new Date(
    dateLocal.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  return dateUTC.toISOString();
}


export function montarPayload({ empresa, user, resultado, observacao, tempoGasto, nota, dataReuniao, dataTime,prioridade }) {
  return {
    empresaId: empresa?._id || null,
    nomeEmpresa: empresa.nome || "",
    usuarioId: user?._id || null,
    indicador: resultado || "nao-prospectado",
    nicho: empresa.tipo,
    observacao: observacao?.trim() || "",
    tempoGasto: tempoGasto || 0,
    interesse: nota || 0,
    retornoAgendado: dataReuniao 
    ? new Date(`${dataReuniao}T12:00:00.000Z`).toISOString() 
    : null,
     dataTime: horaStringParaISO(dataTime),
     telefone: empresa.telefone || "",
     site: empresa.site || "",
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