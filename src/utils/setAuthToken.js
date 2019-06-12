// importing modules
import axios from "axios";

// setting headers and exporting 
export default function setAuthToken(token){
  if(token) axios.defaults.headers.common["x-auth"] = token;
  else if(!token) axios.defaults.headers.common["x-auth"] = null;
}