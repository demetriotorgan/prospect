export function calcularTop3CidadesSemSite(empresas) {
  const semSite = empresas.filter((e) => !e.site || e.site.trim() === "");

  const contagem = semSite.reduce((acc, e) => {
    const cidade = (e.cidade || "Indefinida").trim().toLowerCase();
    acc[cidade] = (acc[cidade] || 0) + 1;
    return acc;
  }, {});

  let array = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([cidade, quantidade]) => ({ cidade, quantidade }));

  // garante sempre 3 posições
  while (array.length < 3) {
    array.push({ cidade: `Cidade ${array.length + 1}`, quantidade: 0 });
  }

  return array.slice(0, 3);
}
