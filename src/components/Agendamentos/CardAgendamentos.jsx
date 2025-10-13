import React, { useState } from 'react';
import { getTempoRestanteClass, calcularTempoHoje, formatDataUTC, formatHorarioUTC } from '../../hooks/agendamento/utilsAgendamentos';
import { useEncerrarAgendamento } from '../../hooks/agendamento/useEncerrarAgendamento';
import loading  from '../../assets/loading.gif'
import { IconAgenda } from '../../util/Icones';

const CardAgendamentos = ({ todosAgendamentos,onAgendamentoEncerrado }) => {
  const [valores, setValores] = useState({});
  const { encerrarAgendamento, loadingIds, isLoading,} = useEncerrarAgendamento();

  const handleSelectChange = (id, value)=>{
    setValores(prev => ({
      ...prev,
      [id]: {...prev[id], resultado:value}
    }));
  };

  const handleTextoChange = (id, value)=>{
    setValores((prev)=>({
      ...prev,
      [id]: {...prev[id], texto:value}
    }));
  };

  const handleEncerrarAgendamento = async(reuniao)=>{
    const dados = valores[reuniao._id];
    console.log('Encerrando agendamento: ', reuniao._id, dados);
    try {
      const response = await encerrarAgendamento(reuniao, valores);
      if(response && onAgendamentoEncerrado){
        onAgendamentoEncerrado(reuniao._id);
      }
    } catch (error) {
       console.error("❌ Erro ao encerrar agendamento:", error);
    }
  };
  
  return (
    <>

      {todosAgendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado</p>
      ) : (        
           todosAgendamentos.map((agendamento) => {
          const valoresAtuais = valores[agendamento._id] || {
            resultado: '',
            texto: '',
          };
          const carregando = isLoading(agendamento._id);
        return(
          <div className="card" key={agendamento._id}>
            <h3 className="empresa">{agendamento.nomeEmpresa}</h3>

            <div className="telefone">
              <strong>📞</strong> {agendamento.telefone || "Não informado"}
            </div>

            <div className="agendamento-info">
              <p><strong>📅 Data:</strong> {formatDataUTC(agendamento.retornoAgendado)}</p>
              <p><strong>⏰ Horário:</strong> {formatHorarioUTC(agendamento.dataTime)}</p>
              <p><strong>📝 Obs.:</strong> {agendamento.observacao || "Nenhuma"}</p>
            </div>

            <div className="extra-info">
              <p><strong>Nicho:</strong> {agendamento.nicho || "Não informado"}</p>
              <p><strong>Vendedor:</strong> {agendamento.emailUsuario || "Não atribuído"}</p>
            </div>

            <div className={getTempoRestanteClass(agendamento.tempoRestante)}>
              ⏳ Tempo Restante: <span className={agendamento.tempoRestante === 'atrasado' ? 'pulse' : ''}>
                {agendamento.tempoRestante === 'Hoje' ?
                calcularTempoHoje(agendamento.dataTime) :
                agendamento.tempoRestante
                }</span>
            </div>
            <label>
                Resultado
                <select
                  value={valoresAtuais.resultado}
                  onChange={(e) => handleSelectChange(agendamento._id, e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="negocio-fechado">Negócio Fechado</option>
                  <option value="nao-teve-interesse">Não teve interesse</option>
                  <option value="no-show">No Show</option>
                  <option value="remarcar">Remarcar Reunião</option>            
                </select>
              </label>

              <div className='campo-resultado'>
                <label>Observação:
                <textarea 
                  rows="5" 
                  cols="30" 
                  placeholder="Digite seu texto aqui"
                  value={valoresAtuais.texto}
                  onChange={(e) => handleTextoChange(agendamento._id, e.target.value)}
                ></textarea>
                </label>
              </div>

            <button className='botao-encerrar-expirado' onClick={()=>handleEncerrarAgendamento(agendamento)} disabled={carregando}>
             {carregando ? <img className='loading' src={loading} alt="Encerrar" /> : 'Encerrar' }
            </button>
          </div>
          );
        })
      )}
    </>
  );
};

export default CardAgendamentos;