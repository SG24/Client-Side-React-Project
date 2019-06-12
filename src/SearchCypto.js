// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import { getUserID } from "./utils/auth";
import { Redirect } from "react-router-dom";

// Declaring Components
class SearchCrypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    // authenticating user
    if (!getUserID().token) return (
      <Redirect to="/login/auth" />
    );

    // default return 
    return (
      <h1>SearchCrypto</h1>
    );
  }
}

// Exporting Components
export default SearchCrypto;
