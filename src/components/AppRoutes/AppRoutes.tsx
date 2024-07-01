
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from '../pages/Product/ProductList';
import Cart from '../pages/Cart/Cart';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
