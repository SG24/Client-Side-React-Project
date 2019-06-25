// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import { getUserID } from "./utils/auth";
import { Redirect } from "react-router-dom";
import uuidv4 from "uuid/v4"
import Fuse from "fuse.js";
import FM_CONFIG from "./utils/fm_config";
import Header from "./Header";

// Declaring Components
class SearchCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // search input query
      query: "",
      matchedSuggestions: [],
      extraSuggestions: [],

      // searched ?
      isSearched: false,
      coData: null,

      // is the user logged in
      isLoggedIn: true,
    };
    // store for symbols list
    this.symbolsList = [];
  }

  // handles search input value change
  handleQueryChange = (event) => {
    // updating query state
    let query = event.target.value;
    this.setState({ query });
    // updating search suggestions
    this.updateSearchSuggestions(query);
  }

  // handles search button on click
  handleSearchClick = (event) => {
    // getting the tigger from the target element
    let ticker = event.target.dataset.ticker === undefined ? event.target.parentElement.dataset.ticker : event.target.dataset.ticker;
    // resetting query and search suggestions
    this.setState({
      query: "",
      isSearched: true,
      coData: null,
      });
    this.updateSearchSuggestions("");
    console.log(ticker);
  }

  // updates search suggestions
  updateSearchSuggestions = (str) => {
    let { symbolsList } = this;
    // resets search suggestions if str passed is empty or if symbolsList hasn't been fetched 
    if (!symbolsList.success || str === "") this.setState({ matchedSuggestions: [], extraSuggestions: [] });
    // else implements search and updates search suggestions with the top matches
    else if (symbolsList.success && str !== "") {
      let symbolsArr = symbolsList.symbolsList;
      // setting fuse options
      let options = {
        shouldSort: true,
        includeScore: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "symbol",
          "name",
        ]
      };
      let fuse = new Fuse(symbolsArr, options);
      let result = fuse.search(str);
      let matches = result.slice(0, 10);
      let more = result.slice(10, 20);

      this.setState({
        matchedSuggestions: matches,
        extraSuggestions: more,
      });
    }
  }

  // when component mounts
  componentDidMount = () => {
    // fetches symbols list for live searching
    fetch(FM_CONFIG.all["Symbols List (All)"])
      .then(res => res.json())
      .then(data => {
        data.success = true;
        this.symbolsList = data;
      })
      .catch(e => {
        e.success = false;
        this.symbolsList = e;
      });

    // checks, if user not logged in, sets boolean to false 
    if (!getUserID().token) {
      this.setState({ isLoggedIn: false });
    }

  }

  render() {
    // extracting info
    let { isLoggedIn, query, matchedSuggestions, extraSuggestions, isSearched, coData } = this.state;
    let { handleSearchClick, handleQueryChange } = this;

    // authenticating user
    if (!isLoggedIn) return (
      <Redirect to="/login/auth" />
    );

    // returning JSx if logged in
    return (
      <div>

        <Header title="Stocks" />

        <div className="container padding-40px margin-top-50px margin-bottom-20px text-center">
          
          {/* Input search */}
          <input value={query} onChange={handleQueryChange} className="input is-focused is-link margin-bottom-20px" type="text" placeholder="Ticker or Company Name" />
          
          {/* Suggestions */}
          <div className="container margin-bottom-20px">
            <h2 className="title is-5">{matchedSuggestions.length === 0 ? "" : "Did you mean: "}</h2>
            <div className="margin-bottom-20px">
              {
                matchedSuggestions.map(match => {
                  return (
                    <a onClick={handleSearchClick} data-ticker={match.item.symbol} key={uuidv4()} className="button is-small is-success margin-5px"><span className="has-text-weight-semibold">{match.item.name} ( {match.item.symbol} )</span><span className="is-italic"> ${match.item.price}</span></a>
                  );
                })
              }
            </div>
            <h2 className="title is-5">{extraSuggestions.length === 0 ? "" : "More: "}</h2>
            <div>
              {
                extraSuggestions.map(extra => {
                  return (
                    <a onClick={handleSearchClick} data-ticker={extra.item.symbol} key={uuidv4()} className="button is-small is-primary margin-5px"><span className="has-text-weight-semibold">{extra.item.name} ( {extra.item.symbol} )</span><span className="is-italic"> ${extra.item.price}</span></a>
                  );
                })
              }
            </div>
          </div>

        </div>

        <hr />

        <div className="container text-center">

              {
                (function(){
                  if(isSearched && coData === null){
                    return (
                      <a className="button is-warning is-large is-loading has-background-white no-borders">Loading</a>
                    );
                  }
                })()
              }

        </div>

      </div>
    );
  }
}

// Exporting Components
export default SearchCompanies;
