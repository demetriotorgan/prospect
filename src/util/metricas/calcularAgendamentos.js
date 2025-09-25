export function calcularTop3CidadesAgendamentos(empresas) {
  // Filtrar apenas empresas com agendamento
  const agendamentosPorCidade = empresas
    .filter(e => e.statusAtual === 'ligou-agendou-reuniao')
    .reduce((acc, emp) => {
      const cidade = emp.cidade?.trim() || "Indefinida";
      acc[cidade] = (acc[cidade] || 0) + 1;
      return acc;
    }, {});

  // Transformar em array e ordenar
  const top3CidadesAgendamentos = Object.entries(agendamentosPorCidade)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cidade, total]) => ({ cidade, total }));

  // Garantir sempre 3 posições
  while (top3CidadesAgendamentos.length < 3) {
    top3CidadesAgendamentos.push({
      cidade: `Cidade ${top3CidadesAgendamentos.length + 1}`,
      total: 0
    });
  }

  return top3CidadesAgendamentos;
}
