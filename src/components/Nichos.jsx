import React, { useEffect, useState } from "react";
import "../styles/Nicho.css";
import NichoFormulario from "./Nicho/NichoFormulario";
import useSalvarNicho from "../hooks/useSalvarNicho";
import useCarregarNichos from "../hooks/useCarregarNichos";
import TabelaNichos from "./Nicho/TabelaNichos";
import loadingTabela from '../assets/loading.gif'
import CardNicho from "./Nicho/CardNicho";

const NichoForm = () => {
  const {salvarNicho, loading, error, success} = useSalvarNicho();
  const {nichoOptions, erroNicho, setNichoOptions, carregandoNicho} = useCarregarNichos();

  const handleSavarNicho = (nicho)=>{
    salvarNicho(nicho, (novoNicho)=>{
      setNichoOptions((prev)=>[...prev, novoNicho]);
    });
  }

  return (
    <>
    <div className="nicho-wrapper">
  <div className="cadastrar-nicho">
  <NichoFormulario 
    onSave={handleSavarNicho}
    onLoading={loading}
    onError={error}
    onSuccess={success}
  />
  </div>
  <div className="nichos-cadastrados">
  {carregandoNicho ? (
    <img src={loadingTabela} className="loading-tabela" />
  ) : nichoOptions && nichoOptions.length > 0 ? (
    <TabelaNichos 
      nichoOptions={nichoOptions}
      setNichoOptions={setNichoOptions}
    />
  ) : (
    <p>Nenhum nicho cadastrado.</p>
  )}
  </div>
  <div className="painel-nichos">   
      <CardNicho />
      <CardNicho />
      <CardNicho />
      <CardNicho />
      <CardNicho />
  </div>
</div>

  
    </>
  );
};

export default NichoForm;
