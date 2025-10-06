import { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { Check, X } from "lucide-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

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

  const totalPages = totalUsers
    ? Math.ceil(totalUsers / limit)
    : Math.max(page, page + (users.length === limit ? 1 : 0));

  if (loading) return <p className="text-green-400 font-semibold text-2xl">Loading users...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  console.log(651651, users)

  return (
    <>
      <div className=" container mx-auto max-w-[1320px] py-6 px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className=" bg-purple-600 text-white text-center py-4 rounded-md mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">User List</h1>
        </div>

        {/* Total Users */}
        <p className="text-lg font-semibold text-purple-600 mb-4">
          Total User List: <span className="text-lg text-green-600 font-semibold">{totalUsers ? totalUsers : "52"}</span>
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#212529] text-center text-sm font-semibold text-white text-nowrap">
              <tr>
                <th className="px-6 py-3 ">S No</th>
                <th className="px-6 py-3 ">Name</th>
                <th className="px-6 py-3 ">UserId</th>
                <th className="px-6 py-3 ">Email</th>
                <th className="px-6 py-3 ">Phone Number</th>
                <th className="px-6 py-3 ">TransferAble</th>
                <th className="px-6 py-3 ">Verified</th>
                <th className="px-6 py-3 ">Blocked</th>
                <th className="px-6 py-3 ">Date</th>
                <th className="px-6 py-3 ">view</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId} className="{index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-base text-black text-center font-semibold text-nowrap">
                  {/* S No */}
                  <td className="px-6 py-4  border border-gray-300 "> {(page - 1) * limit + index + 1}</td>
                  <td className="px-6 py-4 border border-gray-300">{user.name} </td>
                  <td className="px-6 py-4  border border-gray-300">{user.userId}</td>
                  <td className="px-6 py-4 border border-gray-300">{user.email}</td>
                  <td className="px-6 py-4 border border-gray-300"> {user.phonenumber}</td>
                  <td className="px-6 py-2 border border-gray-300"> <div className="flex items-center justify-center">
                    {user.isTransferAble ? (<Check className="text-green-500 " />)
                      : (
                        <X className="text-red-500" />)}
                  </div>
                  </td>
                  <td className="px-6 py-2 border border-gray-300">
                    <div className="flex items-center justify-center">{user.isVerified ? (
                      <Check className="text-green-500" />
                    ) : (<X className="text-red-500" />)}
                    </div>
                  </td>
                  <td className="px-6 py-2 border border-gray-300">
                    <div className="flex items-center justify-center">{user.isBlocked ? (<Check className="text-green-500" />
                    ) : (<X className="text-red-500" />)}
                    </div>
                  </td>
                  <td className="px-6 py-4  border border-gray-300">{new Date(user.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })}</td>
                  <td className="px-6 py-4  border border-gray-300"> <a href="#">{user._id}</a></td> 
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6 select-none">
          {/* Previous */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="h-7 w-6 flex items-center justify-center rounded-md border-2 border-gray-300 text-gray-700 hover:border-purple-500 disabled:opacity-50 cursor-pointer"
            aria-label="Previous page"
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers with ellipsis */}
          {(() => {
            const pages = [];
            const visiblePages = 3; // how many middle pages to show
            const start = Math.max(2, page - visiblePages);
            const end = Math.min(totalPages - 1, page + visiblePages);

            // Always show first page
            pages.push(
              <button
                key={1}
                onClick={() => setPage(1)}
                className={`h-7 min-w-7 px-3 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer ${page === 1
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                  }`}
              >
                1
              </button>
            );

            // Ellipsis before current range
            if (start > 2) {
              pages.push(
                <span key="start-ellipsis" className="px-2 text-gray-500">
                  …
                </span>
              );
            }
            for (let i = start; i <= end; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-7 min-w-7 px-3 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer ${page === i
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                    }`}>{i}
                </button>
              );
            }
            if (end < totalPages - 1) {
              pages.push(
                <span key="end-ellipsis" className="px-2 text-gray-500">
                  …
                </span>
              );
            }
            if (totalPages > 1) {
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => setPage(totalPages)}
                  className={`h-7 min-w-7 px-3 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer ${page === totalPages
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                    }`}
                >
                  {totalPages}
                </button>
              );
            }
            return pages;
          })()}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="h-7 w-6 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:border-purple-500 disabled:opacity-50 cursor-pointer"
            aria-label="Next page">
            <IconChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </>
  );
}

export default UserList;
