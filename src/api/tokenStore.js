const ACCESS_KEY = "TML_token";

export const tokenStore = {
  get() {
    return localStorage.getItem(ACCESS_KEY);
  },
  set(token) {
    if (token) localStorage.setItem(ACCESS_KEY, token);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
  },
};
