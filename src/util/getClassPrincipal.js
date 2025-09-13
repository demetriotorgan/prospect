export const getClassePrincipal = (metricas) => {
  const agendamentoXretorno = parseFloat(metricas.agendamentoXretorno.toFixed(2));
  // const agendamentoXretorno = 0;
  const semRespXIndef = parseFloat(metricas.semRespXIndef.toFixed(2));
  // const semRespXIndef = 0;
  const percentSemInteresse = parseFloat(metricas.percentSemInteresse.toFixed(2));
  // const percentSemInteresse = 0;

   // Se todos forem zero, retorna cinza
  if (agendamentoXretorno === 0 && semRespXIndef === 0 && percentSemInteresse === 0) {
    return 'cinza';
  }

  const maior = Math.max(agendamentoXretorno, semRespXIndef, percentSemInteresse);
  
  if (maior === agendamentoXretorno) return 'verde';
  if (maior === semRespXIndef) return 'laranja';
  if (maior === percentSemInteresse) return 'cinza';
  return '';
};
