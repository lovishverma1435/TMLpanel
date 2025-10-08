import { useEffect, useState } from "react";
import { fetchUserDetails } from "../api";
import { useParams } from "react-router-dom";

function UserDetails() {
    const [user, setUser] = useState([]);
    const [wallet, setwallet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const id = useParams().id
    useEffect(() => {
        const fetchUserDetailsFunc = async () => {
            setLoading(true);
            setErr(null);
            try {
                const data = await fetchUserDetails({ id });
                console.log(data);
                if (data?.success) {
                    setUser(data.user || []);
                    setwallet(data.wallet_transactions || []);
                } else {
                    setErr(data?.message || "Failed to fetch users");
                }
            } catch (error) {
                setErr(error.message || error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetailsFunc();
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (err) return <p className="text-red-600">Error: {err}</p>;

    // console.log(user, "jncdjdncjsn")
    // console.log(wallet, "jncdj5554454dncjsn")
    const data = [
        {

            "username": "Name",
            "value": user.name
        },
        {
            "username": "Email",
            "value": user.email
        },
        {
            "username": "Phone Number",
            "value": user.phonenumber

        },

    ]

    const data2 = [
        { value: "#" },
        { value: "TokenName" },
        { value: "Amount" },
        { value: "Commission Amount" },
        { value: "Transaction Charge" },
        { value: "Payable Amount" },
        { value: "Balance" },
        { value: "Type" },
        { value: "Remark" },
        { value: "TransactionHash" },
        { value: "Api Key" },
        { value: "USDT Value" },
        { value: "Date" },
    ]

    return (
        <>
            <div className="container mx-auto max-w-[1320px] py-6 px-4 sm:px-6 lg:px-8 ">
                {/* Header */}
                <div className=" text-purple-600 text-center py-4 rounded-md mb-6">
                    <h1 className="text-2xl md:text-4xl  font-bold">View detials</h1>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <div className="min-w-full bg-white flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
                            {
                                data.map((item, i) => (
                                    <div key={item} className="border border-purple-500 flex flex-col rounded-lg p-4 gap-2 bg-white hover:bg-gray-100 cursor-pointer">
                                        <h2 className="font-semibold text-xl">{item.username}</h2>
                                        <th className=" font-normal text-lg text-start">{item.value}</th>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="container w-full border rounded">
                            <div className="flex flex-col ">
                                <h1 className="flex text-start text-3xl ">Total Withdrawal</h1>
                                <span className="block h-[1px] w-full bg-black my-4"></span>
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-max w-full border-collapse">
                                        <thead>
                                            <tr>
                                                {data2.map((item, i) => (
                                                    <th key={i} className="text-nowrap text-lg font-medium px-8 py-2 border-b border-gray-300 text-left ">
                                                        {item.value}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetails;
