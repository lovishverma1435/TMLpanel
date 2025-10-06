import { useEffect, useState } from "react";
import { fetchDashboard } from "../api";

function Dashboard() {
  const [IsDashboard, SetIsDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchDashboardFunc = async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await fetchDashboard({});
        console.log("Fetched Data:", data);
        if (data?.success) {
          SetIsDashboard(data.data || {});
        } else {
          setErr(data?.message || "Failed to fetch dashboard data");
        }
      } catch (error) {
        setErr(error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardFunc();
  }, []);

  if (loading) return <p className="text-green-400 font-semibold text-2xl">Loading dashboard...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  console.log(651651, IsDashboard)
  return (
    <div className="container flex flex-col  p-6">
      <div className="bg-[#7648e0] text-white text-center py-4 rounded-lg mb-8">
        <h1 className="text-2xl md:text-4xl  font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        <div className="border border-purple-500 rounded-lg p-4 bg-white hover:bg-gray-100 cursor-pointer leading-2">
          <h2 className="font-bold text-lg">Users</h2>
          <p className="font-normal text-lg ">{IsDashboard.users || 0}</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer ">
          <h2 className="font-bold text-lg">Deposit Transactions</h2>
          <p className="font-normal text-lg ">{IsDashboard.depositTransactions || 0}</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer ">
          <h2 className="font-bold text-lg">Gas Fee Address</h2>
          <p className="font-normal text-lg ">{IsDashboard.gasFeeAddress?.slice(0, 12) || "N/A"}...</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer  ">
          <h2 className="font-bold text-lg">Deposit Address</h2>
          <p className="font-normal text-lg ">{IsDashboard.depositAddress?.slice(0, 12) || "N/A"}...</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer ">
          <h2 className="font-bold text-lg">BNB Balance</h2>
          <p className="font-normal text-lg ">{Number(IsDashboard.bnbBalance || 0).toFixed(6)}</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer ">
          <h2 className="font-bold text-lg">USDT Balance</h2>
          <p className="font-normal text-lg ">{Number(IsDashboard.usdtBalance || 0).toFixed(6)}</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer  ">
          <h2 className="font-bold text-lg">Total Deposited Amount</h2>
          <p className="font-normal text-lg ">{Number(IsDashboard.totalDepositedAmount || 0).toFixed(6)}</p>
        </div>
        <div className="border border-purple-500 rounded-lg p-4 bg-white  hover:bg-gray-100 cursor-pointer ">
          <h2 className="font-bold text-lg">Pending Withdraw Amount</h2>
          <p className="font-normal text-lg ">{Number(IsDashboard.pendingWithdrawAmount || 0).toFixed(6)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
