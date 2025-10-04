
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/common/Header'
import { IconCategoryFilled } from '@tabler/icons-react'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import UserBalance from './pages/UserBalance'
import UserList from './pages/UserList'
import DepositTransection from './pages/DepositTransection'
import MarginTransection from './pages/MarginTransection'
import PayoutTransection from './pages/PayoutTransection'
import WidrawalHistory from './pages/WidrawalHistory'
import Login from './Login'

function App() {

  const [Adminpanel, setAdminpanel] = useState(false)
  return (
    <>
      <div className="flex">
        <BrowserRouter>
          <Header value={Adminpanel} />
          <div className="flex flex-col w-full ">
            <div onClick={() => setAdminpanel(!Adminpanel)} className="flex pl-5 cursor-pointer gap-4 py-3 shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
              <IconCategoryFilled stroke={2} />
              <h1 className='text-base font-semibold font-Inter'>Admin Dashboard</h1>
            </div>
            <div className="flex justify-center items-center mx-10 flex-col">
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/user/userbalance' element={<UserBalance />} />
                <Route path='/user/userlist' element={<UserList />} />
                <Route path='/transection/deposittransection' element={<DepositTransection />} />
                <Route path='/transection/margintransection' element={<MarginTransection />} />
                <Route path='/transection/payouttransection' element={<PayoutTransection />} />
                <Route path='/withdrawal/withdrawhistory' element={< WidrawalHistory/>} />
                <Route path='/login' element={< Login/>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
