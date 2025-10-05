import Header from '../components/common/Header';
import { IconCategoryFilled } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function AppLayout() {
  const [isAdminPanel, setIsAdminPanel] = useState(false);

  return (
    <div className="flex">
      <Header value={isAdminPanel} />
      <div className="flex flex-col w-full">
        <div
          onClick={() => setIsAdminPanel(p => !p)}
          className="flex pl-5 cursor-pointer gap-4 py-3 shadow-[0_4px_6px_rgba(0,0,0,0.2)]"
        >
          <IconCategoryFilled stroke={2} />
          <h1 className="text-base font-semibold font-Inter">Admin Dashboard</h1>
        </div>
        <div className="flex justify-center items-center mx-10 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
