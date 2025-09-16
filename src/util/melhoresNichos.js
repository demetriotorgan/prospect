// utils/melhoresNichos.js
import { calcularMetricas } from "./metricas";

export const melhoresNichos = (empresasPorNicho, limite = 4) => {
  if (!empresasPorNicho) return [];

  // Transforma o objeto em um array [{ titulo, metricas }]
  const metricasPorNicho = Object.entries(empresasPorNicho).map(([nicho, empresas]) => ({
    titulo: nicho,
    metricas: calcularMetricas(empresas),
  }));

  // Ordena pelo agendamentoXretorno em ordem decrescente
  const ordenados = metricasPorNicho.sort(
    (a, b) => b.metricas.agendamentoXretorno - a.metricas.agendamentoXretorno
  );

  // Retorna apenas os top `limite`
  return ordenados.slice(0, limite);
};