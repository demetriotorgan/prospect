import React from 'react'

const SelecionarCidades = ({listaCidades,setCidadeSelecionada}) => {
    const handleChange = (e)=>{
        setCidadeSelecionada(e.target.value);
    }
  return (
    <div className='selecionar-cidade'>        
        <select onChange={handleChange}>
          <option value=''>Selecione uma cidade</option>
          {listaCidades.length === 0 ? (
            <option disabled>Carregando cidades...</option>
          ) : (
            listaCidades.map((cidade, i) => (
            <option 
                key={i} 
                value={cidade}>
                {cidade}
            </option>
            ))
          )}        
        </select>   
      </div>

  )
}

export default SelecionarCidades