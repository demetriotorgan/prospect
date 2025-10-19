import React from 'react'
import { FaStar } from 'react-icons/fa'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CardAgendamentoResultado = ({agendamento}) => {
  const formatarData = (data) => {
      const dataLegivel = format(new Date(data), "dd/MM/yyyy", { locale: ptBR });
      return dataLegivel
    }
  
    const formatarHora = (dataISO) =>{
      if(!dataISO) return "";
      try {
        return format(new Date(dataISO), "HH:mm", { locale: ptBR });
      } catch (error) {
        return "";
      }
    }

  return (
    <div className="card-agendamento-resultado">
      <h4>Nome da Empresa: <span>{agendamento.nomeEmpresa}</span></h4>
      <p>Nicho: {agendamento.nicho}</p>
    
      <div className="qualificacao">
        <p>
          Qualificação:{' '}
          {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < agendamento.interesse ? "#FFD700" : "#DDD"} />
          ))}
        </p>        
      </div>
    
      <div className="secao-info">
        <p><strong>Data Agendada:</strong>{agendamento.retornoAgendado ? formatarData(agendamento.retornoAgendado) : 'Sem Agendamento'} </p>
        <p><strong>Horário:</strong> {agendamento.dataTime ? formatarHora(agendamento.dataTime) : 'Sem Agendamento'}</p>
        <p><strong>Funil:</strong> {agendamento.funil}</p>
      </div>
    
      <div className="resultado">
        <p>Resultado: {agendamento.resultado ? agendamento.resultado : 'Aguardando' }</p>
      </div>
    
      <div className="obs">
        <p>Obs: {agendamento.texto}</p>
      </div>
    </div>
  )
}

export default CardAgendamentoResultado