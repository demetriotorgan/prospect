import React, { useState } from 'react';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import loading from '../../assets/loading.gif';
import { calcularTempoHoje, calcularPorcentagemBarra } from '../../hooks/agendamento/utilsAgendamentos';
import { FaStar } from 'react-icons/fa';
import api from '../../util/api';
import { useEncerrarAgendamento } from '../../hooks/agendamento/useEncerrarAgendamento';

const CardAgendamento7Dias = ({ listaAgendamentos,onAgendamentoEncerrado }) => {
  // Guarda os valores por ID do agendamento
  const [valores, setValores] = useState({});    
  const {encerrarAgendamento, isLoading} = useEncerrarAgendamento();

  const handleSelectChange = (id, value) => {
    setValores(prev => ({
      ...prev,
      [id]: { ...prev[id], resultado: value }
    }));
  };

  const handleTextoChange = (id, value) => {
    setValores(prev => ({
      ...prev,
      [id]: { ...prev[id], texto: value }
    }));
  };

  const handleEncerrarAgendamento = async(reuniao) => {  
    try {
    // ✅ Aguarda a requisição da API ser concluída
    const response = await encerrarAgendamento(reuniao, valores);

    // Se a API retornou sucesso, então remove o card
    if (response && onAgendamentoEncerrado) {
      onAgendamentoEncerrado(reuniao._id);
    }
  } catch (error) {
    console.error("❌ Erro ao encerrar agendamento:", error);
    // A função do hook já exibe alerta, então aqui não precisa repetir
  }
  };

  return (
    <>
      {listaAgendamentos && listaAgendamentos.length > 0 ? (
        listaAgendamentos.map((reuniao) => {
          const porcentagem = calcularPorcentagemBarra(reuniao.dataTime);
          const valoresAtuais = valores[reuniao._id] || { resultado: '', texto: '' };
          const carregando = isLoading(reuniao._id);

          return (
            <div className='card-agendamento' key={reuniao._id}>          
              <div className='grupo-principal'>
                <h3>Empresa: {reuniao.nomeEmpresa}</h3>
                <p>
                  Data: {format(new Date(reuniao.retornoAgendado), "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p>
                  Horário: {reuniao.dataTime ? format(new Date(reuniao.dataTime), "HH:mm", { locale: ptBR }) : "Não informado"}
                </p>
                <p className='agenda-telefone'>
                  {reuniao.telefone || "Sem Telefone"}
                </p>
                <p className='tempo-restante'>
                  ⏳ {calcularTempoHoje(reuniao.dataTime)}
                </p>

                {porcentagem < 100 && porcentagem > 0 && (
                  <div className="barra-tempo-container">
                    <div className="barra-tempo" style={{ width: `${porcentagem}%` }} />
                  </div>
                )}
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
                <p>Possui site?: {reuniao.site || "Empresa sem site!"}</p>
              </div>

              <label>
                Resultado
                <select
                  value={valoresAtuais.resultado}
                  onChange={(e) => handleSelectChange(reuniao._id, e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="negocio-fechado">Negócio Fechado</option>
                  <option value="nao-teve-interesse">Não teve interesse</option>
                  <option value="no-show">No Show</option>
                  <option value="remarcar">Remarcar Reunião</option>            
                </select>
              </label>

              <div className='campo-resultado'>
                <textarea 
                  rows="5" 
                  cols="30" 
                  placeholder="Digite seu texto aqui"
                  value={valoresAtuais.texto}
                  onChange={(e) => handleTextoChange(reuniao._id, e.target.value)}
                ></textarea>
              </div>

              <div className='agendamento-painel'>
                <button onClick={() => handleEncerrarAgendamento(reuniao)} disabled={carregando}>
                  {carregando ? <img className='loading' src={loading} alt="Encerrar" /> : 'Encerrar' }                  
                </button>                
              </div>
              <p className='atencao-agendamento'>Atenção!</p>
            </div>
          );
        })
      ) : (
        "Sem Agendamentos recentes"
      )}
    </>
  );
};

export default CardAgendamento7Dias;
