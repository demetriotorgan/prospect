import React from 'react'
import GraficoCidadesMenosProspectadas from './GraficoCidadesMenosProspectadas'

const CidadeMenorProspec = ({metricas}) => {
  return (
    <>
    <h2>Cidades com menor prospecção</h2>
            <p>Total de Empresas:{metricas.totalEmpresas} </p>
            <p>Não prospectadas: {metricas.naoProspec}</p>
            <p>% percentual:{((metricas.naoProspec / metricas.totalEmpresas)*100).toFixed(2)}% </p>
            <p>Cidades: </p>
            <ul>
      {metricas.top3CidadesMenosProspectadas.map((cidade, index) => (
        <li key={index}>
          {cidade.cidade} : {cidade.quantidade}
          {metricas.totalProspectadas > 0 && (
            <span>
              {" "}
              ({((cidade.quantidade / metricas.totalProspectadas) * 100).toFixed(1)}%)
            </span>
          )}
        </li>
      ))}
    </ul>
            <div className='grafico-info-gerais'>
                <GraficoCidadesMenosProspectadas cidades={metricas.top3CidadesMenosProspectadas} />
            </div>
    </>
  )
}

export default CidadeMenorProspec