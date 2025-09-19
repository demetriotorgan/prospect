import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// registrar elementos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CardInfoGeralNichos = ({ totalDeNichos = 0, top3Nichos = [],contagemPorTipo }) => {
  // Prepara dados do gráfico
  const labels = top3Nichos.map((nicho, idx) => `N${idx + 1}`)
  const data = {
    labels,
    datasets: [
      {
        label: 'Qtd. de Empresas',
        data: top3Nichos.map(nicho => nicho.total),
        backgroundColor: ['#04bb20', '#e6e6ef', '#b0b3c1']
      }
    ]
  }

  const options = {
    indexAxis: 'y', // barras horizontais
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#e6e6ef' }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} empresas`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#e6e6ef' },
        grid: { color: '#42434a' }
      },
      y: {
        ticks: { color: '#e6e6ef' },
        grid: { color: '#42434a' }
      }
    }
  }

  // Calcula total de empresas nos top 3
  const totalTop3 = top3Nichos.reduce((acc, n) => acc + n.total, 0)
  const totalEmpresas = totalTop3 // poderia vir de props também
  const outrosPercentual = totalEmpresas > 0
    ? (((totalEmpresas - totalTop3) / totalEmpresas) * 100).toFixed(1)
    : 0

  return (
    <div className='card-info'>
      <h2>Empresas x Nichos</h2>
      <p>Total de Nichos: <span>{totalDeNichos}</span></p>

      <ul>
        <li>Top Nichos:</li>
        {top3Nichos.map((nicho, idx) => (
          <li key={idx}>
            N{idx +1}-{nicho.tipo}: <span>{nicho.total}</span>
          </li>
        ))}
      </ul>

      <div className='grafico-info-gerais'>
        <Bar data={data} options={options} />
      </div>

      <small>
        O restante das empresas representam {outrosPercentual}% dos nichos
      </small>
    </div>
  )
}

export default CardInfoGeralNichos
