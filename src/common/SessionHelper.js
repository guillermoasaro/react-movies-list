import Cookies from "js-cookie";

// Set of functions to manage user session using browser cookies
export const getCookieSession = () =>
  Cookies.get("user-session") ? JSON.parse(Cookies.get("user-session")) : {};
export const setCookieSession = (session) =>
  Cookies.set("user-session", session);
export const isAuthenticated = () => !!getCookieSession().user_id;
