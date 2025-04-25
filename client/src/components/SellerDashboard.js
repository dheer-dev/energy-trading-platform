import { useState } from 'react';

export default function SellerDashboard() {
  const [bids, setBids] = useState([
    { id: 1, amount: 100, price: 0.06, buyer: 'Buyer1' },
    { id: 2, amount: 150, price: 0.065, buyer: 'Buyer2' }
  ]);

  const acceptBid = (id) => {
    alert(`Accepted bid ${id}`);
    // Implement bid acceptance
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Bids</h1>
      <div className="space-y-4">
        {bids.map(bid => (
          <div key={bid.id} className="p-4 border rounded-lg">
            <p>Amount: {bid.amount}kWh</p>
            <p>Price: {bid.price}ETH/kWh</p>
            <p>Buyer: {bid.buyer}</p>
            <button 
              onClick={() => acceptBid(bid.id)}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Accept Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}