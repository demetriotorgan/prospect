import React, { useState } from 'react'
import './ProspectController.css'

const ProspectController = () => {
  const [nota, setNota] = useState(null);
  const [resultado, setResultado] = useState('');
  const [prioridade, setPrioridade] = useState('');

  const handleNota = (notaSelecionada) => {
    setNota(notaSelecionada);
  };

  const handleResultado = (e) => {
    setResultado(e.target.value);
    if(e.target.value === 'ligou-agendou-reuniao'){
      setPrioridade('meio');
    }else if(e.target.value === 'ligou-sem-interesse'){
       setPrioridade('fundo');
    } else{
      setPrioridade('');
    }
  };

  return (
    <div className='prospect-controller'>
      <h3>Prospectar Empresas</h3>

      <div className='info-basicas'>
        <h4>Informações Básicas</h4>
        <p><strong>Empresa ID:</strong> </p>
        <p><strong>Status:</strong> </p>
        <p><strong>User ID:</strong> </p>
      </div>

      <div className='info-empresa'>
        <h4>Dados da Empresa</h4>
        <p><strong>Nome:</strong> </p>
        <p><strong>Endereço:</strong> </p>
        <p><strong>Cidade:</strong> </p>
        <p><strong>Bairro:</strong> </p>
        <p><strong>Estado:</strong> </p>
      </div>

      <div className='info-telefone'>
        <h4>Telefone</h4>
        <p>(43) 99999-9999</p>
      </div>
      <div className='resultados-prospec'>
        <select value={resultado} onChange={handleResultado}>
          <option>--Resultados--</option>
          <option value="nao-prospectado">Não Prospectado</option>
          <option value="ligou-nao-era-dono">Atendeu mas não era o dono</option>
          <option value="ligou-sem-interesse">Não teve interesse</option>
          <option value="ligou-pediu-retorno">Pediu retorno</option>
          <option value="ligou-agendou-reuniao">Agendou reunião</option>
          <option value="ligou-nao-respondeu">Não atendeu</option>
        </select>

        {resultado === 'ligou-agendou-reuniao' && <input 
        type='date'
        />}       

        <label>
          Observação: 
        <input type='text'
        placeholder='Digite aqui sua observação...' />
        </label>

      <div className='avaliar-prospec'>
      <h4>Avalie o interesse:</h4>
      <div className="nota-buttons">
    {[1, 2, 3, 4, 5].map((notaAtual) => (
      <button
        key={notaAtual}
        onClick={() => handleNota(notaAtual)}
        className={`nota-button ${nota === notaAtual ? 'selected' : ''}`}
      >
        {notaAtual}
      </button>
    ))}
  </div>
      {nota && <p>Nota selecionada: {nota}</p>}
      </div>

    <select value={prioridade} onChange={(e)=>setPrioridade(e.target.value)} >      
      <option value="topo">Topo</option>
      <option value="meio">Meio</option>
      <option value="fundo">Fundo</option>
    </select>
    <button>Salvar</button>
      </div>
  </div>
  )
}

export default ProspectController