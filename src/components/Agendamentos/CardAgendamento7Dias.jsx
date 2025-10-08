import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import loading from '../../assets/loading.gif'


const CardAgendamento7Dias = () => {
  const [resultado, setResultado] = useState('');
  const [texto, setTexto] = useState('');
  const [listaAgendamentos, setListaAgendamentos] = useState([]);

  useEffect(()=>{
    setListaAgendamentos(agendamentos || []);
  },[agendamentos]);
  
  // console.log(agendamentos)
    
  const handleEncerrarAgendamento = (reuniao) =>{  
    setListaAgendamentos((prev)=> prev.filter((item)=> item.empresaId !== reuniao.empresaId));
  }

  return (
    <>
      {listaAgendamentos && listaAgendamentos.length > 0 ? (
        listaAgendamentos.map((reuniao, index) => {
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
                <select
                value={resultado}
                onChange={(e)=> setResultado(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="negocio-fechado">Negócio Fechado</option>
                  <option value="nao-teve-interesse">Não teve interesse</option>
                  <option value="no-show">NoShow</option>
                  <option value="remarcar">Remarcar Reunião</option>            
                </select>
              </label>

              <div className='campo-resultado'>
                <textarea 
                  rows="5" 
                  cols="30" 
                  placeholder="Digite seu texto aqui"
                  value={texto}
                  onChange={(e)=>setTexto(e.target.value)}
                  ></textarea>
              </div>
              <div className='agendamento-painel'>
                <button onClick={()=>handleEncerrarAgendamento(reuniao)}>{salvando ? <img className='loading' src={loading} />: 'Encerrar'}</button>                
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
