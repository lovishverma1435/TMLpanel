// App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import UserBalance from './pages/UserBalance';
import UserList from './pages/UserList';
import DepositTransaction from './pages/DepositTransaction';
import MarginTransaction from './pages/MarginTransaction';
import PayoutTransaction from './pages/PayoutTransaction';
import WithdrawalHistory from './pages/WithdrawalHistory';
import Login from './Login';
import { ProtectedRoute } from './pages/Guards';
import AppLayout from './pages/AppLayout';
import AuthLayout from './pages/AuthLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/user/userbalance" element={<ProtectedRoute><UserBalance /></ProtectedRoute>} />
          <Route path="/user/userlist" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/Transaction/depositTransaction" element={<ProtectedRoute><DepositTransaction /></ProtectedRoute>} />
          <Route path="/Transaction/marginTransaction" element={<ProtectedRoute><MarginTransaction /></ProtectedRoute>} />
          <Route path="/Transaction/payoutTransaction" element={<ProtectedRoute><PayoutTransaction /></ProtectedRoute>} />
          <Route path="/withdrawal/withdrawhistory" element={<ProtectedRoute><WithdrawalHistory /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
