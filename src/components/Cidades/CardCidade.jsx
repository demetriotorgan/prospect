import React from 'react'
import { calcularMetricas } from '../../util/metricas'

const CardCidade = ({nicho, empresas}) => {
    const metricas = calcularMetricas(empresas);
  return (
    <div className='card-cidade'>
    <h3>{nicho}</h3>
        <p>Empresas Cadastradas: <span> {metricas.totalEmpresas}</span></p>
        <p>Empresas Prospectadas: <span> {metricas.totalProspectadas}</span></p>
        <p>Não prospectadas: <span> {metricas.naoProspec}</span></p>
        <p>Agendamentos: <span> {metricas.agendamentos}</span></p>
        <p>Indefinidos: <span>{metricas.indefinidos}</span></p>
        <p>Sem Interesse: <span>{metricas.semInteresse}</span></p>
    </div>
  )
}

export default CardCidade