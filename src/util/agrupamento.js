// Função para agrupar um array de objetos pelo campo "tipo" (nicho)
export const agruparPorNicho = (empresas) => {
  return empresas.reduce((acc, empresa) => {
    const tipo = empresa.tipo || "Sem Nicho";
    if (!acc[tipo]) {
      acc[tipo] = [];
    }
    acc[tipo].push(empresa);
    return acc;
  }, {});
};