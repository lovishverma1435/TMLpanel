// src/routes/guards.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { tokenStore } from '../api/tokenStore';

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const authed = !!tokenStore.get();
  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
