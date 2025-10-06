import { useEffect, useState } from "react";
import { fetchUsersbalance } from "../api";

function UserList() {
  const [usersbalance, setUsersbalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchUsersFunc = async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await fetchUsersbalance({});
        console.log(data);
        if (data?.success) {
          setUsersbalance(data.wallet_transactions || []);
        } else {
          setErr(data?.message || "Failed to fetch users");
        }
      } catch (error) {
        setErr(error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersFunc();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  const totalPayable = usersbalance.reduce((sum, user) => sum + (Number(user.totalPayable) || 0), 0);
  const totalCommission = usersbalance.reduce((sum, user) => sum + (Number(user.totalCommision) || 0), 0);

  return (
    <div className="container mx-auto max-w-[1320px] py-6 px-4 sm:px-6 lg:px-8 ">
      {/* Header */}
      <div className="bg-purple-600 text-white text-center py-4 rounded-md mb-6">
        <h1 className="text-2xl md:text-4xl  font-bold">User List Balance</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-[#212529] text-center">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-white">S No</th>
              <th className="px-6 py-3 text-sm font-semibold text-white">Name</th>
              <th className="px-6 py-3 text-sm font-semibold text-white">UserId</th>
              <th className="px-6 py-3 text-sm font-semibold text-white">Total Payable</th>
              <th className="px-6 py-3 text-sm font-semibold text-white">Total Commission</th>
            </tr>
          </thead>
          <tbody>
            {usersbalance.map((user, index) => (
              <tr key={user.userId || index} className="{index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-base text-black text-center font-semibold">
                <td className="px-6 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-6 py-2 border border-gray-300">{user.name}  </td>
                <td className="px-6 py-2 border border-gray-300">{user.userId}</td>
                <td className="px-6 py-2 border border-gray-300">{user.totalPayable} </td>
                <td className="px-6 py-2 border border-gray-300">{user.totalCommision}</td>
              </tr>
            ))}
          </tbody>

          {/* ✅ Totals Row */}
          <tfoot>
            <tr className="bg-purple-600 text-white font-bold text-center">
              <td colSpan="3" className="px-6 py-4 border border-gray-300">Total</td>
              <td className="px-6 py-4 border border-gray-300">{totalPayable.toFixed(2)}</td>
              <td className="px-6 py-4 border border-gray-300">{totalCommission.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default UserList;
