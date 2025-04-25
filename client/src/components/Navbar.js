import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">EnergyTrade</Link>
        <div className="space-x-4">
          {currentUser ? (
            <>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/buyer-login" className="hover:underline">Buyer Login</Link>
              <Link to="/seller-login" className="hover:underline">Seller Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}