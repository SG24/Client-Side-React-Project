// Importing modules/libraries
import React from "react";
import { Redirect } from "react-router-dom";
import uuidv4 from "uuid/v4"
import Fuse from "fuse.js";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

// importing custom components and functions
import Header from "./Header";
import { getUserID } from "./utils/auth";

// importing stylesheets
import "bulma/css/bulma.min.css";
import "./App.css";

// importing config files
import FM_CONFIG from "./utils/fm_config";

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
      coData: {},
      coHistoricalPrice: null,

      // is the user logged in
      isLoggedIn: true,
    };
    // store for symbols list
    this.symbolsList = [];
  }

  // handles search input value change
  handleQueryChange = (event) => {
    // updating query state
    let query = event.target.value.toUpperCase();
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
      coData: {},
      coHistoricalPrice: null,
    });
    this.updateSearchSuggestions("");
    this.fetchData(ticker);
    this.fetchAndParseHistoricalData(ticker);
  }

  fetchAndParseHistoricalData = (ticker, time = null) => {

    let url = "";

    // fetches url
    if (time === null) url = FM_CONFIG.historical.coStockOHLCVJSON_HistoricalDaily;

    // replaces placeholder with the actual ticker in the url
    url = url.replace("{ticker}", ticker);

    // fetches data
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.success = true;
        return data;
      })
      .catch(e => {
        e.success = false;
        return e;
      })
      .then(result => {
        this.setState({
          coHistoricalPrice: result,
        });
      });
  }

  // fetches requested company data
  fetchData = (ticker) => {
    // setting up urls
    let { init } = FM_CONFIG;
    let url = {};
    for (let key in init) {
      // console.log(key, init[key].replace("{ticker}", ticker));
      url[key] = init[key].replace("{ticker}", ticker);
    }

    for (let key in url) {
      fetch(url[key])
        .then(res => res.json())
        .then(data => {
          // setting success status
          data.success = data.Error ? false : true;
          return data;
        })
        .catch(e => {
          // setting success status
          e.success = false;
          return e;
        })
        .then(info => {
          let coData = this.state.coData;
          coData[key] = info;
          this.setState({
            coData: coData,
          });
        });
    }
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
    let { isLoggedIn, query, matchedSuggestions, extraSuggestions, isSearched, coData, coHistoricalPrice } = this.state;
    let { handleSearchClick, handleQueryChange } = this;

    // authenticating user
    if (!isLoggedIn) return (
      <Redirect to="/login/auth" />
    );

    // returning JSx if logged in
    return (
      <div>

        <Header title="Stocks" />

        {/* Renders input and live search suggestion reloading */}
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

        {/* Renders company profile and rating */}
        <div className="container text-center margin-bottom-20px">

          {
            (function () {
              if (isSearched && Object.keys(coData).length === 0) {
                return (
                  <a className="button is-warning is-large is-loading has-background-white no-borders">Loading</a>
                );
              }
              else if (isSearched && Object.keys(coData).length !== 0) {
                return (
                  <div>

                    {

                      // Returns Company profile
                      (function () {
                        if (coData["Company Profile"] && coData["Company Profile"].success) {
                          let info = coData["Company Profile"];
                          return (
                            <div className="container box padding-40px content margin-bottom-20px margin-center has-text-left">

                              <h3 className="title is-5">COMPANY PROFILE</h3>

                              <div className="float-right width-20perc">
                                <img src={info.profile.image} alt="Company Logo" />
                              </div>
                              <div className="is-clearfix width-60perc margin-bottom-20px">
                                <h4 className="title is-6">{info.profile.companyName} ({info.symbol})</h4>
                                <p className="is-medium">{info.profile.description}</p>
                                <p className="is-medium"><span className="is-italic has-text-weight-semibold">CEO:</span> {info.profile.ceo}</p>
                                <p className="is-medium"><span className="is-italic has-text-weight-semibold">Industry: </span>{info.profile.industry}</p>
                                <p className="is-medium"><span className="is-italic has-text-weight-semibold">Sector:</span> {info.profile.sector}</p>
                                <p className="is-medium"><span className="is-italic has-text-weight-semibold">Listed on</span> {info.profile.exchange}</p>
                                <div>
                                  <span className="is-italic has-text-weight-semibold">Some helpful links: </span>
                                  <ul>
                                    <li><a href={"https://www.google.com/search?q=" + info.profile.companyName.split(" ").join("+")} target="_blank">Google Search for {info.profile.companyName}</a></li>
                                    <li><a href={info.profile.website} target="_blank">{info.profile.companyName} Website</a></li>
                                  </ul>
                                </div>
                              </div>
                              <hr />
                              <div className="width-60perc has-text-left">
                                <p><span className="is-italic has-text-weight-semibold">Stock Price (USD): </span>{info.profile.price}</p>
                                <p><span className="is-italic has-text-weight-semibold">Changes (USD): </span>{info.profile.changes}</p>
                                <p><span className="is-italic has-text-weight-semibold">Change Percentage: </span>{info.profile.changesPercentage}</p>
                                <p><span className="is-italic has-text-weight-semibold">Stock Price Range (USD): </span>{info.profile.range}</p>
                                <p><span className="is-italic has-text-weight-semibold">Average Volume: </span>{info.profile.volAvg}</p>
                                <p><span className="is-italic has-text-weight-semibold">Market Capitalization (USD): </span>{info.profile.mktCap}</p>
                              </div>
                            </div>
                          );
                        }
                      })()
                    }
                    {

                      // Returns Company Ratings
                      (function () {
                        if (coData["Company Ratings"] && coData["Company Ratings"].success) {
                          let avgRatings = coData["Company Ratings"].rating;
                          let crDetails = coData["Company Ratings"].ratingDetails;
                          return (
                            <div className="container box padding-40px content margin-bottom-20px margin-center has-text-left">

                              <h3 className="title is-5">COMPANY'S RATINGS</h3>
                              <p><span className="has-text-weight-bold">Average Score and Recommendation: </span>{avgRatings.score} | {avgRatings.recommendation}</p>
                              <p className="subtitle is-6">Details:</p>
                              <ul>

                                {
                                  (function () {
                                    let crDetailsArr = [];
                                    for (let ratio in crDetails) {
                                      let cr = crDetails[ratio];
                                      cr.ratio = ratio;
                                      crDetailsArr.push(cr);
                                    }
                                    return crDetailsArr.map(cr => {
                                      return (
                                        <li key={uuidv4()}><span className="has-text-weight-semibold">{cr.ratio} score: </span>{cr.score} | {cr.recommendation}</li>
                                      );
                                    });
                                  })()
                                }

                              </ul>

                            </div>
                          );
                        }
                      })()
                    }

                  </div>
                );
              }
            })()
          }

        </div>

        {/* Renders historical stock price line graph */}
        <div>

          {

            (function () {
              if (coHistoricalPrice && coHistoricalPrice.success) {

                let historicalData = coHistoricalPrice.historical.slice(-100);
                // console.log(historicalData);

                return (
                  <div className="container margin-bottom-20px">
                    <h3 className="title is-5">Historical OHLC Stock Price Data</h3>
                    <ResponsiveContainer height={500} width="90%">
                      <LineChart height={400} data={historicalData} margin={{ top: 10, right: 20, bottom: 20, left: 20 }} label="Historical OHLC stock price data">
                        <Line dot={false} type="monotone" dataKey="open" stroke="green" />
                        <Line dot={false} type="monotone" dataKey="high" stroke="blue" />
                        <Line dot={false} type="monotone" dataKey="low" stroke="red" />
                        <Line dot={false} type="monotone" dataKey="close" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis type="number" domain={["dataMin", "datamax"]} />
                        <Tooltip />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
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
