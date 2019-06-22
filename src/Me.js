// Importing Modules
import React from "react";
import setAuthToken, { getUserID } from "./utils/auth";
import uuvid4 from "uuid/v4";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import "bulma/css/bulma.min.css";
import "./App.css";

// Importing components

// Declaring Component
class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      current_bookmarks_cc: null,
    };
  }

  componentDidMount = () => {
    // requiring and updating user
    this.setState(
      { user: getUserID() },
      () => {
        // fetching current prices of bookmarks cc once the user's been loaded
        if (this.state.current_bookmarks_cc === null) this.fetchData();
      }
    );
  }

  // fetching current prices and saving them in state
  fetchData = () => {
    let { bookmarks_cc } = this.state.user;
    let bookmarks = JSON.parse(bookmarks_cc);

    bookmarks.forEach(cc => {
      fetch(cc.url)
        .then(res => res.json())
        .then(data => {
          let current_bookmarks_cc = this.state;
          current_bookmarks_cc[cc.ticker] = data.price;
          // updating current bookmark prices in state
          this.setState({ current_bookmarks_cc: current_bookmarks_cc });
          return 0;
        })
        .catch(e => {
          let current_bookmarks_cc = this.state;
          current_bookmarks_cc[cc.ticker] = "Unable to fetch data!";
          // updating current bookmarks price state
          this.setState({ current_bookmarks_cc: current_bookmarks_cc });
          return 0;
        });
    });
  }

  render() {
    // extracting information
    let { username, bookmarks_cc, email } = this.state.user ? this.state.user : { username: null, email: null, bookmarks_cc: null };
    let current_bookmarks_cc = this.state;

    // authenticating user login
    if (!getUserID().token) return (
      <Redirect to="/login/auth" />
    );

    // returning JSx if logged in
    return (
      <div>

        <Header title="Profile Page" />

        <div className="container box padding-40px margin-bottom-20px">
          <h2 className="title">About</h2>
          <pre><span className="has-text-weight-semibold">Username:</span> {username ? username : ""}</pre>
          <pre className="margin-bottom-20px"><span className="has-text-weight-semibold">Email:</span> {email ? email : ""}</pre>
          <a className="button is-info">Reset Password</a>
        </div>

        <div className="container padding-40px margin-bottom-20px">
          <h2 className="title">Preferences</h2>
          <div>

            <h3 className="subtitle">Bookmarked CryptoCurrencies:</h3>

            <table className="table is-striped is-bordered">

              <thead>
                <tr>
                  <th>Crypto-Currency (Ticker)</th>
                  <th>Date when bookmarked</th>
                  <th>Price when bookmarked</th>
                  <th>Current Price</th>
                </tr>
              </thead>

              <tbody>

                {

                  (function () {

                    let bookmarks = JSON.parse(bookmarks_cc);

                    // if no bookmarks found
                    if (!bookmarks || bookmarks.length === 0) return (<tr><td colSpan="4">No bookmarked Crypto-Currencies yet!</td></tr>);

                    // if bookmarks found, calculates resultant JSx with prices
                    let result = bookmarks.map(cc => {

                      return (

                        <tr key={uuvid4()}>
                          <td>{cc.ticker}</td>
                          <td>{cc.bookmarkedDate}</td>
                          <td>{cc.bookmarkedPrice}</td>

                          {
                            (function () {

                              console.log("inside function printing current price", current_bookmarks_cc === null, current_bookmarks_cc);

                              // default if the current bookmarked cc price is null
                              if (current_bookmarks_cc === null) return (<td><a className="button is-warning is-loading no-borders has-background-white">Loading</a></td>)

                              // returns current price 
                              return (
                                <td>{current_bookmarks_cc[cc.ticker]}</td>
                              );

                            })()
                          }

                        </tr>

                      );
                    });

                    // returning calculated result
                    return result;
                  })()

                }

              </tbody>

            </table>

          </div>
        </div>


      </div>
    );
  }
}

// Exporting Component
export default Me;
