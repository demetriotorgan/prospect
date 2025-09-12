export function montarPayload({ empresa, user, resultado, observacao, tempoGasto, nota, dataReuniao, prioridade }) {
  return {
    empresaId: empresa?._id || null,
    usuarioId: user?._id || null,
    indicador: resultado || "nao-prospectado",
    observacao: observacao?.trim() || "",
    tempoGasto: tempoGasto || 0,
    interesse: nota || 0,
    retornoAgendado: dataReuniao || null,
    funil: prioridade || "topo",
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  };
}

export const formatarMensagem = (payload, empresa) => (
  ` ✅ Prospecção salva com sucesso!
  Empresa: ${empresa.nome}
  Resultado: ${payload.indicador}
  Prioridade: ${payload.funil}
  Interesse: ${payload.interesse}
  Observação: ${payload.observacao || "Nenhuma"}
  ${payload.retornoAgendado ? `Reunião agendada para: ${payload.retornoAgendado}` : "Sem Agendamento"}`
);
