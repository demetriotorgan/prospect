import { useState } from 'react';
import ProspectController from '../PainelProspect/ProspectController'

const InfoProspec = ({nichoOptions,handleNichoSelecionado,carregando,erro,empresasFiltradas,resumo,atualizarEmpresa}) => {  

  const [showProspectController, setShowProspectController] = useState(false);

  const handleIniciarProspeccao = () => {
    setShowProspectController(true);
  };

return(  
 <div className='painel-prospec'>
      <div className='painel-nichos'>
        <select onChange={handleNichoSelecionado}>
          <option>--Selecione um Nicho--</option>
          {nichoOptions.map((nicho, index) => (
            <option key={index} value={nicho.tipo}>{nicho.tipo}</option>
          ))}
        </select>
        {carregando && <p>Carregando...</p>}
        {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
        <div className='nicho-info'>
          <p>Total de Empresas: <b>{empresasFiltradas.length}</b> </p>
          <h3>Prioridade Alta</h3>
          <hr className='divisoria-prioridade' />
          <p>Prospectadas: <b>{resumo["prospectado"] || 0}</b></p>
          <p>Não Prospectadas:<b>{resumo["não-prospectado"] || 0}</b> </p>
          <p>Ligou e pediu retorno:<b>{resumo["ligou-pediu-retorno"] || 0}</b></p>
          <h3>Atenção</h3>
          <hr className='divisoria-atencao' />
          <p>Ligou mas não era o dono:<b>{resumo["ligou-nao-era-dono"] || 0}</b></p>
          <p>Ligou mas não respondeu: <b>{resumo["ligou-nao-respondeu"] || 0}</b></p>
          <h3>Não Prioritário</h3>
          <hr className='divisoria-nao-prioritario' />
          <p>Ligou mas não teve interesse:<b>{resumo["ligou-nao-teve-interesse"] || 0}</b> </p>
        </div>
        <button onClick={handleIniciarProspeccao}>Inciar Prospeção🚀</button>
      </div>  
      {showProspectController && 
      <ProspectController
      empresas={empresasFiltradas.filter(emp=> emp.statusAtual === 'não-prospectado')}
      onAtualizarEmpresa={atualizarEmpresa}
      />
      }    
 </div>
);
};


export default InfoProspec;
