// importing modules
import axios from "axios";

// setting headers and exporting 
export default function setAuthToken() {
  let { token } = getUserID();
  if (token) {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common["x-auth"] = token;
  }
  else if (!token) axios.defaults.headers.common["x-auth"] = null;
}

// saving token to localstorage
// return 0 if success
export function saveUserID(user) {
  // console.log(user.token);
  localStorage.setItem("stockMarket-token", user.token);
  localStorage.setItem("stockMarket-user", user.username);
  return 0;
}

// getting token from localstorage
// returns object with status and user obj (if success)
export function getUserID() {
  let token = localStorage.getItem("stockMarket-token");
  let username = localStorage.getItem("stockMarket-user");
  if (!token) return { success: false, err: "No user logged in." };
  else if (token) return { success: true, token, username };
}

// clearing localStorage
export function clearUserID() {
  localStorage.clear();
}