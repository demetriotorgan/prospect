export function calcularNichos(empresas){
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
    
    return{
    contagemPorTipo,
    totalDeNichos,
    arrayNichos,
    top3Nichos
    }
}