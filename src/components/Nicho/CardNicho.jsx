import React from 'react'

const CardNicho = () => {
  return (
    <div className="card-nicho">
  {/* <!-- 1. Cabeçalho --> */}
  <div className="card-nicho-header">
    Nicho 01
  </div>

  {/* <!-- 2. Resumo --> */}
  <div className="card-nicho-overview">
    <p>Total de Empresas: 150</p>
    <p>Total de Prospectadas: 90</p>
  </div>

  {/* <!-- 3. Seções --> */}
  <div className="card-nicho-section">
    <h3>Agendamentos</h3>
    <p>Total de Agendamentos: 25</p>
    <p>Pedidos de Retorno: 5</p>
  </div>

  <div className="card-nicho-section">
    <h3>Indefinidos</h3>
    <p>Total sem resposta: 8</p>
    <p>Indefinidos: 3</p>
    <p>Não prospectados: 12</p>
  </div>

  <div className="card-nicho-section">
    <h3>Não-Prioritários</h3>
    <p>Sem interesse: 15</p>
  </div>

  {/* <!-- 4. Rodapé --> */}
  <div className="card-nicho-footer">
    Última atualização: hoje
  </div>
</div>  
  )
}

export default CardNicho