import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <Outlet />
    </div>
  );
}
