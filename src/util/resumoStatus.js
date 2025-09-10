const resumoStatus = (empresas) => {
  const resumo = empresas.reduce((acc, empresa) => {
    const status = empresa.statusAtual;

    // garante consistência (por exemplo, se vier null/undefined)
    if (!status) return acc;

    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // campo calculado: prospectados = todos que não são "nao-prospectado"
  resumo["prospectado"] = empresas.filter(
    (emp) => emp.statusAtual && emp.statusAtual !== "nao-prospectado"
  ).length;

  // garante contagem explícita dos nao-prospectados (mesmo que 0)
  resumo["nao-prospectado"] = resumo["nao-prospectado"] || 0;

  return resumo;
};

export default resumoStatus;
