// --- Função para calcular presença online ---
export const calcularPresencaOnline = (empresas) => {
  const totalEmpresas = empresas.length;
  const comSite = empresas.filter(
    (emp) => emp.site && emp.site.trim() !== ""
  ).length;

  const percentual = totalEmpresas > 0
    ? ((comSite / totalEmpresas) * 100).toFixed(1)
    : 0;

  return {
    comSite,
    percentual,
  };
};

// --- Função para calcular o top 3 nichos com site ---
export const calcularTop3NichosComSite = (empresas) => {
  const empresasComSite = empresas.filter(
    (emp) => emp.site && emp.site.trim() !== ""
  );

  const contagem = empresasComSite.reduce((acc, empresa) => {
    const tipo = empresa.tipo?.trim() || "Indefinido";
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  let arrayNichos = Object.entries(contagem).map(([tipo, total]) => ({
    tipo,
    total,
  }));

  arrayNichos = arrayNichos.sort((a, b) => b.total - a.total);

  while (arrayNichos.length < 3) {
    arrayNichos.push({
      tipo: `Nicho ${arrayNichos.length + 1}`,
      total: 0,
    });
  }

  return arrayNichos.slice(0, 3);
};
