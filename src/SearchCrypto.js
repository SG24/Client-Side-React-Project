// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import setAuthToken, { getUserID } from "./utils/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Declaring Components
class SearchCrypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc: null,
      displayData: null,
    };
  }

  componentDidMount = () => {
    setAuthToken();
    axios.get("/api/v1/fm/cc")
      .then(data => {

        // extracting data
        let urls = null;
        if (data.data.success) urls = data.data.ccApiUrl;
        else if (!data.data.success) urls = data.data;

        // updating state
        this.setState({
          cc: urls,
        });
        
        // returning url
        return urls.ccApiUrl ? urls.ccApiUrl : false;
      })
      .catch(e => this.setState({
        cc: { success: false, err: "Unable to fetch data!" },
      }));
  };

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
