import { calcularTop3CidadesAgendamentos } from "./metricas/calcularAgendamentos";
import { calcularCidades } from "./metricas/calcularCidades";
import { calcularEstados } from "./metricas/calcularEstados";
import { calcularNichos } from "./metricas/calcularNichos";
import { calcularPresencaOnline, calcularTop3NichosComSite } from "./metricas/calcularPresencaOnline";
import { calcularStatus } from "./metricas/calcularStatus";
import { calcularTop3CidadesSemSite } from "./metricas/calcularTop3CidadesSemSite";
import { calcularTop3CidadesMenosProspectadas } from "./metricas/calcularTop3MenosProspectadas";


export const calcularMetricas = (empresas) => {
  const status = calcularStatus(empresas); 
  const {totalEmpresas} = status; 
  const cidades = calcularCidades(empresas, status.totalEmpresas);
  const nichos = calcularNichos(empresas);
  const estados = calcularEstados(empresas, status.totalEmpresas);
  const presencaOnline = calcularPresencaOnline(empresas);
  const top3NichosComSite = calcularTop3NichosComSite(empresas);
  const top3CidadesAgendamentos = calcularTop3CidadesAgendamentos(empresas); 
  const top3MenosProspec = calcularTop3CidadesMenosProspectadas(empresas); 
  const top3CidadesSemSite = calcularTop3CidadesSemSite(empresas);

  return {
    ...status,
    ...cidades,
    ...nichos,
    ...estados,
    presencaOnline,
    top3NichosComSite,
    top3CidadesAgendamentos,
    top3CidadesMenosProspectadas: top3MenosProspec,
    top3CidadesSemSite,
  };
};