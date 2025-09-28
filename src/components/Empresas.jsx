import React, { useEffect, useState } from 'react'
import '../styles/Empresas.css'
import axios from 'axios';
import api from '../util/api'
import useAgendamentos7Dias from '../hooks/agendamento/useAgendamentos7dias';
import CardAgendamento7Dias from './Agendamentos/CardAgendamento7Dias';

const Empresas = () => {
 
  //hooks
  const {agendamentos, erro, carregando, recarregar: carregarAgendamentos} = useAgendamentos7Dias();

  return (
    <>    
    <div className='painel-agendamentos'>            
      <div className='cards-container'>
        <div className='agendamentos-proximos'>               
          <CardAgendamento7Dias 
          agendamentos={agendamentos}
          />
        </div>
      
        <div className='todos-agendamentos'>          
        <p>Todos agendamentos</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Empresas