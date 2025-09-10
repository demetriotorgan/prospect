import React, { useEffect, useState } from 'react'
import useCarregarNichos from '../hooks/useCarregarNichos'
import '../styles/TelaProspec.css'
import useCarregarEmpresas from '../hooks/useCarregarEmpresas';
import useFiltrarEmpresas from '../hooks/useFiltrarEmpresas';
import resumoStatus from '../util/resumoStatus';
import InfoProspec from './PainelProspect/InfoProspect';

const TelaProspec = () => {       
  const [empresas, setEmpresas] = useState('');

  // hooks
  const { nichoOptions } = useCarregarNichos();
  const {empresas: empresasOriginais, carregando, erro} = useCarregarEmpresas();
  const {empresasFiltradas, handleNichoSelecionado,nichoSelecionado} = useFiltrarEmpresas(empresas);  

  useEffect(() => {
  setEmpresas(empresasOriginais);
}, [empresasOriginais]);

const atualizarEmpresa = (empresaId, novoStatus) => {
  setEmpresas((prev) =>
    prev.map((emp) =>
      emp._id === empresaId ? { ...emp, statusAtual: novoStatus } : emp
    )
  );
};
  
  //Criar um resumo dos status
  const resumo = resumoStatus(empresasFiltradas); 
     
  return (
    <>
    <InfoProspec
    nichoOptions={nichoOptions}
      handleNichoSelecionado={handleNichoSelecionado}
      carregando={carregando}
      erro={erro}
      empresasFiltradas={empresasFiltradas}
      resumo={resumo}      
      atualizarEmpresa={atualizarEmpresa}
      nichoSelecionado={nichoSelecionado}
    />     
    </>
  )
}

export default TelaProspec;
