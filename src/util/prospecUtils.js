function horaStringParaISO(horaStr) {
  if (!horaStr) return null;
  const [h, m] = horaStr.split(":");
  const date = new Date();
  date.setHours(Number(h));
  date.setMinutes(Number(m));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString();
};

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