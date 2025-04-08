import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

// Layout components
import Layout from './components/layout/Layout';

// Feature pages (to be implemented)
import Dashboard from './features/dashboard/Dashboard';
import Accounts from './features/accounts/Accounts';
import Transactions from './features/transactions/Transactions';
import Budgets from './features/budgets/Budgets';
import Goals from './features/goals/Goals';
import Reports from './features/reports/Reports';
import Login from './features/auth/Login';
import Register from './features/auth/Register';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="goals" element={<Goals />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
