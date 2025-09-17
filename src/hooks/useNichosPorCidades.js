import { useEffect, useState } from "react";

const useNichoPorCidades = ({empresas, cidadeSelecionada})=>{
    const [nichosFiltradosPorCidade, setNichosFiltradosPorCidade] = useState({});

    useEffect(()=>{
        
        const listaEmpresasFiltradas = cidadeSelecionada 
      ? empresas.filter((empresa) => empresa.cidade?.toLowerCase() === cidadeSelecionada?.toLowerCase()) 
      : empresas;
    const empresasPorCidadeETipo = listaEmpresasFiltradas.reduce((acc, empresa) => {
      const tipo = empresa.tipo;
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(empresa);
      return acc;
    }, {});
    setNichosFiltradosPorCidade(empresasPorCidadeETipo);
    
    },[cidadeSelecionada, empresas]);

    //Calculando métricas
    const totalEmpresas = Object.values(nichosFiltradosPorCidade).flat().length;
    const totalNichos = Object.keys(nichosFiltradosPorCidade).length;

    const totalDeProspectados = (nichos)=>{
      let total = 0;
      Object.values(nichos).forEach((empresas)=>{
        total += empresas.filter((empresa) => empresa.statusAtual !== "nao-prospectado").length;
      });
      return total;
    }

    const totalDeAgendamentos = (nicho)=>{
      let total = 0;
      Object.values(nicho).forEach((empresas)=>{
        total += empresas.filter((empresa)=>empresa.statusAtual === "ligou-agendou-reuniao").length
      });
      return total;
    }

    const prospectados = totalDeProspectados(nichosFiltradosPorCidade);
    const agendamentos = totalDeAgendamentos(nichosFiltradosPorCidade);

    return {nichosFiltradosPorCidade, totalEmpresas, totalNichos, prospectados, agendamentos}
};

export default useNichoPorCidades;