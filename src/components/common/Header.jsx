import { faL, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconBookDownload, IconChevronDown, IconLogout, IconSwitchHorizontal, IconUserFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { FaUsers } from "react-icons/fa6";
import { HandelClick, IsHandelClick } from '../cards/HandelClick';
import { Link } from 'react-router-dom';
const Header = ({ value, sidebarOpen, setSidebarOpen }) => {
    const [click, setclick] = useState(false)
    const [isclick, setisclick] = useState(false)

    function handlechange() {
        setclick(!click)
        setisclick(false)
    }
    function ishandlechange() {
        setclick(false)
        setisclick(!isclick)
    }
    return (
        <>
            <div className={`${!value ? "w-full max-w-[250px]  " : "w-full max-w-[100px]"} bg-[#0b0b29] text-white min-h-screen flex flex-col font-Inter  transition-all duration-300 fixed top-0 left-0 z-50 transform
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`} >
                <div className='w-full bg-purple-600 h-[59px] cursor-pointer flex px-5 py-[15px] gap-2 '>
                    <IconUserFilled className='w-6 h-6' color="white" />
                    <p className={`${value ? " opacity-0 w-0" : " w-full opacity-100"} transition-all duration-200 text-white font-bold text-[19.2px] overflow-hidden  h-[29px]`}>Admin Panel</p>
                    {/* Close button for mobile */}
                    
                     <button onClick={() => setSidebarOpen(false)}className="md:hidden text-white text-xl font-bold" >
                     ✕
                    </button>
                </div>
                <div className="w-full flex flex-col gap-7 pt-4">
                    <Link onClick={() => setSidebarOpen(false)} to={"/"}  className="cursor-pointer ">
                        <div className="flex items-center  pr-[30px] pl-5 gap-2">
                            <FontAwesomeIcon icon={faTachometerAlt} size="xl" />
                            <p className={` ${value ? "hidden opacity-0" : "block opacity-100"} text-lg transition-all duration-200`}>Dashboard</p>
                        </div>
                    </Link>
                    <Link onClick={() => {handlechange()
                    }} className=" cursor-pointer flex flex-col ">
                        <div className="w-full  flex justify-between  items-center pr-[10px] pl-5">
                            <span className='w-full flex gap-3 items-center'>

                                <FaUsers className='text-white w-7 h-7' />
                                <p className={` ${value ? "hidden opacity-0" : "block opacity-100"}  text-lg transition-all duration-200`}>User</p>
                            </span>
                            <IconChevronDown className={`${click ? "rotate-180" : " rotate-0"} transition-all duration-200 `} />
                        </div>
                        <HandelClick onvariable={(value)=>setSidebarOpen(value)} click={click} value={value} />
                    </Link>
                    <div onClick={() => ishandlechange()} className=" cursor-pointer flex flex-col ">
                        <div className="w-full flex justify-between pr-[10px] pl-5 ">
                            <span className='w-full flex gap-3 items-center'>

                                <IconSwitchHorizontal className='w-7 h-7' />
                                <p className={` ${value ? "hidden opacity-0" : "block opacity-100"}  text-lg transition-all duration-200`}>Transactions</p>
                            </span>
                            <IconChevronDown className={`${isclick ? "rotate-180" : " rotate-0"} transition-all duration-200 `} />

                        </div>
                        <IsHandelClick  Isclick={isclick} value={value} />

                    </div>
                    <Link onClick={() => setSidebarOpen(false)} to={"/withdrawal/withdrawhistory"} className=" flex cursor-pointer">
                        <div className="w-full flex items-center  pr-[30px] pl-5 gap-2">
                            <IconBookDownload  className='w-7 h-7' />
                            <p className={` ${value ? "hidden opacity-0" : "block opacity-100"}  text-lg transition-all duration-200 h-[28px] overflow-hidden`}>Withdraw History</p>
                        </div>
                    </Link>
                    <div className="w-full flex cursor-pointer ">
                        <div className="w-full flex  items-center pr-[30px] pl-5 gap-2">
                            <IconLogout className='w-7 h-7' color='red' />
                            <p className={` ${value ? "hidden opacity-0" : "block opacity-100"} transition-all duration-200 text-red-600 text-lg `}>Logout</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header
