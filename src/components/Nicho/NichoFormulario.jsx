import React, { useState } from 'react'
import loading from '../../assets/loading.gif'

const NichoFormulario = ({onSave,onLoading,onError,onSuccess}) => {
    const [nicho, setNicho] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nicho.trim()) return;
    onSave(nicho);
    setNicho("");    
  };

  return (
    <form className="nicho-form" onSubmit={handleSubmit}>
      <label htmlFor="nicho">Cadastrar Nicho</label>
      <input
        type="text"
        id="nicho"
        value={nicho}
        onChange={(e) => setNicho(e.target.value)}
        placeholder="Digite o nicho..."
      />
      <button type="submit">{onLoading ? <img src={loading} className='onLoading' />: 'Salvar'}</button>
    </form>
  )
}

export default NichoFormulario