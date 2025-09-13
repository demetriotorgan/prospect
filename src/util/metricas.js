// utils/metricas.js
export const calcularMetricas = (empresas) => {
  const totalEmpresas = empresas.length;

  const totalProspectadas = empresas.filter(
    (emp) => emp.statusAtual && emp.statusAtual !== 'nao-prospectado'
  ).length;

  const agendamentos = empresas.filter(e => e.statusAtual === 'ligou-agendou-reuniao').length;
  const retorno = empresas.filter(e => e.statusAtual === 'ligou-pediu-retorno').length;

  const agendamentoXretorno = totalProspectadas !== 0 
    ? ((agendamentos + retorno) / totalProspectadas) * 100 
    : 0;

  const percentualDeProspec = totalEmpresas !== 0
    ? (totalProspectadas / totalEmpresas) * 100
    : 0;

  const semResposta = empresas.filter(e => e.statusAtual === 'ligou-nao-respondeu').length;
  const indefinidos = empresas.filter(e => e.statusAtual === 'ligou-nao-era-dono').length;
  const naoProspec = empresas.filter(e => e.statusAtual === 'nao-prospectado').length;

  const semRespXIndef = totalProspectadas !== 0
    ? ((semResposta + indefinidos) / totalProspectadas) * 100
    : 0;

  const semInteresse = empresas.filter(e => e.statusAtual === 'ligou-sem-interesse').length;
  const percentSemInteresse = totalProspectadas !== 0
    ? (semInteresse / totalProspectadas) * 100
    : 0;

  return {
    totalEmpresas,
    totalProspectadas,
    agendamentos,
    retorno,
    agendamentoXretorno,
    percentualDeProspec,
    semResposta,
    indefinidos,
    naoProspec,
    semRespXIndef,
    semInteresse,
    percentSemInteresse
  };
};
