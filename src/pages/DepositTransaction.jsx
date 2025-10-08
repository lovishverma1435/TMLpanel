import { useEffect, useState } from "react";
import { fetchDepositTrans } from "../api";
import { Check, X } from "lucide-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

function UserList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [record_count, setRecord_count] = useState(0);

  useEffect(() => {
    const fetchDepositTransFunc = async () => {
      setLoading(true);
      setErr(null);
      try {
        const skip = (page - 1) * limit;
        const data = await fetchDepositTrans({ limit, skip });
        console.log(data)
        if (data?.status) {
          setTransactions(data.transactions || []);
          if (data.record_count !== undefined) setRecord_count(data.record_count);
        } else {
          setErr(data?.message || "Failed to fetch transactions");
        }
      } catch (error) {
        setErr(error.message || "Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchDepositTransFunc();
  }, [page]);

  const totalPages = record_count
    ? Math.ceil(record_count / limit)
    : Math.max(page, page + (transactions.length === limit ? 1 : 0));


  if (loading) return <p className="text-green-400 font-semibold text-2xl text-center mt-10">Loading transactions...</p>;
  if (err) return <p className="text-red-600 font-semibold text-2xl text-center mt-10">Error: {err}</p>;

   const data = [
    { value: "S No" },
    { value: "Name" },
    { value: "UserId" },
    { value: "adminHash" },
    { value: "Amount" },
    { value: "apiKey" },
    { value: "debitHash" },
    { value: "From" },
    { value: "To" },
    { value: "Deposit Status" },
    { value: "Debit Status" },
    { value: "Token Name" },
    { value: "Transaction Hash" },
    { value: "Date" },
  ]

  return (
    <div className="container  py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-purple-600 text-white text-center py-4  mb-6">
        <h1 className="text-2xl md:text-4xl  font-bold">Deposit Transaction</h1>
      </div>

      {/* Total Deposit */}
      <p className="text-lg font-semibold text-purple-600 mb-4">
        Total Deposit Transaction: <span className="text-lg text-green-600 font-semibold">{record_count}</span>
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-[#212529] text-sm font-semibold text-white text-center text-nowrap">
            <tr>
              {
                data.map((item, i) => (
                  <th key={item + i} className="px-6 py-3 ">{item.value}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {transactions.map((user, index) => (
              <tr key={user._id} className="{index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center font-medium border">
                <td className="px-6 py-4 border border-gray-300">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4 border border-gray-300 text-nowrap">{user.userId.name}</td>
                <td className="px-6 py-4 border border-gray-300">{user.userId.userId}</td>
                <td className="px-6 py-4 border border-gray-300 truncate max-w-[220px] w-full"><a href="#" className="text-blue-500 underline">{user.adminHash ? user.adminHash : "None"}</a></td>
                <td className="px-6 py-4 border border-gray-300">{user.amount}</td>
                <td className="px-6 py-4 border border-gray-300 truncate max-w-[220px] w-full"><a href="#" className="text-blue-500 underline">{user.apiKey}</a></td>
                <td className="px-6 py-4 border border-gray-300 truncate max-w-[220px] w-full"><a href="#" className="text-blue-500 underline">{user.debitHash}</a></td>
                <td className="px-6 py-4 border border-gray-300 truncate max-w-[220px] w-full"><a href="#" className="text-blue-500 underline">{user.from}</a></td>
                <td className="px-6 py-4 border border-gray-300 truncate max-w-[220px] w-full"><a href="#" className="text-blue-500 underline">{user.to}</a></td>
                <td className="px-6 py-4 border border-gray-300">
                  {user.baseCurrencyDepositStatus ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center font-semibold border">
                  {user.mainCurrencyDebitStatus ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center font-semibold border">{user.tokenId?.tokenName}</td>
                <td className="px-6 py-4 text-center font-semibold border truncate max-w-[220px] w-full"><a href="#" className="text-blue-500 underline">{user.transactionHash}</a></td>
                <td className="px-6 py-4  border  text-nowrap">{new Date(user.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

          // Middle page numbers
          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-7 min-w-7 px-3 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer ${page === i
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
                  }`}
              >
                {i}
              </button>
            );
          }

          // Ellipsis after current range
          if (end < totalPages - 1) {
            pages.push(
              <span key="end-ellipsis" className="px-2 text-gray-500">
                …
              </span>
            );
          }

          // Always show last page
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

        {/* Next */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="h-7 w-6 flex items-center justify-center rounded-md border-2 border-gray-300 text-gray-700 hover:border-purple-500 disabled:opacity-50 cursor-pointer"
          aria-label="Next page"
        >
          <IconChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export default UserList;
