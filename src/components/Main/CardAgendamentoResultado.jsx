import React from 'react'

const CardAgendamentoResultado = () => {
  return (
    <div className="card-agendamento-resultado">
      <h4>Nome da Empresa: <span>Facebook Ads Pro</span></h4>
      <p>Nicho: Marketing Digital</p>
    
      <div className="qualificacao">
        <p><strong>Qualificação:</strong></p>  
        
      </div>
    
      <div className="secao-info">
        <p><strong>Data Agendada:</strong> 18/10/2025</p>
        <p><strong>Horário:</strong> 17:00</p>
        <p><strong>Funil:</strong> Prospecção</p>
      </div>
    
      <div className="resultado">
        <p>Resultado: Reunião Agendada</p>
      </div>
    
      <div className="obs">
        <p>Obs: Retornar ligação para confirmar horário.</p>
      </div>
    </div>
  )
}

export default CardAgendamentoResultado