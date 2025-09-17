import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoCidadesProspectadas = ({valor1, valor2}) => {
     const data = {      
    labels: ['Não Prospectados', 'Prospectados'],    
    datasets: [
      {
        label: 'Total Empresas x Prospectados',
        data: [valor1 - valor2, valor2],
        backgroundColor: [
          'rgba(66, 67, 74, 0.9)', // --line-clr com opacidade
          'rgba(4, 187, 32, 0.9)', // --accent-clr com opacidade

        ],
        borderColor: [
        'rgba(66, 67, 74, 0.2)', // --line-clr com opacidade
        'rgba(4, 187, 32, 0.2)', // --accent-clr com opacidade

        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
  plugins: {
    legend: {
      labels: {
        color: '#fff',
      },
    },
  },
};

  return (
    <>
     <Pie data={data} options={options} />
    </>    
  )
}

export default GraficoCidadesProspectadas