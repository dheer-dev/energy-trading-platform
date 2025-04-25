import { useState } from 'react';

export default function BuyerDashboard() {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Listed ${amount}kWh at ${price}ETH/kWh`);
    // Implement Firebase listing here
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List Your Energy</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount (kWh)"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (ETH/kWh)"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          List Energy
        </button>
      </form>
    </div>
  );
}