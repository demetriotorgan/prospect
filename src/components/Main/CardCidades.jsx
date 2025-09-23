import React from 'react'
import GraficoCidadesAgendamentos from "./GraficoCidadesAgendamentos"
import GraficoCidadesMenosProspectadas from './GraficoCidadesMenosProspectadas'
import CidadesSemSiteChart from './CidadesSemSiteChart'

const CardCidades = ({metricas}) => {
  return (
    <div className='painel-cards-cidades'>
        <div className='card-info'>
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
        </div>

        <div className='card-info'>
        <h2>Cidades com menor prospecção</h2>
        <p>Total de Empresas:{metricas.totalEmpresas} </p>
        <p>Não prospectadas: {metricas.naoProspec}</p>
        <p>% percentual:{((metricas.naoProspec / metricas.totalEmpresas)*100).toFixed(2)}% </p>
        <p>Cidades: </p>
        <ul>
  {metricas.top3CidadesMenosProspectadas.map((cidade, index) => (
    <li key={index}>
      {cidade.cidade} : {cidade.quantidade}
      {metricas.totalProspectadas > 0 && (
        <span>
          {" "}
          ({((cidade.quantidade / metricas.totalProspectadas) * 100).toFixed(1)}%)
        </span>
      )}
    </li>
  ))}
</ul>
        <div className='grafico-info-gerais'>
            <GraficoCidadesMenosProspectadas cidades={metricas.top3CidadesMenosProspectadas} />
        </div>
        </div>

<div className='card-info'>
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
    </div>
</div>
  )
}

export default CardCidades