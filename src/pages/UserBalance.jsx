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
console.log(usersbalance,"11223332")
  return (
    <>

    
  
 </> );
}

export default UserList
