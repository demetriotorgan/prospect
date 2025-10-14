import React, { useEffect, useState } from 'react'
import '../styles/Empresas.css'
import useAgendamentos7Dias from '../hooks/agendamento/useAgendamentos7dias';
import CardAgendamento7Dias from './Agendamentos/CardAgendamento7Dias';
import loading from '../assets/loading.gif'
import CardAgendamentos from './Agendamentos/CardAgendamentos';
import useTodosAgendamentos from '../hooks/agendamento/useTodosAgendamentos';

const Empresas = () => {
const {todosAgendamentos, carregandoTodosAgendamentos, setTodosAgendamentos} = useTodosAgendamentos();

 // 🔁 Atualiza o agendamento específico no state global
  const handleAtualizarAgendamento = (agendamentoAtualizado) => {
    setTodosAgendamentos((prev) =>
      prev.map((ag) =>
        ag._id === agendamentoAtualizado._id ? agendamentoAtualizado : ag
      )
    );
  };

   // 🔍 Filtra apenas agendamentos com resultado vazio ou null
  // const agendamentosEmAberto = todosAgendamentos.filter(
  //   (ag) => !ag.resultado || ag.resultado.trim() === ""
  // );

  const agendamentosEmAberto = todosAgendamentos.filter(
    (ag) => ag.tempoRestante === 'Hoje'
  );

  return (
    <>    
    <div className='painel-agendamentos'>
      <div className='cards-container'>
        <div className='agendamentos-proximos'>  
          {carregandoTodosAgendamentos ? <img src={loading} /> :              
          <CardAgendamento7Dias 
          listaAgendamentos={agendamentosEmAberto} 
          onAgendamentoAtualizado={handleAtualizarAgendamento} // ✅ passa o callback          
          />
          }
        </div>
        
        <div className='todos-agendamentos'>                
        
        </div>
      </div>
    </div>
    </>
  )
}

export default Empresas