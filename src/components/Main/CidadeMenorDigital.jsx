import React from 'react'
import CidadesSemSiteChart from './CidadesSemSiteChart'

const CidadeMenorDigital = ({metricas}) => {
  return (
    <>
    <h2>Cidades com menor presença digital</h2>
  <p>Total de Empresas: {metricas.totalEmpresas}</p>
  <p>
    Sem presença Digital: {metricas.presencaOnline.percentual
      ? 100 - metricas.presencaOnline.percentual + "%"
      : "0%"}
  </p>
  <p>Cidades: </p>
  <ul>
    {metricas.top3CidadesSemSite.map((cidade, index) => (
      <li key={index}>
        {cidade.cidade} : {cidade.quantidade}
      </li>
    ))}
  </ul>
    <div className='grafico-info-gerais'>
        <CidadesSemSiteChart metricas={metricas}/>
    </div>    
    </>
  )
}

export default CidadeMenorDigital