import React, { useEffect, useState } from 'react'
import { calcularMetricas } from '../../util/metricas'
import api from '../../util/api';
import moment from 'moment';

const CardNicho = ({nicho, empresas}) => {
  const [ultimoRegistro, setUltimoRegistro] = useState('');
  const [semAtualizacoes, setSemAtualizacoes] = useState('');
  const metrica = calcularMetricas(empresas);

  const bucarUltimoRegistro = async()=>{
      try {
        const response = await api.get(`ultimo-registro/${nicho}`);
        const registro = response.data;
        const dataFormatada = moment(registro).format('DD/MM/YYYY');
        setUltimoRegistro(dataFormatada);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setSemAtualizacoes('Sem atualizações');
          setUltimoRegistro(''); // Limpa o valor de ultimoRegistro
        } else {
          setSemAtualizacoes('Erro ao buscar último registro');
        }
      }
  };

   useEffect(() => {
    bucarUltimoRegistro();
  }, [nicho]);
  
  return (
    <div className="card-nicho">
  {/* <!-- 1. Cabeçalho --> */}
  <div className="card-nicho-header">
    {nicho}
  </div>

  {/* <!-- 2. Resumo --> */}
  <div className="card-nicho-overview">
    <p>Total de Empresas: {metrica.totalEmpresas}</p>
    <p>Total de Prospectadas: {metrica.totalProspectadas}</p>
  </div>

  {/* <!-- 3. Seções --> */}
  <div className="card-nicho-section">
    <h3>Agendamentos</h3>
    <p>Total de Agendamentos: {metrica.agendamentos}</p>
    <p>Pedidos de Retorno: {metrica.retorno}</p>
  </div>

  <div className="card-nicho-section">
    <h3>Indefinidos</h3>
    <p>Total sem resposta: {metrica.semResposta}</p>
    <p>Indefinidos: {metrica.indefinidos}</p>
    <p>Não prospectados: {metrica.naoProspec}</p>
  </div>

  <div className="card-nicho-section">
    <h3>Não-Prioritários</h3>
    <p>Sem interesse: {metrica.semInteresse}</p>
  </div>

  {/* <!-- 4. Rodapé --> */}
  <div className="card-nicho-footer">
    Última atualização: {ultimoRegistro ? ultimoRegistro : semAtualizacoes}
  </div>
</div>  
  )
}

export default CardNicho