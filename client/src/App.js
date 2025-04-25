import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import BuyerLogin from './components/BuyerLogin';
import SellerLogin from './components/SellerLogin';
import BuyerRegister from './components/BuyerRegister';
import SellerRegister from './components/SellerRegister';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer-login" element={<BuyerLogin />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/buyer-register" element={<BuyerRegister />} />
          <Route path="/seller-register" element={<SellerRegister />} />  
          <Route
            path="/buyer"
            element={
              <ProtectedRoute type="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller"
            element={
              <ProtectedRoute type="seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function ProtectedRoute({ children, type }) {
  const { currentUser, userType } = useAuth();
  
  if (!currentUser) {
    return <Navigate to={`/${type}-login`} />;
  }
  
  if (userType !== type) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default App;