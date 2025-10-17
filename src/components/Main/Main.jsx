import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/Main.css'
import useCarregarEmpresas from '../../hooks/useCarregarEmpresas'
import CardMetricas from './CardMetricas'
import {calcularMetricas} from '../../util/metricas'
import useEmpresasPorNicho from '../../hooks/useEmpresasPorNicho'
import useCarregarNichos from '../../hooks/useCarregarNichos'
import { melhoresNichos } from '../../util/melhoresNichos'
import { IconCidade, IconEstado, IconFire, IconOlho } from '../../util/Icones'
import CardInfoGeral from './CardInfoGeral'
import CardInfoGeralCidades from './CardInfoGeralCidades'
import CardInfoGeralNichos from './CardInfoGeralNichos'
import CardInfoGeralEstado from './CardInfoGeralEstado'
import CardInfoGeralSites from './CardInfoGeralSites'
import CardInfoGeralProspec from './CardInfoGeralProspec'
import loading from '../../assets/loading.gif'
import CardCidades from './CardCidades'
import { FaStar } from 'react-icons/fa';
import useListarMinhasProspecs from '../../hooks/useListarMinhasProspecs'

const Main = () => {

//hook's
const {nichoOptions} = useCarregarNichos();
const {empresas, carregando, erro} = useCarregarEmpresas();
const {empresasPorNicho} = useEmpresasPorNicho({nichoOptions});
const { prospecs, carregando: carregandoProspecs, erro: erroProspecs } = useListarMinhasProspecs();

//Memoriza as métricas para não recalcular toda renderização
const metricas = useMemo(()=> calcularMetricas(empresas), [empresas]);
// Top 4 nichos
  const topNichos = useMemo(() => melhoresNichos(empresasPorNicho, 4), [empresasPorNicho]);


  return (
    <div className='main-dashboard'>
      <h2>Empresas Prospectadas <IconEstado /></h2>
      <div className="container-card">
      {carregandoProspecs ? (
    <img src={loading} className='loading-top-nichos' alt="Carregando prospecções..." />
  ) : erroProspecs ? (
    <p>Erro ao carregar prospecções.</p>
  ) : prospecs.length > 0 ? (
    prospecs.map((prospec, index) => (
      <div className='card-empresas-prospectadas' key={index}>              
        <div className='card-prospec'>
          <h4>Nome da Empresa: {prospec.nomeEmpresa}</h4>
          <p>Resultado: {prospec.indicador}</p>
          <h3>Telefone: {prospec.telefone} </h3>                                          
          <p>
            Qualificação:{' '}
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < prospec.interesse ? "#FFD700" : "#DDD"} />
            ))}
          </p> 
          <small>Obs: {prospec.observacao}</small>
          <button>Editar</button>
          <button className='excluir-prospec'>Excluir</button>
        </div>                           
      </div>
    ))
  ) : (
    'Sem Prospecções'
  )}        
  </div>
        <div className="container">
            <h2>Top + Nichos <IconFire/></h2>
            <small>Aqui estão os quatro nichos mais aquecidos até o momento</small>
            <div className='nichos'>
              {carregando ? (<img src={loading} className='loading-top-nichos' />) : (
                topNichos.map((item, index)=>(
                <CardMetricas key={index} titulo={item.titulo} metricas={item.metricas}/>
              ))
              )}                         
            </div>    
            <div className='informacoes-gerais'>
              <h3>Infos gerais <IconOlho /></h3>
              <small>Aqui você encontra todas as informações mais importates das empresas cadastradas</small>
              <div className='painel-infos-gerais'>
                <CardInfoGeral
                  titulo="Agendamentos x Retorno"
                  labels={["Reuniões Agendadas", "Pedidos de Retorno"]}
                  valores={[metricas.agendamentos, metricas.retorno]}
                  total={metricas.totalEmpresas}
                />
                <CardInfoGeralCidades
                  cidades={metricas.cidadesMaiorConcentracao} // top 3 cidades
                  total={metricas.totalEmpresas}
                />
                <CardInfoGeralNichos
                totalDeNichos={metricas.totalDeNichos}
                top3Nichos={metricas.top3Nichos}
                contagemPorTipo={metricas.contagemPorTipo}
                />
                <CardInfoGeralEstado
                totalEstados={metricas.totalDeEstados}
                top3Estados={metricas.top3Estados}
                porcentagemPorEstado={metricas.porcentagemPorEstado}
                />

                <CardInfoGeralSites
                presencaOnline={metricas.presencaOnline}
                top3NichosComSite={metricas.top3NichosComSite}
                />

                <CardInfoGeralProspec 
                totalEmpresas={metricas.totalEmpresas}
                naoProspectadas={metricas.naoProspec}
                semResposta={metricas.semResposta}
                indefinidos={metricas.indefinidos}
                semInteresse={metricas.semInteresse}
                agendamentos={metricas.agendamentos}
                />

              </div>
            </div>
        </div>
        <div className="container">
            <h2>Cidades <IconCidade /></h2>            
            <CardCidades 
            metricas={metricas}
            />
        </div>        
    </div>
  )
}

export default Main