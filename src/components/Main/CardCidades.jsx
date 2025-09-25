import React from 'react'
import GraficoCidadesAgendamentos from "./GraficoCidadesAgendamentos"
import GraficoCidadesMenosProspectadas from './GraficoCidadesMenosProspectadas'
import CidadesSemSiteChart from './CidadesSemSiteChart'
import CidadeMaiorAgendamento from './CidadeMaiorAgendamento'
import CidadeMenorProspec from './CidadeMenorProspec'
import CidadeMenorDigital from './CidadeMenorDigital'

const CardCidades = ({metricas}) => {
  return (
    <div className='painel-cards-cidades'>
        <div className='card-info'>
        <CidadeMaiorAgendamento 
        metricas={metricas}
        />
        </div>

        <div className='card-info'>
        <CidadeMenorProspec 
        metricas={metricas}
        />
        </div>

    <div className='card-info'>
      <CidadeMenorDigital 
      metricas={metricas}
      />
    </div>
</div>
  )
}

export default CardCidades