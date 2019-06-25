// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import { getUserID } from "./utils/auth";
import { Redirect } from "react-router-dom";
import Header from "./Header";

// Declaring Components
class SearchCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  // handles search input value change
  handleQueryChange = (event) => {
    let query = event.target.value;
    this.setState({ query });
  }

  // handles search button on click
  handleSearchClick = () => {
    let query = this.state.query;
    this.setState({ query: "" });
  }

  render() {
    // extracting info
    let { query } = this.state;
    let { handleSearchClick, handleQueryChange } = this;

    // authenticating user
    if (!getUserID().token) return (
      <Redirect to="/login/auth" />
    );

    // returning JSx if logged in
    return (
      <div>

        <Header title="Stocks" />

        <div className="container padding-40px margin-top-50px margin-bottom-20px text-center">
          <input value={query} onChange={handleQueryChange} className="input is-focused is-link margin-bottom-20px" type="text" placeholder="Ticker or Company Name" />
          <a onClick={handleSearchClick} className="button is-link">Search</a>
        </div>

      </div>
    );
  }
}

// Exporting Components
export default SearchCompanies;
