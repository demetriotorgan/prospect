// utils/metricas.js
export const calcularMetricas = (empresas) => {
  const totalEmpresas = empresas.length;
  
  //Status Gerais
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

  // --- Métricas por tipo / nicho ---
  const contagemPorTipo = empresas.reduce((acc, emp) => {
    const tipo = (emp.tipo && String(emp.tipo).trim()) || "Indefinido";
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  const totalDeNichos = Object.keys(contagemPorTipo).length;

  const arrayNichos = Object.entries(contagemPorTipo).map(([tipo, total]) => ({
    tipo,
    total
  }));

  const top3Nichos = arrayNichos
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  //Empresas por estado
const empresasPorEstado = empresas.reduce((acc, empresa) => {
  // garante string válida, remove acentos e converte para maiúsculo
  const estado = (empresa.estado || "Indefinido")
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();   // "PARANA", "SAO PAULO", etc.

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

//Porcentagem por estado:
const porcentagemPorEstado = top3Estados.map(({ estado, total }) => ({
  estado,
  porcentagem: (total / totalEmpresas) * 100,
}));

// --- Métricas de empresas com site ---
  const presencaOnline = (() => {
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
  })();

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
    percentSemInteresse,
     totalDeCidadesAtendidas,
    cidadesMaiorConcentracao,
    percentualOutrasCidades,
    contagemPorTipo,            
    totalDeNichos,
    top3Nichos,
    totalDeEstados,
    top3Estados,
    porcentagemPorEstado,
    presencaOnline
  };
};