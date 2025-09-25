export function calcularCidades(empresas, totalEmpresas){
    //Metricas de Cidade    
  const empresasPorCidade = empresas.reduce((acc, emp) => {
    const cidade = emp.cidade || "Indefinida";
    acc[cidade] = (acc[cidade] || 0) + 1;
    return acc;
  }, {});

  const totalDeCidadesAtendidas = Object.keys(empresasPorCidade).length;

  // ordenar cidades por quantidade de empresas
  const cidadesOrdenadas = Object.entries(empresasPorCidade)
    .sort((a, b) => b[1] - a[1]);

  // top 3 cidades
  const cidadesMaiorConcentracao = cidadesOrdenadas.slice(0, 3).map(([cidade, qtd]) => ({
    cidade,
    quantidade: qtd,
    percentual: ((qtd / totalEmpresas) * 100).toFixed(1)
  }));

  // percentual das demais cidades
  const empresasTop3 = cidadesMaiorConcentracao.reduce((sum, c) => sum + c.quantidade, 0);
  const percentualOutrasCidades = totalEmpresas !== 0
    ? (((totalEmpresas - empresasTop3) / totalEmpresas) * 100).toFixed(1)
    : 0;

    return{
    empresasPorCidade,
    totalDeCidadesAtendidas,
    cidadesOrdenadas,
    cidadesMaiorConcentracao,
    percentualOutrasCidades

    }
};