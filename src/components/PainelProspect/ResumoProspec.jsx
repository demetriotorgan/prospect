import { useEffect } from 'react';
const ResumoLinha = ({ label, valor }) => (
  <p>{label}: <b>{valor || 0}</b></p>
);

const ResumoProspec = ({ resumo, totalEmpresas, onProspectarPrioridadeAlta, empresasFiltradas,showProspectController,nichoSelecionado,onProspectarPrioridadeAtencao }) => {
    
  return (
    <div>
      <p>Total de Empresas: <b>{totalEmpresas}</b></p>

      <h3>Prioridade Alta</h3>
      <hr className='divisoria-prioridade' />
      <ResumoLinha label="Prospectadas" valor={resumo["prospectado"]} />
      <ResumoLinha label="Não Prospectadas" valor={resumo["nao-prospectado"]} />
      <ResumoLinha label="Ligou e pediu retorno" valor={resumo["ligou-pediu-retorno"]} />
      <ResumoLinha label="Ligou e Agendou" valor={resumo["ligou-agendou-reuniao"]} />
      <button 
      onClick={()=>onProspectarPrioridadeAlta(empresasFiltradas)}
      disabled={showProspectController || !nichoSelecionado}
      >
      Prospectar Prioridades ⚡
      </button>

      <h3>Atenção</h3>
      <hr className='divisoria-atencao' />
      <ResumoLinha label="Ligou mas não era o dono" valor={resumo["ligou-nao-era-dono"]} />
      <ResumoLinha label="Ligou mas não respondeu" valor={resumo["ligou-nao-respondeu"]} />
      <button className='button-atencao'
      onClick={()=>onProspectarPrioridadeAtencao(empresasFiltradas)}
      disabled={showProspectController || !nichoSelecionado}
      >
      Prospectar Atenção⚠️
      </button>

      <h3>Não Prioritário</h3>
      <hr className='divisoria-nao-prioritario' />
      <ResumoLinha label="Ligou mas não teve interesse" valor={resumo["ligou-sem-interesse"]} />
    </div>
  );
};

export default ResumoProspec;