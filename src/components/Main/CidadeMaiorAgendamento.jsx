import React from 'react'
import GraficoCidadesAgendamentos from './GraficoCidadesAgendamentos'

const CidadeMaiorAgendamento = ({metricas}) => {
  return (
    <>
    <h2>Cidades com maior Agendamentos</h2>
            <p>Total de Agendamentos: {metricas.agendamentos}</p>
            <p>% percentual:{" "}
                {metricas.totalProspectadas > 0
                ? ((metricas.agendamentos / metricas.totalProspectadas) * 100).toFixed(2) + "%"
                : "0%"}
            </p>
            <p>Cidades:</p>
            <ul>
                {metricas.top3CidadesAgendamentos.map((cidade, index)=>(
                    <li key={index}>
                        {cidade.cidade} : {cidade.total}
                        {metricas.agendamentos > 0 && (
                            <span>
                  {" "}
                  ({((cidade.total / metricas.agendamentos) * 100).toFixed(1)}%)
                </span>
                        )}
                    </li>
                ))}            
            </ul>
            <div className='grafico-info-gerais'>
            <GraficoCidadesAgendamentos cidades={metricas.top3CidadesAgendamentos} />
            </div>
    </>
  )
}

export default CidadeMaiorAgendamento