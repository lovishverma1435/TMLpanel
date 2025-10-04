// src/components/UserList.jsx
import { useEffect, useState } from "react";
import api from "../api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setErr(null);
      try {
        // According to your Postman test, POST with empty body works
        const res = await api.post("/admin/users", {}); 
        // Example response structure you shared:
        // { success: true, message: "...", users: [...], count: 52 }
        if (res.data?.success) {
          setUsers(res.data.users || []);
        } else {
          setErr(res.data?.message || "Failed to fetch users");
        }
      } catch (error) {
        setErr(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-3">Users ({users.length})</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.phonenumber}</td>
              <td className="border px-2 py-1">{u.isVerified ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList
