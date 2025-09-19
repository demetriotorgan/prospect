import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

// registrar componentes do Chart.js para Bar
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const CardInfoGeralCidades = ({
  cidades = [],   // array de objetos { cidade, quantidade, percentual }
  total = 1
}) => {
  const tt = total > 0 ? total : 1;

  // preparar dados para o gráfico
  const labels = cidades.map(c => c.cidade);
  const valores = cidades.map(c => c.quantidade);

  const soma = valores.reduce((acc, v) => acc + v, 0);
  const outros = Math.max(tt - soma, 0);

  // preparar labels curtos
const labelsCurtos = cidades.map((c, idx) => `C${idx + 1}`);
labelsCurtos.push("Outros"); // adiciona label para as demais cidades

  const data = {
    labels: labelsCurtos,
    datasets: [
      {
        label: "Quantidade de Empresas",
        data: [...valores, outros],
        backgroundColor: [
          '#04bb20',
          '#e6e6ef',
          '#b0b3c1',
          '#f0a500',
          '#9b59b6',
          '#3498db'
        ].slice(0, valores.length + 1),
        borderWidth: 1
      }
    ]
  };

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
          label: function(context) {
            const totalValue = context.dataset.data.reduce((a, b) => a + b, 0)
            const value = context.raw
            const percentage = ((value / totalValue) * 100).toFixed(1)
            return `${context.label}: ${value} (${percentage}%)`
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
        ticks: { color: '#e6e6ef', stepSize: 1 },
        grid: { color: '#42434a' },
        beginAtZero: true
      }
    }
  };

  return (
    <div className='card-info'>
        <h2>Empresas x Cidades</h2>
        <p>Total de cidades atendidas: <strong>{cidades.length}</strong></p>
        <p>Cidades com maior concentração de empresas:</p>        
        <ul>
          {cidades.map((c, idx) => (
            <li key={idx}>C{idx+1} - {c.cidade.toUpperCase()} — {c.quantidade} ({c.percentual}%)</li>
          ))}
        </ul>

        <div className='grafico-info-gerais'>
            <Bar data={data} options={options} />
        </div>

        <p>Percentual restante: {(((tt - soma) / tt) * 100).toFixed(1)}%</p>
        <small>Resumo: {(((tt - soma) / tt) * 100).toFixed(1)}% empresas estão distribuídas nas demais cidades</small>
    </div>
  )
}

export default CardInfoGeralCidades
