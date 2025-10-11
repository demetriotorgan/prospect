import React, { useEffect, useState } from 'react'
import '../styles/Empresas.css'
import useAgendamentos7Dias from '../hooks/agendamento/useAgendamentos7dias';
import CardAgendamento7Dias from './Agendamentos/CardAgendamento7Dias';
import loading from '../assets/loading.gif'
import CardAgendamentos from './Agendamentos/CardAgendamentos';
import useTodosAgendamentos from '../hooks/agendamento/useTodosAgendamentos';

const Empresas = () => {
const [agendamentoParaHoje, setAgendamentosParaHoje] = useState([]);
const {todosAgendamentos, carregandoTodosAgendamentos} = useTodosAgendamentos();


const handleRemoverAgendamentoEncerrado = (id) => {
  setAgendamentosParaHoje((prev) => prev.filter((ag) => ag._id !== id));
};

const carregarAgendamentosEmAberto = (agendamentos)=>{
return agendamentos.filter((agendamento)=> (!agendamento.resultado || agendamento.resultado.trim()===""));
}

useEffect(()=>{
  const agendaParaHoje = todosAgendamentos.filter(
    (agendamento) => 
      agendamento.tempoRestante === 'Hoje' && (!agendamento.resultado || agendamento.resultado.trim() === ""));
  setAgendamentosParaHoje(agendaParaHoje);
  console.log(agendamentoParaHoje);
},[todosAgendamentos])
  return (
    <>    
    <div className='painel-agendamentos'>
      <div className='cards-container'>
        <div className='agendamentos-proximos'>  
          {carregandoTodosAgendamentos ? <img src={loading} /> :              
          <CardAgendamento7Dias 
          listaAgendamentos={agendamentoParaHoje}
          onAgendamentoEncerrado={handleRemoverAgendamentoEncerrado}
          />
          }
        </div>
        
        <div className='todos-agendamentos'>                
        {carregandoTodosAgendamentos ? <img src={loading} />:
        <CardAgendamentos 
        todosAgendamentos={carregarAgendamentosEmAberto(todosAgendamentos)}
        />
        }
        </div>
      </div>
    </div>
    </>
  )
}

export default Empresas