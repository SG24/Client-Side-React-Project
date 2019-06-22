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
  localStorage.setItem("stockMarket-bookmarks_cc", user.bookmarks_cc);
  localStorage.setItem("stockMarket-token", user.token);
  localStorage.setItem("stockMarket-user", user.username);
  localStorage.setItem("stockMarket-email", user.email);
  return 0;
}

// getting token from localstorage
// returns object with status and user obj (if success)
export function getUserID() {
  let email = localStorage.getItem("stockMarket-email");
  let token = localStorage.getItem("stockMarket-token");
  let username = localStorage.getItem("stockMarket-user");
  let bookmarks_cc = localStorage.getItem("stockMarket-bookmarks_cc");
  if (!token) return { success: false, err: "No user logged in." };
  else if (token) return { success: true, token, username, bookmarks_cc, email };
}

// clearing localStorage
export function clearUserID() {
  localStorage.clear();
}

// updates user bookmarks
export function updateUserBookmarks() {
  axios.get("/users/bookmarks")
    .then(data => {
      if(data.data.success){
        localStorage.setItem("stockMarket-bookmarks_cc", JSON.stringify(data.data.bookmarks_cc));
      }
    })
    .catch(e => {
      console.log("Unable to update user bookmarks, ", e);
    });
}