import React from 'react'
import { calcularMetricas } from '../../util/metricas'

const CardNicho = ({nicho, empresas}) => {
  const metrica = calcularMetricas(empresas);

  return (
    <div className="card-nicho">
  {/* <!-- 1. Cabeçalho --> */}
  <div className="card-nicho-header">
    {nicho}
  </div>

  {/* <!-- 2. Resumo --> */}
  <div className="card-nicho-overview">
    <p>Total de Empresas: {metrica.totalEmpresas}</p>
    <p>Total de Prospectadas: {metrica.totalProspectadas}</p>
  </div>

  {/* <!-- 3. Seções --> */}
  <div className="card-nicho-section">
    <h3>Agendamentos</h3>
    <p>Total de Agendamentos: {metrica.agendamentos}</p>
    <p>Pedidos de Retorno: {metrica.retorno}</p>
  </div>

  <div className="card-nicho-section">
    <h3>Indefinidos</h3>
    <p>Total sem resposta: {metrica.semResposta}</p>
    <p>Indefinidos: {metrica.indefinidos}</p>
    <p>Não prospectados: {metrica.naoProspec}</p>
  </div>

  <div className="card-nicho-section">
    <h3>Não-Prioritários</h3>
    <p>Sem interesse: {metrica.semInteresse}</p>
  </div>

  {/* <!-- 4. Rodapé --> */}
  <div className="card-nicho-footer">
    Última atualização: 
  </div>
</div>  
  )
}

export default CardNicho