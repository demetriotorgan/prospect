import React, { useEffect, useState } from 'react'
import '../styles/Empresas.css'
import axios from 'axios';
import api from '../util/api'

const Empresas = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  

  useEffect(()=>{
    const carregarAgendamentos = async()=>{
      try {
        const response = await api.get('/agenda/proximos-7-dias');
        console.log('Agendamentos: ', response.data);
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar agendamentos', error);
      }
    };
    carregarAgendamentos();
  },[])

  return (
    <>    
    <div className='painel-agendamentos'>            
      <div className='cards-container'>
        <div className='agendamentos-proximos'>               
          {agendamentos ? agendamentos.map((reuniao, index)=>(
            <div className='card-agendamento' key={index}>          
    <div className='grupo-principal'>
      <h3>Empresa:{reuniao.nomeEmpresa}</h3>
      <p>Data: {reuniao.retornoAgendado}</p>
      <p>Horário: {reuniao.dataTime}</p>      
      <p className='agenda-telefone'>{reuniao.telefone ? reuniao.telefone : "Sem Telefone"}</p>
      <p className='tempo-restante'>Tempo Restante: {reuniao.diasRestantes}</p>
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
      <button>Salvar</button>
      <button className='btn-excluir'>Excluir</button>
    </div>
    <p className='atencao-agendamento'>Atenção!</p>
          </div>
          )): 'Sem Agendamentos'};
        </div>
      
        <div className='todos-agendamentos'>          

        </div>
      </div>
    </div>
    </>
  )
}

export default Empresas