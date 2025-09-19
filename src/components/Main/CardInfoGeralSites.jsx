import React from 'react'

const CardInfoGeralSites = ({presencaOnline}) => {
  return (
    <div className='card-info'>
    <h2>Empresas x Presença Online </h2>    
    <p>Empresas com site preenchido: {presencaOnline.comSite} </p>
    <p>Percentual de site preenchido: {presencaOnline.percentual}% </p>
    <p>Top 3 Nichos sem presença online</p>
        <div className='grafico-info-gerais'>
        Grafico
        </div>
    </div>
  )
}

export default CardInfoGeralSites