// components/Main/CardMetricas.jsx
import React from 'react';
import BarraPorcentagem from './BarraPorcentagem';
import {getClassePrincipal} from '../../util/getClassPrincipal'

const CardMetricas = ({ titulo, metricas }) => {
  const classePrincipal = getClassePrincipal(metricas);

  return (
    <div className={`card ${classePrincipal}`}>
      <h3>{titulo}</h3>
      <h5>Total de Empresas: {metricas.totalEmpresas}</h5>
      <h5>Total de Prospectadas: {metricas.totalProspectadas}</h5>            
      <div className={`metrica-principal ${getClassePrincipal(metricas)}`}>
      <BarraPorcentagem 
        percentual={metricas.percentualDeProspec.toFixed(2)}/>
      </div>      
      
      <div className='metricas-prioridade'>
        <h5>Agendamentos: {metricas.agendamentos}</h5>
        <h5>Pedidos de Retorno: {metricas.retorno}</h5>
        <h5>Agendamento x Retorno: </h5>
        
        <div className='barra-porcentagem-prioridade-alta'>
        <BarraPorcentagem           
          percentual={metricas.agendamentoXretorno.toFixed(2)}/>
        </div>        
      </div>

      <div className='metricas-prioridade'>
        <h5>Sem Resposta: {metricas.semResposta}</h5>
        <h5>Indefinidos: {metricas.indefinidos}</h5> 
        <h5>Não Prospectadas: {metricas.naoProspec}</h5>
        <h5>Sem Resposta x Indefinidos: </h5>                 
        <div className='barra-porcentagem-prioridade-atencao'>
        <BarraPorcentagem           
          percentual={metricas.semRespXIndef.toFixed(2)}/>
        </div>
      </div>

      <div className='metricas-prioridade'>
        <h5>Sem Interesse: {metricas.semInteresse}</h5>                          
        <div className='barra-porcentagem-prioridade-baixa'>
        <BarraPorcentagem           
          percentual={metricas.percentSemInteresse.toFixed(2)}/>
        </div>
      </div>
    </div>
  );
};

export default CardMetricas;
