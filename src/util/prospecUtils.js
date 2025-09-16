export function montarPayload({ empresa, user, resultado, observacao, tempoGasto, nota, dataReuniao, prioridade }) {
  return {
    empresaId: empresa?._id || null,
    usuarioId: user?._id || null,
    indicador: resultado || "nao-prospectado",
    nicho: empresa.tipo,
    observacao: observacao?.trim() || "",
    tempoGasto: tempoGasto || 0,
    interesse: nota || 0,
    retornoAgendado: dataReuniao ? new Date(dataReuniao).toISOString() : null,
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
  ${payload.retornoAgendado ? `Reunião agendada para: ${payload.retornoAgendado}` : "Sem Agendamento"}`
);
