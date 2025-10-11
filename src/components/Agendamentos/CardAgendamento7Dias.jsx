import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import loading from '../../assets/loading.gif'
import { calcularTempoHoje, calcularPorcentagemBarra } from '../../hooks/agendamento/utilsAgendamentos';
import { FaStar } from 'react-icons/fa';

const CardAgendamento7Dias = ({listaAgendamentos}) => {
  const [resultado, setResultado] = useState('');
  const [texto, setTexto] = useState('');
  

  const handleEncerrarAgendamento = (reuniao) =>{  
    
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
                 ⏳ {calcularTempoHoje(reuniao.dataTime)}
                </p>
                {(() => {
  const porcentagem = calcularPorcentagemBarra(reuniao.dataTime);
  if (porcentagem < 100 && porcentagem > 0) {
    return (
      <div className="barra-tempo-container">
        <div
          className="barra-tempo"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    );
  }
  return null; // barra não aparece
})()}

              </div>

              <div className='grupo-secundario'>
                <h4>Dados do Agendamento:</h4>
                <p>Realizado por: {reuniao.usuarioId.email}</p>
                <p>
                  Qualificação: {
                    [...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < reuniao.interesse ? "#FFD700" : "#DDD"} />
                    ))
                  }
                </p>
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
                <button onClick={()=>handleEncerrarAgendamento(reuniao)}><img className='loading' src={loading} /></button>                
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
