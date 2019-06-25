// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import setAuthToken, { getUserID, updateUserBookmarks } from "./utils/auth";
import { Redirect } from "react-router-dom";
import axios from "axios";

// importing components
import Header from "./Header";

// Declaring Components
class SearchCrypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc: null,
      displayData: null,
      searchInputValue: "",
      googleUrl: "",
      query: "",
      isBookmarked: false,
      needsUpdate: false,

      // boolean for is user is logged in
      isLoggedIn: true,
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

    // checks if the user is logged in
    if (!getUserID().token) {
      this.setState({ isLoggedIn: false });
    }
  };

  // handling input change
  handleInputChange = (event) => {
    let search = event.target.value;
    this.setState({
      searchInputValue: search,
    });
  }

  // handling search button click
  handleSearch = () => {
    let search = this.state.searchInputValue;

    if (search === "") return alert("Input cannot be empty!");

    this.setState({
      searchInputValue: "",
      googleUrl: "https://www.google.com/search?q=" + search,
      query: search,
    });
    // checks if the unit search is already bookmarked
    let bookmarksCC = JSON.parse(getUserID().bookmarks_cc);
    if (bookmarksCC.filter(bm => bm.ticker === search.toUpperCase()).length !== 0) {
      this.setState({ isBookmarked: true });
    }
    else {
      this.setState({ isBookmarked: false });
    }
    this.fetchData(search);
  }

  // fetching data
  fetchData = (query) => {
    let url = this.state.cc["Crypto-Currencies"].replace("{ticker}", query);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          displayData: data,
        });
      })
      .catch(err => {
        console.log("SearchCrypto: err: ", err);
        this.setState({
          displayData: "Unable to fetch data!",
        });
      })
  }

  // handles bookmark update
  handleBookmarkUpdate = () => {
    this.setState({
      isBookmarked: !this.state.isBookmarked,
      needsUpdate: true,
    });
  }

  // updates profile after change in bookmark status
  handleProfileUpdate = () => {
    // updating state
    this.setState({ needsUpdate: false });

    // creating bookmark object
    let bookmark = {
      bookmarkType: "Crypto-Currency",
      ticker: this.state.query.toUpperCase(),
      url: this.state.cc["Crypto-Currencies"].replace("{ticker}", this.state.query.toUpperCase()),
      bookmarkedPrice: this.state.displayData.price,
      bookmarkedDate: (new Date()).toGMTString(),
    };

    // making a post request
    setAuthToken();
    axios.post("/users/bookmarks/update", {
      data: { isBookmarked: this.state.isBookmarked, bookmark },
    })
      .then(data => {
        if (data.data.success) {
          alert("Update successful!");
          return true;
        }
        else if (!data.data.success) {
          alert("Failed to save changes!");
          return false;
        };
      })
      .catch(e => {
        alert("Unable to update bookmark, try again later!");
        console.log("Unexpected error occurred while trying to update the bookmark: ", e);
      })
      .then(status => { if (status) updateUserBookmarks() });

  }

  render() {

    // extracts information
    let { isLoggedIn, searchInputValue, displayData, googleUrl, query, isBookmarked, needsUpdate } = this.state;
    let { handleBookmarkUpdate, handleProfileUpdate } = this;

    // calculates result container classes
    let resultContainerClasses = `container box padding-40px margin-bottom-20px ${!displayData ? "is-hidden" : ""}`;
    let valueClasses = displayData && displayData.changes >= 0 ? "has-text-success" : "has-text-danger";
    let bookmarkRibbonClass = isBookmarked ? "bookmark-on" : "bookmark-off";
    let updateProfileBtnClass = needsUpdate ? "button is-success is-small is-pulled-right" : "button is-success is-small is-pulled-right is-hidden";

    // parsing data
    let marketCap = displayData && displayData.marketCapitalization ? (displayData.marketCapitalization + "").split("").reverse().map((d, i, ar) => (i + 1) % 3 === 0 && i !== ar.length - 1 ? "," + d : d).reverse().join("") : 0;

    // authenticates user
    if (!isLoggedIn) return (
      <Redirect to="/login/auth" />
    );

    // default return 
    return (
      <div>
        <Header title="Search Crypto-Currencies" />

        <div className="container control padding-40px margin-bottom-20px text-center">
          <input onChange={this.handleInputChange} value={searchInputValue} className="input is-focused is-link margin-bottom-20px" type="text" placeholder="Search By Ticker" />
          <a onClick={this.handleSearch} className="button is-link">Search</a>
          <a></a>
        </div>

        <div className={resultContainerClasses} id="page">

          {

            (function () {
              if (displayData && !displayData.Error) {
                return (
                  <>
                    <div onClick={handleBookmarkUpdate} id="ribbon" className={bookmarkRibbonClass}><div>{query.toUpperCase()}</div></div>
                    <h2 className="subtitle">
                      {displayData.name + " (" + displayData.ticker + ")"}
                      <span><a onClick={handleProfileUpdate} className={updateProfileBtnClass}>Update Profile</a></span>
                    </h2>
                    <div><span className="has-text-weight-semibold">Current Price (USD): </span><pre className={valueClasses}>{displayData.price}</pre></div>
                    <div><span className="has-text-weight-semibold">Changes (USD): </span><pre className={valueClasses}>{displayData.changes > 0 ? "+" + displayData.changes : displayData.changes}</pre></div>
                    <div><span className="has-text-weight-semibold">Market Capitalization (USD): </span><pre>{marketCap}</pre></div>
                  </>

                );
              }
              else if (displayData && displayData.Error) return (
                <p className="is-italic">Unable to find results, maybe the links below can help.</p>
              );
            })()


          }

        </div>

        <div className={resultContainerClasses}>
          <h2 className="subtitle is-italic">Some useful links:</h2>
          <ul>
            <li><a target="_blank" href={googleUrl}>Google search for {query.toUpperCase()}</a></li>
          </ul>
        </div>

      </div>
    );
  }
}

// Exporting Components
export default SearchCrypto;
