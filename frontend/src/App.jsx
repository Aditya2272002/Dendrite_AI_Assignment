import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PaymentApp from './components/payment';
import Home from './components/Home';
import useAuth from './hooks/useAuth';

const ProtectedRoute = ({ isLogin, children }) => {
  return isLogin ? children : <Navigate to="/home" />;
};

const App = () => {
  const isLogin = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <PaymentApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
