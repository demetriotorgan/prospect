import React from 'react'
import loading from '../../assets/loading.gif'

const NichoSelector = ({ nichoOptions, nichoSelecionado, handleNichoSelecionado, carregando, erro, disabled,erroNicho }) => (
  <div>
    {carregando ? (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      <img src={loading} className="loading-nichos" style={{ width: 20, height: 20, marginRight: 5 }} />
      <span>Carregando nichos...</span>      
    </div>
  ): (
    <>
    <select onChange={handleNichoSelecionado} disabled={disabled} value={nichoSelecionado || ""}>
      <option value="">--Selecione um Nicho</option>
      {nichoOptions.map((nicho, index) => (
        <option key={index} value={nicho.tipo}>{nicho.tipo}</option>
      ))}
    </select>    
    {erroNicho && <p style={{ color: 'red' }}>{erroNicho}</p>}
    </>
  )
  }
    
  </div>
);


export default NichoSelector