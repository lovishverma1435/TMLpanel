import Header from '../components/common/Header';
import { IconCategoryFilled } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function AppLayout() {
  const [isAdminPanel, setIsAdminPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Header value={isAdminPanel} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}
      <div className="flex flex-col w-full">
        <div
          onClick={() => {
            if (window.innerWidth < 768) {
              setSidebarOpen((p) => !p);
            } else {
              setIsAdminPanel((p) => !p);
            }
          }}
          className="flex items-center pl-5 cursor-pointer gap-4 py-4 shadow-[0_4px_6px_rgba(0,0,0,0.2)]"
        >
          <IconCategoryFilled stroke={2} className="w-7 h-7" />
          <h1 className="text-xl font-semibold font-Inter">Admin Dashboard</h1>
        </div>
        <div className="flex justify-center items-center flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
