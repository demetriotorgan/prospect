export function calcularTop3CidadesMenosProspectadas(empresas) {
  const naoProspectadas = empresas.filter(
    (e) => e.statusAtual === "nao-prospectado"
  );

  const contagemPorCidade = naoProspectadas.reduce((acc, empresa) => {
    const cidade = (empresa.cidade || "Indefinida").trim().toLowerCase();
    acc[cidade] = (acc[cidade] || 0) + 1;
    return acc;
  }, {});

  let cidadesOrdenadas = Object.entries(contagemPorCidade)
    .sort((a, b) => b[1] - a[1])
    .map(([cidade, quantidade]) => ({ cidade, quantidade }));

  // garante sempre 3 posições
  while (cidadesOrdenadas.length < 3) {
    cidadesOrdenadas.push({
      cidade: `Cidade ${cidadesOrdenadas.length + 1}`,
      quantidade: 0,
    });
  }

  return cidadesOrdenadas.slice(0, 3);
}
