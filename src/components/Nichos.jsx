import React, { useEffect, useState } from "react";
import "../styles/Nicho.css";
import NichoFormulario from "./Nicho/NichoFormulario";
import useSalvarNicho from "../hooks/useSalvarNicho";
import useCarregarNichos from "../hooks/useCarregarNichos";
import TabelaNichos from "./Nicho/TabelaNichos";
import loadingTabela from '../assets/loading.gif'
import CardNicho from "./Nicho/CardNicho";
import useCarregarEmpresas from "../hooks/useCarregarEmpresas";
import useEmpresasPorNicho from "../hooks/useEmpresasPorNicho";

const NichoForm = () => {
  
  //hook;s
  const {salvarNicho, loading, error, success} = useSalvarNicho();
  const {nichoOptions, erroNicho, setNichoOptions, carregandoNicho} = useCarregarNichos();
  const {empresasPorNicho} = useEmpresasPorNicho({nichoOptions});  
  
  useEffect(() => {
  console.log("Empresas por tipo atualizado:", empresasPorNicho);
}, [empresasPorNicho]);  

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
  {Object.entries(empresasPorNicho).map(([tipo, listaEmpresas]) => (
    <CardNicho 
      key={tipo} 
      nicho={tipo}            // passa o nome do nicho (ex: "Farmacia")
      empresas={listaEmpresas} // passa as empresas desse nicho
    />
  ))}
</div>
</div>

  
    </>
  );
};

export default NichoForm;
