import React from 'react'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useSalvarAgendamento from '../../hooks/agendamento/useSalvarAgendamento';
import loading from '../../assets/loading.gif'

const CardAgendamento7Dias = ({ agendamentos }) => {
  // console.log(agendamentos)
  const {salvarAgendamento, salvando} = useSalvarAgendamento();
  
  const handleAgendamento = (reuniao) =>{
    salvarAgendamento(reuniao);
  }

  return (
    <>
      {agendamentos && agendamentos.length > 0 ? (
        agendamentos.map((reuniao, index) => {
          return (
            <div className='card-agendamento' key={index}>          
              <div className='grupo-principal'>
                <h3>Empresa: {reuniao.nomeEmpresa}</h3>
                <p>
                  Data: {format(new Date(reuniao.retornoAgendado), "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p>
                   Horário: {reuniao.dataTime ? format(new Date(reuniao.dataTime), "HH:mm", { locale: ptBR }) : "Não informado"}
                </p>
                <p className='agenda-telefone'>
                  {reuniao.telefone ? reuniao.telefone : "Sem Telefone"}
                </p>
                <p className='tempo-restante'>
                  Tempo Restante: {reuniao.diasRestantes}
                </p>
              </div>

              <div className='grupo-secundario'>
                <p>Realizado por: {reuniao.usuarioNome}</p>
                <p>Nota de Interesse: {reuniao.interesse}</p>
                <p>Obs do vendedor: {reuniao.observacao}</p>
                <p>Possui site?: {reuniao.site ? reuniao.site : "Empresa sem site!"}</p>
              </div>

              <label>
                Resultado
                <select>
                  <option>Negócio Fechado</option>
                  <option>Não teve interesse</option>
                  <option>Remarcar Reunião</option>            
                </select>
              </label>

              <div className='campo-resultado'>
                <textarea rows="5" cols="30" placeholder="Digite seu texto aqui"></textarea>
              </div>
              <div className='agendamento-painel'>
                <button onClick={()=>handleAgendamento(reuniao)}>{salvando ? <img className='loading' src={loading} />: 'Salvar'}</button>
                <button className='btn-excluir'>Excluir</button>
              </div>
              <p className='atencao-agendamento'>Atenção!</p>
            </div>
          )
        })
      ) : (
        "Sem Agendamentos recentes"
      )}
    </>
  )
}

export default CardAgendamento7Dias
