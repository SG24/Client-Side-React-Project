// Importing Modules
import React from "react";
import {getUserID} from "./utils/auth";
import {Redirect} from "react-router-dom";

// Declaring Component
class Me extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){

    // authenticating user
    if(!getUserID().token) return (
      <Redirect to="/login/auth" />
    );

    // returning JSx if logged in
    return (
      <h1>Me</h1>
    );
  }
}

// Exporting Component
export default Me;
