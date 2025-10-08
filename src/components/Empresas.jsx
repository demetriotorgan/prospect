import React, { useEffect, useState } from 'react'
import '../styles/Empresas.css'
import useAgendamentos7Dias from '../hooks/agendamento/useAgendamentos7dias';
import CardAgendamento7Dias from './Agendamentos/CardAgendamento7Dias';
import loading from '../assets/loading.gif'
import CardAgendamentos from './Agendamentos/CardAgendamentos';
import useTodosAgendamentos from '../hooks/agendamento/useTodosAgendamentos';

const Empresas = () => {

  return (
    <>    
    <div className='painel-agendamentos'>
      <div className='cards-container'>
        <div className='agendamentos-proximos'>               
          
        </div>
      
        <div className='todos-agendamentos'>          
               
        </div>
      </div>
    </div>
    </>
  )
}

export default Empresas