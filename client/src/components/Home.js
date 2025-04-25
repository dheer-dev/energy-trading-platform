import { Link } from 'react-router-dom';
import PriceChart from './PriceChart';
import MarketTrends from './MarketTrends';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Peer-to-Peer Energy Trading Platform</h1>
          <p className="text-xl mb-8">Trade renewable energy directly with other users on the blockchain</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/buyer-login" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              I'm a Buyer
            </Link>
            <Link 
              to="/seller-login" 
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              I'm a Seller
            </Link>
          </div>
        </div>
      </div>

      {/* Market Data Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Market Overview</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Current Energy Prices</h3>
            <PriceChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Market Trends</h3>
            <MarketTrends />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "For Buyers",
                steps: [
                  "1. Register as a buyer",
                  "2. Browse energy listings",
                  "3. Place bids on available energy",
                  "4. Complete transactions on blockchain"
                ]
              },
              {
                title: "For Sellers",
                steps: [
                  "1. Register as a seller",
                  "2. List your excess energy",
                  "3. Review buyer bids",
                  "4. Accept best offers"
                ]
              },
              {
                title: "Benefits",
                steps: [
                  "✓ Transparent pricing",
                  "✓ Secure blockchain transactions",
                  "✓ Real-time market data",
                  "✓ Lower energy costs"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}