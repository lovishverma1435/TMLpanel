// src/components/Login.jsx
import { useState } from "react";
import api from "./api"; // axios instance

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      // Change endpoint & body as per your backend
      const res = await api.post("/admin/login", { email, password });
      // Example: backend returns { success: true, token: "..." }
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        // redirect or show success
        // e.g., navigate("/users") if using react-router
        alert("Login successful — token saved");
      } else {
        setErr(res.data?.message || "Login failed");
      }
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
