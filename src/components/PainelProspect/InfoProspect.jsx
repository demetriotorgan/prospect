import { useState } from 'react';
import ProspectController from '../PainelProspect/ProspectController'

const InfoProspec = ({nichoOptions,handleNichoSelecionado,carregando,erro,empresasFiltradas,resumo,atualizarEmpresa,nichoSelecionado}) => {  

  const [showProspectController, setShowProspectController] = useState(false);
  const [onProspect, setOnProspect] = useState(false);

  const handleIniciarProspeccao = () => {
    setShowProspectController(true);    
  };

return(  
 <div className='painel-prospec'>
      <div className='painel-nichos'>
        <select onChange={handleNichoSelecionado} disabled={onProspect}>
          <option value="">--Selecione um Nicho--</option>
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
          <p>Não Prospectadas:<b>{resumo["nao-prospectado"] || 0}</b> </p>
          <p>Ligou e pediu retorno:<b>{resumo["ligou-pediu-retorno"] || 0}</b></p>
          <p>Ligou e Agendou: <b>{resumo["ligou-agendou-reuniao"] || 0}</b></p>
          <h3>Atenção</h3>
          <hr className='divisoria-atencao' />
          <p>Ligou mas não era o dono:<b>{resumo["ligou-nao-era-dono"] || 0}</b></p>
          <p>Ligou mas não respondeu: <b>{resumo["ligou-nao-respondeu"] || 0}</b></p>
          <h3>Não Prioritário</h3>
          <hr className='divisoria-nao-prioritario' />
          <p>Ligou mas não teve interesse:<b>{resumo["ligou-sem-interesse"] || 0}</b> </p>
        </div>
        <button onClick={handleIniciarProspeccao} disabled={!nichoSelecionado}>Inciar Prospeção🚀</button>
      </div>  
      {showProspectController && 
      <ProspectController
      empresas={empresasFiltradas.filter(emp=> emp.statusAtual === 'nao-prospectado')}
      onAtualizarEmpresa={atualizarEmpresa}
      setOnProspect={setOnProspect}
      setShowProspectController={setShowProspectController}
      />
      }    
 </div>
);
};


export default InfoProspec;
