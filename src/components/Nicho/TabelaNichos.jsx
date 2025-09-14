import React, { useState } from 'react'
import api from '../../util/api'
import loading from '../../assets/loading.gif'

const TabelaNichos = ({nichoOptions,setNichoOptions}) => {
    const [excluindo, setExcluindo] = useState(false);

    const excluirNicho =async (id)=>{
        if(window.confirm('Tem certeza que deseja excluir este nicho?')){
            try {
            setExcluindo(true);
            await api.delete(`deletar-nicho/${id}`);
            setNichoOptions(nichoOptions.filter((nicho)=>nicho._id !== id));
        } catch (error) {
            console.error('Erro ao excluir nicho', error);
        }finally{
            setExcluindo(false);
        }
    };
};
        
  return (
    <>
    <h2>Nichos Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {nichoOptions.map((nicho) => (
          <tr key={nicho._id}>
            <td>{nicho.tipo}</td>
            <td>
              <button onClick={() => excluirNicho(nicho._id)}>Excluir</button>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='excluir'>
    {excluindo ? <img src={loading} className='loading-excluir' /> : ''}
    </div>
    </>
  )
}

export default TabelaNichos