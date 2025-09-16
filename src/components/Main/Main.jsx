import React, { useMemo } from 'react'
import '../../styles/Main.css'
import useCarregarEmpresas from '../../hooks/useCarregarEmpresas'
import CardMetricas from './CardMetricas'
import {calcularMetricas} from '../../util/metricas'
import useEmpresasPorNicho from '../../hooks/useEmpresasPorNicho'
import useCarregarNichos from '../../hooks/useCarregarNichos'
import { melhoresNichos } from '../../util/melhoresNichos'

const Main = () => {

//hook's
const {nichoOptions} = useCarregarNichos();
const {empresas, carregando, erro} = useCarregarEmpresas();
const {empresasPorNicho} = useEmpresasPorNicho({nichoOptions});

//Memoriza as métricas para não recalcular toda renderização
const metricas = useMemo(()=> calcularMetricas(empresas), [empresas]);

// Top 4 nichos
  const topNichos = useMemo(() => melhoresNichos(empresasPorNicho, 4), [empresasPorNicho]);


  return (
    <div className='main-dashboard'>
        <div className="container">
            <h2>Nichos</h2>
            <div className='nichos'>
              {topNichos.map((item, index)=>(
                <CardMetricas key={index} titulo={item.titulo} metricas={item.metricas}/>
              ))}           
            </div>    
            <div className='informacoes-gerais'>
              <h3>Card 5 - Infos gerais</h3>
            </div>
        </div>
        <div className="container">
            <h2>Cidades</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi doloribus aspernatur perspiciatis cum repudiandae quisquam eaque maxime sint earum praesentium numquam exercitationem qui quo sit veritatis repellendus voluptate, architecto sed.</p>
        </div>
        <div className="container">
            <h2>Empresas</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere distinctio ipsam incidunt ut aut ducimus cumque voluptatibus voluptate alias temporibus eveniet, optio iste veniam placeat voluptates suscipit, debitis odit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi maxime libero sint facilis fugit neque repellendus aut quisquam officiis saepe dolorem, velit culpa aspernatur omnis soluta fuga voluptatibus, laudantium quam!</p>
        </div>
    </div>
  )
}

export default Main