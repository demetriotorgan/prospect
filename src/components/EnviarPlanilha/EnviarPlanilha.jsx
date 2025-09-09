import React, { useEffect, useState } from 'react'
import './EnviarPlanilha.css'
import useCarregarNichos from '../../hooks/useCarregarNichos'
import loading from '../../assets/loading.gif'
import  useTransformarPlanilha  from '../../hooks/useTransformarPlanilha'
import useEnviarEmpresa from '../../hooks/useEnviarEmpresa'
import useSelecionarNicho from '../../hooks/useSelecionarNicho'
import useVerificarEmpresas from '../../hooks/useVerificarEmpresas'

const EnviarPlanilha = () => {        

    //hooks
    const {existentes, verificarEmpresas, isEmpresaExistente} = useVerificarEmpresas();
    const {dataTransformada, nichos,setNichos, processando, error, transformarArquivo} = useTransformarPlanilha(verificarEmpresas);
    const {nichoOptions} = useCarregarNichos();
    const {salvando, enviarEmpresas} = useEnviarEmpresa();
    const {nichoSelecionado, handleSelecionarNicho} = useSelecionarNicho();
    
    const handleExtract = (e)=>{
     const file = e.target.files[0];
     if(file){
      transformarArquivo(file);
     }
};

  return (
    <div className='envio-planilha'>
    <div className='campos-envio-container'>
      <h2>Enviar Planilha de dados</h2>
      <input type='file' onChange={handleExtract} />      
    </div>
    <div className='painel-envio'>
      {processando ? (
        <p>Processando...</p>
      ) : (
        <>
        <p>Total de Empresas: {dataTransformada.length}</p>
        <p>Total de Nichos: {Object.keys(nichos).length}</p>

        {Object.entries(nichos).map(([tipo, empresas])=>(
            <div key={tipo} className='nicho-card'>
                <h4>{tipo}({empresas.length})</h4>
                 {/* Caixa de seleção para Nicho Geral */}
    <label>Escolher Nicho Geral:</label>
    <select
      value={nichoSelecionado[tipo] || ""}
      onChange={(e) => handleSelecionarNicho(tipo, e.target.value)}
    >
      <option value="">-- Selecione --</option>
      {nichoOptions.length > 0 && nichoOptions.map((nicho, index)=>(
        <option key={index} value={nicho.tipo}>{nicho.tipo}</option>
      ))}
    </select>
    
    {/* Botão para enviar */}
    <button 
      className="btn-enviar"
      onClick={() => enviarEmpresas(tipo, empresas, nichoSelecionado, setNichos)}>
      {salvando ? <img src={loading} className='salvar-lista' /> : 'Enviar' }
    </button>
      <ul>
        {empresas.map((empresa, index)=>(
          <li key={index}>
          {empresa.nome} - {empresa.cidade}/{empresa.estado}
          {isEmpresaExistente(empresa.telefone) && (
            <span style={{ color: "green", marginLeft: "8px" }}>✔️</span>
          )}
          </li>
            ))}
      </ul>
      </div>
    ))}
  </>
)}
</div>
</div>
  )
}

export default EnviarPlanilha