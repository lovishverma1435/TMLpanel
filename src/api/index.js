import api from "./api";
import { tokenStore } from "./tokenStore";

export async function requestOtp({ email, password }) {
  const { data } = await api.post("/admin/signIn", { email, password });

  if (data?.success === false) {
    throw new Error(data?.message || "Failed to send OTP");
  }

  return data;
}

export async function verifyOtp({ email, otp, password }) {
  const res = await api.post("/admin/verifySignIn", { email, otp, password });
  const { data } = res
  console.log(res);
  console.log(data);

  if (data?.success === false) {
    throw new Error(data?.message || "Invalid OTP");
  }

  const token =
    data?.token ||
    data?.accessToken ||
    data?.data?.token ||
    data?.data?.accessToken;

  if (!token) {
    throw new Error("Login succeeded but token missing in response");
  }

  tokenStore.set(token);
  return data;
}

export function logout() {
  tokenStore.clear();
  // Optional: notify backend
  // return api.post("/admin/logout").finally(() => tokenStore.clear());
}


export async function fetchDashboard(params) {
  const { data } = await api.post("admin/dashboard", params);
  
  return data;
}
export async function fetchUsers(params) {
  const { data } = await api.post("/admin/users", params);

  return data;
}

export async function fetchUsersbalance(params) {
  const { data } = await api.post("/admin/user_balances", params);

  return data;
}

export async function fetchDepositTrans(params) {
  const { data } = await api.post("/admin/deposit_transactions", params);

  return data;
}

export async function fetchMarginTransactions(params) {
  const { data } = await api.post("/admin/margin_transactions", params);

  return data;
}

export async function fetchPayoutTransactions(params) {
  const { data } = await api.post("/admin/payout_transactions", params);

  return data;
}

export async function fetchPendingWithdraws(params) {
  const { data } = await api.post("/admin/pending_withdraws", params);

  return data;
}

export async function fetchUserDetails(params) {
  const { data } = await api.post("/admin/userDetails", params);

  return data;
}



