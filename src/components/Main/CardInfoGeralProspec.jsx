import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar módulos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CardInfoGeralProspec = ({totalEmpresas,naoProspectadas,semResposta,indefinidos,semInteresse,agendamentos}) => {

const percentualNaoProspec = ((naoProspectadas/totalEmpresas)*100).toFixed(2);
const percentualSemResposta = (((semResposta+indefinidos)/totalEmpresas)*100).toFixed(2);
const percentualSemInteresse = ((semInteresse/totalEmpresas)*100).toFixed(2);
const percentualAgendamentos = ((agendamentos/totalEmpresas)*100).toFixed(2);

const data = {
    labels: [
      "Não Prospectadas",
      "Sem Resposta",
      "Sem Interesse",
      "Agendamentos",
    ],
    datasets: [
      {
        label: "% de Empresas",
        data: [
          percentualNaoProspec,
          percentualSemResposta,
          percentualSemInteresse,
          percentualAgendamentos,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw.toFixed(1)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className='card-info'>
        <h2>Status Geral da Prospecção</h2>
        <p>% Não Prospectadas: {percentualNaoProspec}%</p>
        <p>% Sem respota: {percentualSemResposta}% </p>
        <p>% Sem interesse: {percentualSemInteresse}% </p>
        <p>% Com agendamentos: {percentualAgendamentos}% </p>
        <div className='grafico-info-gerais'>
             <Bar data={data} options={options} />
        </div>
    </div>
  )
}

export default CardInfoGeralProspec