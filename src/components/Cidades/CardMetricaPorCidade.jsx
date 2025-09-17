import React from 'react'

const CardMetricaPorCidade = ({totalEmpresas,totalNichos,prospectados,agendamentos, cidadeSelecionada}) => {    

  return (
    <div className='card-metricas-cidade'>
            <h2 className={cidadeSelecionada ? '' : 'pulsating'}>{cidadeSelecionada ? cidadeSelecionada : 'Selecione uma cidade'}</h2>
            <h3>Total de Empresas:{totalEmpresas}</h3>            
            <p>Nichos: {totalNichos}</p>
            <p>Total de Prospecção: {prospectados}</p>
            <p>Agendamentos: {agendamentos} </p>            
        </div>
  )
}

export default CardMetricaPorCidade