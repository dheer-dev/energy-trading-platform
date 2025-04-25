// src/components/MarketTrends.js
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function MarketTrends() {
  const data = {
    labels: ['Solar', 'Wind', 'Hydro', 'Biomass'],
    datasets: [{
      label: 'Energy Type Distribution',
      data: [45, 30, 15, 10],
      backgroundColor: [
        'rgba(255, 159, 64, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ]
    }]
  };

  return <Bar data={data} />;
}