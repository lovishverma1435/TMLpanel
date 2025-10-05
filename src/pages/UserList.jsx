import { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { Check, X } from "lucide-react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10; // Number of users per page
  const [totalUsers, setTotalUsers] = useState(0); // Optional: to calculate max pages

  useEffect(() => {
    const fetchUsersFunc = async () => {
      setLoading(true);
      setErr(null);
      try {
        const skip = (page - 1) * limit;
        const data = await fetchUsers({ limit, skip });
        console.log("Fetched Data: ", data);

        if (data?.success) {
          setUsers(data.users || []);
          if (data.totalUsers) setTotalUsers(data.totalUsers); // Optional
        } else {
          setErr(data?.message || "Failed to fetch users");
        }
      } catch (error) {
        setErr(error.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersFunc();
  }, [page]);

  const totalPages = Math.ceil(totalUsers / limit); // Optional, if total is returned by API

  if (loading) return <p>Loading users...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  console.log(651651, users)

  return (
    <>
      <div className="container mx-auto max-w-[1320px] py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-purple-600 text-white text-center py-4 rounded-md mb-6">
          <h1 className="text-3xl font-bold">User List</h1>
        </div>

        {/* Total Users */}
        <p className="text-lg text-blue-600 mb-4">
          Total User List: <span className="text-green-600 font-semibold">52</span>
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#212529] text-center">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">S No</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">UserId</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Phone Number</th>
                <th className="px-6 py-3 text-left text-base font-semibold text-white w-full">isTransferAble</th>
                <th className="px-6 py-3 text-left text-base font-semibold text-white w-full">isVerified</th>
                <th className="px-6 py-3 text-base font-semibold text-white w-full">isBlocked</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-base text-black text-center font-semibold border text-nowrap border-gray-300">{user.userId}</td>
                  <td className="px-6 py-4 text-base text-black text-center font-semibold border text-nowrap border-gray-300">{(page - 1) * limit + index + 1}</td>
                  <td className="px-6 py-4 text-base text-black text-center font-semibold border text-nowrap border-gray-300">{user.name}</td>
                  <td className="px-6 py-4 text-base text-black text-center font-semibold border text-nowrap border-gray-300">{user.email}</td>
                  <td className="px-6 py-4 text-base text-black text-center font-semibold border text-nowrap border-gray-300">{user.phonenumber}</td>
                  <td className="px-6  py-2 text-base text-black text-center font-semibold border text-nowrap border-gray-300"><div className="flex items-center justify-center">{user.isTransferAble ? <Check className="" /> : <X />}</div></td>
                  <td className="px-6  py-2 text-base text-black text-center font-semibold border text-nowrap border-gray-300"><div >{user.isVerified ? <Check /> : <X />}</div></td>
                  <td className="px-6  py-2 text-base text-black text-center font-semibold border text-nowrap border-gray-300">{user.isBlocked ? <Check /> : <X />}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={users.length < limit}
            className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </>
  );
}

export default UserList;
