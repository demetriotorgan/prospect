import React from 'react'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar módulos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CardInfoGeralEstado = ({totalEstados,top3Estados,porcentagemPorEstado}) => {
    // Preparar dados do gráfico
  const data = {
    labels: porcentagemPorEstado.map((item) => item.estado),
    datasets: [
      {
        label: "Porcentagem de Empresas (%)",
        data: porcentagemPorEstado.map((item) => item.porcentagem),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"], // azul, verde, laranja
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.raw}%` } },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // porcentagem sempre até 100
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };
  return (
    <div className='card-info'>
        <h2>Empresas x Estado</h2>
        <p>Estados atendidos: {totalEstados} </p>
        <p>Top 3 Estados: </p>   
        <ul>
        {top3Estados.map((estado, index)=>(
            <li key={index}>{estado.estado} - {estado.total}</li>
        ))}
        </ul>        
          <div className='grafico-info-gerais'>
              <Bar data={data} options={options} />
          </div>          
    </div>
  )
}

export default CardInfoGeralEstado