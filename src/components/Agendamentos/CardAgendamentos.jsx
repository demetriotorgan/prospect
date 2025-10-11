import React from 'react';
import { getTempoRestanteClass, calcularTempoHoje, formatDataUTC, formatHorarioUTC } from '../../hooks/agendamento/utilsAgendamentos';

const CardAgendamentos = ({ todosAgendamentos }) => {
  
  return (
    <>
      {todosAgendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        todosAgendamentos.map((agendamento) => (
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
          </div>
        ))
      )}
    </>
  );
};

export default CardAgendamentos;