import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// registrar Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

const CardInfoGeral = ({ 
  titulo = "Métrica", 
  labels = [], 
  valores = [], 
  total = 1 
}) => {
  const tt = total > 0 ? total : 1

  // soma os valores recebidos
  const soma = valores.reduce((acc, v) => acc + v, 0)
  const outros = Math.max(tt - soma, 0)

  // adiciona "Outros" caso haja diferença
  const data = {
    labels: [...labels, "Outros Status"],
    datasets: [
      {
        label: "Distribuição",
        data: [...valores, outros],
        backgroundColor: [
          '#04bb20', // cor principal
          '#e6e6ef',
          '#b0b3c1'
        ],
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e6e6ef'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const totalValue = context.dataset.data.reduce((a, b) => a + b, 0)
            const value = context.raw
            const percentage = ((value / totalValue) * 100).toFixed(1)
            return `${context.label}: ${value} (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className='card-info'>
      <h2>{titulo}</h2>
      <p>Indicadores Principais</p>
      {labels.map((label, idx) => (
        <p key={idx}>
          {label}: <span>{valores[idx]}</span>
        </p>
      ))}

      <div className='grafico-info-gerais'>
        <Doughnut data={data} options={options} />
      </div>

      <small>
        {(((tt - soma) / tt) * 100).toFixed(1)}% dos contatos restantes estão em outro status
      </small>
    </div>
  )
}

export default CardInfoGeral
