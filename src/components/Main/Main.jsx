import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/Main.css'
import useCarregarEmpresas from '../../hooks/useCarregarEmpresas'
import CardMetricas from './CardMetricas'
import { calcularMetricas } from '../../util/metricas'
import useEmpresasPorNicho from '../../hooks/useEmpresasPorNicho'
import useCarregarNichos from '../../hooks/useCarregarNichos'
import { melhoresNichos } from '../../util/melhoresNichos'
import { IconAgenda, IconCidade, IconEstado, IconFire, IconOlho } from '../../util/Icones'
import CardInfoGeral from './CardInfoGeral'
import CardInfoGeralCidades from './CardInfoGeralCidades'
import CardInfoGeralNichos from './CardInfoGeralNichos'
import CardInfoGeralEstado from './CardInfoGeralEstado'
import CardInfoGeralSites from './CardInfoGeralSites'
import CardInfoGeralProspec from './CardInfoGeralProspec'
import loading from '../../assets/loading.gif'
import CardCidades from './CardCidades'
import useListarMinhasProspecs from '../../hooks/useListarMinhasProspecs'
import ModalEditarProspec from './ModalEditarProspec'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CardAgendamentoResultado from './CardAgendamentoResultado'
import CardProspecs from './CardProspecs'

const Main = () => {
  const [onModal, setOnModal] = useState(false);
  const [prospecAtual, setProspecAtual] = useState({});
  const [dataFormatada, setDataFormatada] = useState('');
  const [listaProspecs, setListaProspecs] = useState([]);
  //hook's
  const { nichoOptions } = useCarregarNichos();
  const { empresas, carregando, erro } = useCarregarEmpresas();
  const { empresasPorNicho } = useEmpresasPorNicho({ nichoOptions });
  const { prospecs, setProspecs, carregando: carregandoProspecs, erro: erroProspecs } = useListarMinhasProspecs();

  //Memoriza as métricas para não recalcular toda renderização
  const metricas = useMemo(() => calcularMetricas(empresas), [empresas]);
  // Top 4 nichos
  const topNichos = useMemo(() => melhoresNichos(empresasPorNicho, 4), [empresasPorNicho]);

  const handleEditarProspec = (prospec) => {
    setProspecAtual(prospec);
    setOnModal(true);
  }

  const handleAtualizarProspec = (prospecAtualizada) => {
    setProspecs((prev) =>
      prev.map((item) =>
        item._id === prospecAtualizada._id ? prospecAtualizada : item
      )
    );
  };

  return (
    <div className='main-dashboard'>
      <ModalEditarProspec
        onModal={onModal}
        setOnModal={setOnModal}
        prospec={prospecAtual}
        onAtualizarProspec={handleAtualizarProspec}
      />
      <h2>Resultados de Agendamentos: <IconAgenda /></h2>
      <div className='container-card'>
        <CardAgendamentoResultado />
      </div>
      <h2>Empresas Prospectadas <IconEstado /></h2>
      <div className="container-card">
        {carregandoProspecs ? (
          <img src={loading} className='loading-top-nichos' alt="Carregando prospecções..." />
        ) : erroProspecs ? (
          <p>Erro ao carregar prospecções.</p>
        ) : prospecs.length > 0 ? (
          prospecs.map((prospec, index) => (
            <CardProspecs 
            key={index}
            prospec={prospec}
            handleEditarProspec={handleEditarProspec}
            />
          ))
        ) : (
          'Sem Prospecções'
        )}
      </div>
      <div className="container">
        <h2>Top + Nichos <IconFire /></h2>
        <small>Aqui estão os quatro nichos mais aquecidos até o momento</small>
        <div className='nichos'>
          {carregando ? (<img src={loading} className='loading-top-nichos' />) : (
            topNichos.map((item, index) => (
              <CardMetricas key={index} titulo={item.titulo} metricas={item.metricas} />
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