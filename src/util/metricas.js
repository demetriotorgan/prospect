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

const getTop3NichosComSite = (empresas) => {
  // 1. Filtrar apenas empresas que têm site preenchido
  const empresasComSite = empresas.filter(
    (emp) => emp.site && emp.site.trim() !== ""
  );

  // 2. Contar empresas com site por tipo/nicho
  const contagem = empresasComSite.reduce((acc, empresa) => {
    const tipo = empresa.tipo?.trim() || "Indefinido";
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  // 3. Transformar em array [{ tipo, total }]
  let arrayNichos = Object.entries(contagem).map(([tipo, total]) => ({
    tipo,
    total,
  }));

  // 4. Ordenar decrescente
  arrayNichos = arrayNichos.sort((a, b) => b.total - a.total);

  // 5. Garantir 3 resultados (mesmo que zeros)
  while (arrayNichos.length < 3) {
    arrayNichos.push({
      tipo: `Nicho ${arrayNichos.length + 1}`,
      total: 0,
    });
  }

  // 6. Retornar somente os 3 primeiros
  return arrayNichos.slice(0, 3);
};

 const top3NichosComSite = getTop3NichosComSite(empresas);

 // --- TOP 3 CIDADES COM MAIS AGENDAMENTOS ---
  const agendamentosPorCidade = empresas
    .filter(e => e.statusAtual === 'ligou-agendou-reuniao')
    .reduce((acc, emp) => {
      const cidade = emp.cidade?.trim() || "Indefinida";
      acc[cidade] = (acc[cidade] || 0) + 1;
      return acc;
    }, {});

  const top3CidadesAgendamentos = Object.entries(agendamentosPorCidade)
    .sort((a, b) => b[1] - a[1]) // ordena do maior pro menor
    .slice(0, 3) // pega só os 3 primeiros
    .map(([cidade, total]) => ({
      cidade,
      total
    }));

  // garante sempre 3 posições (mesmo se não tiver 3 cidades com agendamento)
  while (top3CidadesAgendamentos.length < 3) {
    top3CidadesAgendamentos.push({
      cidade: `Cidade ${top3CidadesAgendamentos.length + 1}`,
      total: 0
    });
  };

function top3CidadesMenosProspectadas(empresas) {
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

const top3MenosProspec = top3CidadesMenosProspectadas(empresas);
 

// --- Top 3 Cidades Sem Site ---
  const top3CidadesSemSite = (() => {
    const semSite = empresas.filter((e) => !e.site || e.site.trim() === "");
    const contagem = semSite.reduce((acc, e) => {
      const cidade = (e.cidade || "Indefinida").trim().toLowerCase();
      acc[cidade] = (acc[cidade] || 0) + 1;
      return acc;
    }, {});
    let array = Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .map(([cidade, quantidade]) => ({ cidade, quantidade }));
    while (array.length < 3) array.push({ cidade: `Cidade ${array.length + 1}`, quantidade: 0 });
    return array.slice(0, 3);
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
    presencaOnline,
     top3NichosComSite,
     top3CidadesAgendamentos,
     top3CidadesMenosProspectadas: top3MenosProspec,
      top3CidadesSemSite,
  };
};