import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react'
import { FaStar } from 'react-icons/fa'

const CardProspecs = ({prospec, handleEditarProspec}) => {

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
    <div className='card-empresas-prospectadas'>
                  <div className='card-prospec'>
                    <h4>Nome da Empresa: {prospec.nomeEmpresa}</h4>
                    <p>Resultado: {prospec.indicador}</p>
                    <p>Retorno Agendado: {prospec.retornoAgendado ? formatarData(prospec.retornoAgendado) : 'Sem Agendamento'}</p>
                    <p>Horário: Agendado: {prospec.dataTime ? formatarHora(prospec.dataTime) : ''}</p>
                    <h3>Telefone: {prospec.telefone} </h3>
                    <p>
                      Qualificação:{' '}
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < prospec.interesse ? "#FFD700" : "#DDD"} />
                      ))}
                    </p>
                    <small>Obs: {prospec.observacao}</small>
                    <button onClick={() => handleEditarProspec(prospec)}>Editar</button>
                    <button className='excluir-prospec'>Excluir</button>
                  </div>
                </div>
  )
}

export default CardProspecs