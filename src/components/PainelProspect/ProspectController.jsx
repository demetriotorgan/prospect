import React, { useEffect, useState } from 'react'
import './ProspectController.css'
import { useAuth } from '../../context/authContext';
import  {useProspeccao}  from '../../hooks/useProspeccao';
import { useProspectUI } from '../../hooks/useProspectUI';

const ProspectController = ({empresas,onAtualizarEmpresa,setOnProspect,setShowProspectController}) => {  
  
  //hooks
  const {user} = useAuth();

  const {currentIndex, setCurrentIndex, empresaAtual, handleFecharProspec } = useProspectUI({ empresas, setOnProspect, setShowProspectController });

  const {nota, resultado,prioridade,observacao,dataReuniao,tempoGasto,loading,erro,setObservacao, setDataReuniao, setPrioridade, handleNota, handleResultado, handleSalvarProspeccao} = useProspeccao({empresas, currentIndex, setCurrentIndex, user, onAtualizarEmpresa});  

if(!empresaAtual) return <p>Nenhuma empresa para prospectar</p>

  return (
    <div className='prospect-controller'>
      <h3 id='empresa-prospec'>Prospectando: {empresaAtual.nome}</h3>
        <p>Prospectados: {currentIndex}</p>
        <p>⏱ Tempo gasto nesta prospecção: {Math.floor(tempoGasto / 60)}m {tempoGasto % 60}s</p>

      <div className='info-basicas'>
        <h4>Informações Básicas</h4>
        <p><strong>Empresa ID:</strong> {empresaAtual._id}</p>
        <p><strong>User ID:</strong> {user._id}</p>
        <p><strong>Status:</strong> {empresaAtual.statusAtual}</p>        
      </div>

      <div className='info-empresa'>
        <h4>Dados da Empresa</h4>
        <p><strong>Nome:</strong> {empresaAtual.nome} </p>
        <p><strong>Endereço:</strong> {empresaAtual.endereco}</p>
        <p><strong>Cidade:</strong> {empresaAtual.cidade}</p>
        <p><strong>Bairro:</strong> {empresaAtual.bairro}</p>
        <p><strong>Estado:</strong> {empresaAtual.estado}</p>
      </div>

      <div className='info-telefone'>
        <h4>Telefone</h4>
        <p>{empresaAtual.telefone || "Sem Telefone"}</p>
      </div>
      <div className='resultados-prospec'>
        <select value={resultado} onChange={handleResultado}>
          <option value="">--Resultados--</option>
          <option value="nao-prospectado">Não Prospectado</option>
          <option value="ligou-nao-era-dono">Atendeu mas não era o dono</option>
          <option value="ligou-sem-interesse">Não teve interesse</option>
          <option value="ligou-pediu-retorno">Pediu retorno</option>
          <option value="ligou-agendou-reuniao">Agendou reunião</option>
          <option value="ligou-nao-respondeu">Não atendeu</option>
        </select>

        {resultado === 'ligou-agendou-reuniao' && 
        (<input 
        type='date'
        value={dataReuniao}
        onChange={(e) => setDataReuniao(e.target.value)}
        />)}       

        <label>
          Observação: 
        <input type='text'
        value={observacao}
        onChange={(e)=> setObservacao(e.target.value)}
        placeholder='Digite aqui sua observação...' />
        </label>

      <div className='avaliar-prospec'>
      <h4>Avalie o interesse:</h4>
      <div className="nota-buttons">
    {[1, 2, 3, 4, 5].map((notaAtual) => (
      <button
        type='button'
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
    <button onClick={handleSalvarProspeccao} disabled={loading}>
      {loading ? "Salvando..." : "Salvar e próxima"}
    </button>
    <button onClick={handleFecharProspec} className='botao-fechar'>Fechar</button>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      </div>
  </div>
  )
}

export default ProspectController