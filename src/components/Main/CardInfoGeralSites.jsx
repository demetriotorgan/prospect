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

const CardInfoGeralSites = ({presencaOnline,top3NichosComSite}) => {
   // Preparar dados para o gráfico
  const data = {
    labels: top3NichosComSite.map((n) => n.tipo),
    datasets: [
      {
        label: "Empresas com site",
        data: top3NichosComSite.map((n) => n.total),
        backgroundColor: ["#36A2EB", "#4BC0C0", "#FFCE56"], // cores diferentes
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // esconde legenda
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw} empresas`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // força inteiros
        },
      },
    },
  };
  return (
    <div className='card-info'>
    <h2>Empresas x Presença Online </h2>    
    <p>Empresas com site preenchido: {presencaOnline.comSite} </p>
    <p>Percentual de site preenchido: {presencaOnline.percentual}% </p>
    <p>Top 3 Nichos sem presença online</p>
        <div className='grafico-info-gerais'>
         <Bar data={data} options={options} />
        </div>
    </div>
  )
}

export default CardInfoGeralSites