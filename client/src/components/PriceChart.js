import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function PriceChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Energy Price (ETH/kWh)',
        data: [0.05, 0.06, 0.055, 0.07, 0.065],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Line data={data} />
      <div className="mt-4 text-gray-600">
        <p>Current Avg Price: <span className="font-bold">0.065 ETH/kWh</span></p>
        <p>Predicted Next Month: <span className="font-bold">0.068 ETH/kWh</span></p>
      </div>
    </div>
  );
}