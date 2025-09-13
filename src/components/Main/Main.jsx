import React, { useMemo } from 'react'
import '../../styles/Main.css'
import useCarregarEmpresas from '../../hooks/useCarregarEmpresas'
import CardMetricas from './CardMetricas'
import {calcularMetricas} from '../../util/metricas'

const Main = () => {

//hook's
const {empresas, carregando, erro} = useCarregarEmpresas();

//Memoriza as métricas para não recalcular toda renderização
const metricas = useMemo(()=> calcularMetricas(empresas), [empresas]);

  return (
    <div className='main-dashboard'>
        <div className="container">
            <h2>Nichos</h2>
            <div className='nichos'>
            <CardMetricas titulo="Mecanica" metricas={metricas}/>
            <div className='card'><h3>Card 2</h3></div>
            <div className='card'><h3>Card 3</h3></div>
            <div className='card'><h3>Card 4</h3></div>
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