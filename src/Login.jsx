import { useState } from "react";
import { requestOtp, verifyOtp } from "./api";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { tokenStore } from "./api/tokenStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const nav = useNavigate();
  const loc = useLocation();
  const from = (loc.state && loc.state.from && loc.state.from.pathname) || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);



    try {
      if (isOtpSent) {
        const res = await verifyOtp({
          email,
          password,
          otp
        });
        /**
          {
            "success": true,
            "message": "User sign in successfully!",
            "user": {
              "_id": "67c2fcfbddd6e40711609c09",
              "username": "KRYPTOHAS",
              "email": "kushmalout@gmail.com",
              "password": "$2a$08$YkiccqSmMxZNkYYgzXEsgOwVQQj6FZm6IdgqWLyjItk3kUDWfx0j2",
              "createdAt": "2025-01-28T06:25:32.960Z",
              "updatedAt": "2025-10-05T04:11:35.436Z",
              "__v": 0,
              "otp": "306228",
              "deviceToken": "cGU009QRRB-NyyNBgqSdah:APA91bFxepoNCGGiaWMlIIf51WsvSnq25XJy8vMRDVbxFeInd86_zHCI1MoOQh-BdhZt0pvaLOTP9EwLuXpdgZtXCZyccdUZyWIe9vkKb2amuEvPfwv8f5A"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJmY2ZiZGRkNmU0MDcxMTYwOWMwOSIsImlhdCI6MTc1OTYzNzU3MiwiZXhwIjoxNzU5ODk2NzcyfQ.U9v4BJ6LPuG4neuB8HVTkntfh1QUN-rEqxKpcPthzhk"
          }
      */
        console.log(res);
        nav(from, { replace: true });
      } else {
        const res = await requestOtp({
          email,
          password
        });
        setIsOtpSent(true);
        // {"success":true,"message":"OTP sent successfully!"}
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      setErr(error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  const authed = !!tokenStore.get();
  if (authed) {
    return <Navigate to="/" replace state={{ from: loc }} />
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        {
          isOtpSent?
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Otp"
              className="w-full border p-2 rounded"
              required
            />
            : null
        }
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {err && <p className="text-red-600 mt-2">{err}</p>}
      </form>
    </div>
  );
}
