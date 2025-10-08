import { IconDeviceMobileUp, IconFileDollar, IconScale, IconSwitchHorizontal, IconUser } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export const HandelClick = ({ click, value }) => {
 


  return (
    <>
      <div
        className={`overflow-hidden transition-all duration-200 font-Inter
    ${click ? "max-h-72 opacity-100 py-3" : "max-h-0 opacity-0 py-0"}`}
      >
        <div className="flex flex-col pl-10 gap-3">
          <Link  className="flex  items-center gap-2" to={"/user/userlist"}>

            <span><IconUser className="w-6 h-6" /></span>
            <p className={`${value ? "hidden opacity-0" : "block opacity-100"}`}> User List</p>
          </Link>
          <Link  className="flex items-center  gap-2" to={"/user/userbalance"}>

            <span>
              <IconScale className="w-6 h-6" />
            </span>
            <p  className={`${value ? "hidden opacity-0" : "block opacity-100"}`}>User Balance</p>
            </Link>
        </div>
      </div>

    </>
  )
}
export const IsHandelClick = ({ Isclick,value }) => {
  

  return (
    <>
      <div
        className={`overflow-hidden transition-all duration-200 font-Inter
    ${Isclick ? "max-h-72 opacity-100 py-3" : "max-h-0 opacity-0 py-0"}`}
      >
        <div className="flex flex-col gap-4">
          <Link  className="flex items-center justify-center gap-2" to={"/Transaction/depositTransaction"}>
            <span><IconDeviceMobileUp className='w-6 h-6' /></span>
            <p  className={`${value ? "hidden opacity-0" : "block opacity-100"}`}> Deposit Transaction</p>
          </Link>
          <Link  className="flex items-center justify-center gap-2" to={"/Transaction/marginTransaction"}>
            <span><IconSwitchHorizontal className='w-6 h-6' /></span>
            <p  className={`${value ? "hidden opacity-0" : "block opacity-100"}`}>Margin Transaction</p>
          </Link>
          <Link  className="flex items-center justify-center gap-2" to={"/Transaction/payoutTransaction"}>
            <span><IconFileDollar className='w-6 h-6'/></span>
            <p  className={`${value ? "hidden opacity-0" : "block opacity-100"}`}>Payout Transaction</p>
          </Link>
        </div>
      </div>
    </>
  )
}


