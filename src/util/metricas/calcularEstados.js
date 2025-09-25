export function calcularEstados(empresas, totalEmpresas) {
  const empresasPorEstado = empresas.reduce((acc, empresa) => {
    // garante string válida, remove acentos e converte para maiúsculo
    const estado = (empresa.estado || "Indefinido")
      .normalize("NFD") // remove acentos
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();

    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  // Total de estados distintos
  const totalDeEstados = Object.keys(empresasPorEstado).length;

  // Array ordenado por quantidade
  const estadosArray = Object.entries(empresasPorEstado)
    .sort((a, b) => b[1] - a[1]);

  // Garante sempre 3 posições
  while (estadosArray.length < 3) {
    estadosArray.push([`Estado ${estadosArray.length + 1}`, 0]);
  }

  // Pega os 3 maiores
  const top3Estados = estadosArray.slice(0, 3).map(([estado, total]) => ({
    estado,
    total
  }));

  // Porcentagem por estado
  const porcentagemPorEstado = top3Estados.map(({ estado, total }) => ({
    estado,
    porcentagem: totalEmpresas > 0 ? (total / totalEmpresas) * 100 : 0,
  }));

  return {
    empresasPorEstado,
    totalDeEstados,
    estadosArray,
    top3Estados,
    porcentagemPorEstado,
  };
}
