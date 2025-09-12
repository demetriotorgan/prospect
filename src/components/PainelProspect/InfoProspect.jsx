import { useState } from 'react';
import ProspectController from '../PainelProspect/ProspectController'
import NichoSelector from './NichoSelector';
import ResumoProspec from './ResumoProspec'
import BotaoProspeccao from './BotaoProspeccao';

const InfoProspec = ({nichoOptions,handleNichoSelecionado,carregando,erro,empresasFiltradas,resumo,atualizarEmpresa,nichoSelecionado,erroNicho}) => {  

  const [showProspectController, setShowProspectController] = useState(false);
  const [onProspect, setOnProspect] = useState(false);
  const [aProspectar, setAprospectar] = useState([]);

  const handleIniciarProspeccao = () => {
    setShowProspectController(true);    
    setAprospectar(empresasFiltradas.filter(emp=> emp.statusAtual === 'nao-prospectado'))
  };  

  const handleProspectarPrioridadeAlta = (empresas) => {
  const filtradas = empresas.filter(emp =>
    emp.statusAtual === "ligou-pediu-retorno"    
  );
  setAprospectar(filtradas);      // atualiza lista de empresas
  setShowProspectController(true); // abre o ProspectController
};

const handleProspectarPrioridadeAtencao = (empresas) =>{
  const filtradas = empresas.filter(emp=>(
    emp.statusAtual === "ligou-nao-era-dono" ||
    emp.statusAtual === "ligou-nao-respondeu"
  ));
  setAprospectar(filtradas);      // atualiza lista de empresas
  setShowProspectController(true); // abre o ProspectController
}

  console.log(aProspectar);

return(  
 <div className='painel-prospec'>
      <div className='painel-nichos'>
        <NichoSelector 
        nichoOptions={nichoOptions}
        erroNicho={erroNicho}
        nichoSelecionado={nichoSelecionado}
        handleNichoSelecionado={handleNichoSelecionado}
        carregando={carregando}
        erro={erro}
        disabled={onProspect}
        />

        <div className='nicho-info'>
          <ResumoProspec 
          resumo={resumo} 
          totalEmpresas={empresasFiltradas.length} 
          empresasFiltradas={empresasFiltradas}
          onProspectarPrioridadeAlta={handleProspectarPrioridadeAlta}
          onProspectarPrioridadeAtencao={handleProspectarPrioridadeAtencao}
          showProspectController={showProspectController}
          nichoSelecionado={nichoSelecionado}
          
          />
        </div>
        <BotaoProspeccao 
        onClick={handleIniciarProspeccao} 
        disabled={!nichoSelecionado} 
        />
      </div>  

      {showProspectController && 
      <ProspectController
      empresas={aProspectar}
      onAtualizarEmpresa={atualizarEmpresa}
      setOnProspect={setOnProspect}
      setShowProspectController={setShowProspectController}
      />
      }    
 </div>
);
};


export default InfoProspec;
