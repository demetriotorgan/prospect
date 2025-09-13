import React from 'react'
import './BarraPorcentagem.css'

const BarraPorcentagem = ({percentual}) => {
  return (
    <div>
      <div className="porcentagem-barra">
        <div className="barra" style={{ width: `${percentual}%` }}></div>
      </div>
      <small className="porcentagem-texto">{percentual}%</small>
    </div>
  )
}

export default BarraPorcentagem