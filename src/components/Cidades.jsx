import React, { useEffect, useState } from 'react'
import '../styles/Cidades.css'
import useCarregarEmpresas from '../hooks/useCarregarEmpresas';
import useCarregarCidades from '../hooks/useCarregarCidades';
import CardCidade from './Cidades/CardCidade';
import SelecionarCidades from './Cidades/SelecionarCidades';
import useNichoPorCidades from '../hooks/useNichosPorCidades';
import CardMetricaPorCidade from './Cidades/CardMetricaPorCidade';
import GraficoCidadesProspectadas from './Cidades/GraficoCidadesProspectadas';
import loading from '../assets/loading.gif'
const Cidades = () => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');    
  
  //hook's   
  const {empresas, carregando} = useCarregarEmpresas();   
  const {listaCidades} = useCarregarCidades({empresas});
  const {nichosFiltradosPorCidade,totalEmpresas,totalNichos, prospectados, agendamentos} = useNichoPorCidades({empresas, cidadeSelecionada});

  // console.log(nichosFiltradosPorCidade);
   return (
    <div className='painel-cidades'>
      <SelecionarCidades 
      listaCidades={listaCidades}
      setCidadeSelecionada={setCidadeSelecionada}
      />
      <div className='painel-cards-cidades'>          
        {carregando ? (<img src={loading} className='carregando-card-nichos' />):(
          Object.entries(nichosFiltradosPorCidade).map(([nicho, empresas], index)=>(
          <CardCidade key={index} nicho={nicho} empresas={empresas} />
        ))
        )}
        
      </div>
      <div className='metricas-por-cidades'>
        <CardMetricaPorCidade
          totalEmpresas={totalEmpresas}
          totalNichos={totalNichos}
          prospectados={prospectados}
          agendamentos={agendamentos}
          cidadeSelecionada={cidadeSelecionada}      
        />
        <div className='grafico-cidades'>
          <h3>Total Emp. x Total Prospec</h3>          
          <GraficoCidadesProspectadas 
          valor1={totalEmpresas}
          valor2={prospectados}
          />          
        </div>
        <div className='grafico-cidades'>
          <h3>Total Emp. x Total Agend.</h3>          
          <GraficoCidadesProspectadas 
          valor1={totalEmpresas}          
          valor2={agendamentos}          
          />          
        </div>
      </div>
    </div>
  )
}

export default Cidades