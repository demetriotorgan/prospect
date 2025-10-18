import React, { useEffect, useState } from 'react';
import './ModalEditarProspec.css';
import useSalvarProspec from '../../hooks/useEditarProspec';


const ModalEditarProspec = ({ onModal, setOnModal, prospec, onAtualizarProspec  }) => {
  const [notaAtual, setNotaAtual] = useState(prospec?.interesse || 0);
  const [resultado, setResultado] = useState(prospec?.indicador || '');
  const [observacao, setObservacao] = useState(prospec?.observacao || '');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [funil, setFunil] = useState('topo');
  const [onAgendou, setOnAgendou] = useState(false);
  
//hook's
 const { handleSalvar, loading } = useSalvarProspec({ prospec, onAtualizarProspec, setOnModal });
  
   const handleResultadoChange = (valor) => {
    setResultado(valor);
    setOnAgendou(valor === "ligou-agendou-reuniao");
  };

  useEffect(() => {    
    if (prospec) {
      setNotaAtual(prospec.interesse || 0);
      setResultado(prospec.indicador || '');
      setObservacao(prospec.observacao || ''); 
        // Controla se o usuário já tinha agendado reunião
      setOnAgendou(prospec.indicador === "ligou-agendou-reuniao");   
      setFunil(prospec.funil);
    }

    if(prospec?.retornoAgendado){
    const dataISO = new Date(prospec.retornoAgendado).toISOString().slice(0, 10); // yyyy-MM-dd    
    setData(dataISO);
    
    const dataHora = new Date(prospec.retornoAgendado);
    const horaFormatada = dataHora.toISOString().slice(11, 16); // HH:mm
    setHora(horaFormatada);            
    }
  }, [prospec]);    

  if (!onModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setOnModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Empresa: {prospec.nomeEmpresa}</h1>        
        <label>
          Resultado:
          <select 
        value={resultado} 
        onChange={(e) => handleResultadoChange(e.target.value)}>
            <option value="">--Resultados--</option>
            <option value="nao-prospectado">Não Prospectado</option>
            <option value="ligou-nao-era-dono">Atendeu mas não era o dono</option>
            <option value="ligou-sem-interesse">Não teve interesse</option>
            <option value="ligou-pediu-retorno">Pediu retorno</option>
            <option value="ligou-agendou-reuniao">Agendou reunião</option>
            <option value="ligou-nao-respondeu">Não atendeu</option>
          </select>
        </label>

        <label>
          Obs:
          <textarea 
          rows={5} 
          cols={50}
          value={observacao} 
          onChange={(e) => setObservacao(e.target.value)} 
          />
        </label>
        <label>
            Nota de Avaliação:        
        <div className="nota-buttons">
          {[1, 2, 3, 4, 5].map((nota) => (
            <button
              type="button"
              key={nota}
              onClick={() => setNotaAtual(nota)}
              className={`nota-button ${notaAtual === nota ? 'selected' : ''}`}
            >
              {nota}
            </button>
          ))}
        </div>
        </label>

        {onAgendou ? 
        <div>
        <label>
            Data:
        <input 
        type='date'
        value={data}
        onChange={(e)=>setData(e.target.value)}
        />
        </label>
        <label>
            Horário:
        <input 
        type='time'
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        />
        </label>
        </div>
        :''}
        
        <label>
        Funil:
        <select
        value={funil} 
        onChange={(e) => setFunil(e.target.value)}>        
            <option value='topo'>Topo</option>
            <option value='meio'>Meio</option>
            <option value='fundo'>Fundo</option>
        </select>
        </label>

        <button className="btn-salvar" 
        onClick={()=>handleSalvar({ resultado, observacao, notaAtual, funil, data, hora, onAgendou })} 
        disabled={loading}>
          Salvar
        </button>
        <button className="btn-fechar" onClick={() => setOnModal(false)}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalEditarProspec;
