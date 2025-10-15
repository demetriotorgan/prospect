import React, { useEffect, useState } from 'react';
import { getTempoRestanteClass, formatDataUTC, formatHorarioUTC } from '../../hooks/agendamento/utilsAgendamentos';
import { useEncerrarAgendamento } from '../../hooks/agendamento/useEncerrarAgendamento';
import loading  from '../../assets/loading.gif'
import { IconAgenda } from '../../util/Icones';

const CardAgendamentos = ({listaAgendamentos,onAgendamentoAtualizado}) => {
  const [valores, setValores] = useState({});
  
  const { encerrarAgendamento, loadingIds, isLoading,} = useEncerrarAgendamento();

  useEffect(() => {
      if (listaAgendamentos && listaAgendamentos.length > 0) {
        const novosValores = {};
        listaAgendamentos.forEach((ag) => {
          novosValores[ag._id] = {          
            texto: ag.texto || '',          
            onRetorno: false
          };
        });
        setValores(novosValores);
      }
    }, [listaAgendamentos]);

  const handleSelectChange = (id, value)=>{
    setValores(prev => ({
      ...prev,
      [id]: {
        ...prev[id], 
        resultado:value,
        onRetorno: value === 'remarcar'
      }
    }));
  };

  const handleDataRetorno = (id, value) => {
  setValores(prev => ({
    ...prev,
    [id]: {
      ...prev[id],
      dataRetorno: value
    }
  }));
};

const handleHoraRetorno = (id, value)=>{
    setValores(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        horaRetorno:value
      }
    }));
  };

  const handleTextoChange = (id, value)=>{
    setValores((prev)=>({
      ...prev,
      [id]: {
        ...prev[id], 
        texto:value
      }
    }));
  };

  const handleEncerrarAgendamento = async(reuniao)=>{        
    try {
    const response = await encerrarAgendamento(reuniao, valores);
    console.log('Encerramento: ', response);
    
    const agendamentoAtualizado = response?.agendamento || response;

    if (response?.sucesso && agendamentoAtualizado) {
        // 🔁 Notifica o pai para atualizar o state local
        if (onAgendamentoAtualizado) {
          onAgendamentoAtualizado(response.agendamento);
        }
      }
      setValores(prev => {
        const novo = { ...prev };
        delete novo[reuniao._id];
        return novo;
        });
      
    } catch (error) {
       console.error("❌ Erro ao encerrar agendamento:", error);
    }
  };
  
  return (
    <>
      {listaAgendamentos.length === 0 ? (
        <div className='container-agendamentos'>
                <div className='sem-agendamentos'>
                  <p><IconAgenda /> Agendamentos Expirados</p>
                  <small>Todos os agendamentos marcados como expirados serão mostrados neste painel</small>
                </div>
                </div>
      ) : (        
           listaAgendamentos.map((agendamento) => {
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
              ⏳ Tempo Restante: 
              <span className={agendamento.tempoRestante === 'Agendamento Expirado' ? 'pulse' : ''}>
                {agendamento.tempoRestante}
              </span>
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
              {valoresAtuais.onRetorno ? (
                <div className='remarcar-data'>
                <label>
                <input 
                type='date'
                value={valoresAtuais.dataRetorno || ''}
                onChange={(e)=>handleDataRetorno(agendamento._id, e.target.value)}
                />
                </label>                
                <label>
                Hora da Reunião:
                <input type='time' 
                value={valoresAtuais.horaRetorno || ''}
                onChange={(e)=>handleHoraRetorno(agendamento._id,e.target.value)}
                />
                </label>
                </div>
              ):null}

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