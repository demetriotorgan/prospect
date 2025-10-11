import React, { useEffect, useState } from 'react'
import '../styles/Empresas.css'
import useAgendamentos7Dias from '../hooks/agendamento/useAgendamentos7dias';
import CardAgendamento7Dias from './Agendamentos/CardAgendamento7Dias';
import loading from '../assets/loading.gif'
import CardAgendamentos from './Agendamentos/CardAgendamentos';
import useTodosAgendamentos from '../hooks/agendamento/useTodosAgendamentos';

const Empresas = () => {
const {todosAgendamentos, carregandoTodosAgendamentos} = useTodosAgendamentos();
  return (
    <>    
    <div className='painel-agendamentos'>
      <div className='cards-container'>
        <div className='agendamentos-proximos'>               
          <h1>Agendamentos Próximos</h1>
        </div>
      
        <div className='todos-agendamentos'>
        {carregandoTodosAgendamentos ? <img src={loading} />:
        <CardAgendamentos 
        todosAgendamentos={todosAgendamentos}
        />
        }
        </div>
      </div>
    </div>
    </>
  )
}

export default Empresas