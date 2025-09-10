import React, { useEffect, useState } from 'react'
import useCarregarNichos from '../hooks/useCarregarNichos'
import '../styles/TelaProspec.css'
import useCarregarEmpresas from '../hooks/useCarregarEmpresas';
import useFiltrarEmpresas from '../hooks/useFiltrarEmpresas';
import resumoStatus from '../util/resumoStatus';
import InfoProspec from './PainelProspect/InfoProspect';

const TelaProspec = () => {       

  // hooks
  const { nichoOptions } = useCarregarNichos();
  const {empresas, carregando, erro} = useCarregarEmpresas();
  const {empresasFiltradas, handleNichoSelecionado} = useFiltrarEmpresas(empresas);  
  
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
    />     
    </>
  )
}

export default TelaProspec;
