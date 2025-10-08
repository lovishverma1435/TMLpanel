import { useEffect, useState } from "react";
import { fetchDashboard } from "../api";
import Dashboardjson from "../json/Dashboard.json"
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


  const values = [
    {
      "username": "Users",
      "uservalue": IsDashboard.users || 0
    },
    {
      "username": "Deposit Transactions",
      "uservalue": IsDashboard.depositTransactions || 0
    },
    {
      "username": "Gas Fee Address",
      "uservalue": IsDashboard.gasFeeAddress?.slice(0, 12) || "N/A"
    },
    {
      "username": "Deposit Address",
      "uservalue": IsDashboard.depositAddress?.slice(0, 12) || "N/A"
    },
    {
      "username": "BNB Balance",
      "uservalue": Number(IsDashboard.bnbBalance || 0).toFixed(6)
    },
    {
      "username": "USDT Balance",
      "uservalue": Number(IsDashboard.usdtBalance || 0).toFixed(6)
    },
    {
      "username": "Total Deposited Amount",
      "uservalue": Number(IsDashboard.totalDepositedAmount || 0).toFixed(6)
    },
    {
      "username": "Pending Withdraw Amount",
      "uservalue": Number(IsDashboard.pendingWithdrawAmount || 0).toFixed(6)
    }
  ]

  return (
    <div className="container flex flex-col  p-6">
      <div className="bg-purple-600 text-white text-center py-4 rounded-lg mb-8">
        <h1 className="text-2xl md:text-4xl  font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {
          values.map((item, i) => (
            <div key={item} className="border border-purple-500 flex flex-col rounded-lg p-4 gap-2 bg-white hover:bg-gray-100 cursor-pointer">
              <h2 className="font-bold text-lg">{item.username}</h2>
              <p className="font-normal text-lg ">{item.uservalue}</p>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default Dashboard;
