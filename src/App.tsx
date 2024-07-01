
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext/CartProvider';
import NavBar from './components/NavBar/NavBar';
import AppRoutes from './components/AppRoutes/AppRoutes';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </CartProvider>
  );
};

export default App;
