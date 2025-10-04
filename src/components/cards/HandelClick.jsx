import { Link } from "react-router-dom"

export const HandelClick = ({click}) => {
  return (
    <>
<div
  className={`overflow-hidden transition-all duration-200 
    ${click ? "max-h-72 opacity-100 py-1" : "max-h-0 opacity-0 py-0"}`}
>
  <div className="flex flex-col">
    <Link to={"/user/userlist"}>User List</Link>
    <Link to={"/user/userbalance"}>User Balance</Link>
  </div>
</div>

    </>
  )
}
export const IsHandelClick = ({Isclick}) => {
  return (
    <>
    <div
  className={`overflow-hidden transition-all duration-200 
    ${Isclick ? "max-h-72 opacity-100 py-1" : "max-h-0 opacity-0 py-0"}`}
>
  <div className="flex flex-col">
    <Link to={"/transection/deposittransection"}>Deposit Transection</Link>
    <Link to={"/transection/margintransection"}>Margin Transection</Link>
    <Link to={"/transection/payouttransection"}>Payout Transection</Link>
  </div>
</div>
    </>
  )
}


