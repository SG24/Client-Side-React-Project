/**
 * How to use Header Component
 *  Renders the hero banner
 *  Requirements:
 *    => title: The title to be displayed on the banner
 */

// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";

// Declaring constants
const URL = {
  // NYSE_url: "/api/v1/fm/nyse",
  NYSE_url: "https://financialmodelingprep.com/api/v3/is-the-market-open",
};

// Declaring components
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNYSEOpen: null,
    };
  }

  // checking if nyse is open
  checkIsNYSEOpen = () => {
    fetch("https://financialmodelingprep.com/api/v3/is-the-market-open")
      .then(res => res.json())
      .then(data => {
        data.success = true;
        this.setState({ isNYSEOpen: data });
      })
      .catch(err => {
        if (!this.state.isNYSEOpen) {
          let data = {
            success: false,
            errMessage: "Unable to fetch data. Check internet connect and try again!",
            err
          };
          this.setState({ isNYSEOpen: data });
        }
      });
  }

  componentDidMount = this.checkIsNYSEOpen

  render() {
    // extracting information
    let isOpen = this.state.isNYSEOpen && this.state.isNYSEOpen.success === true ? this.state.isNYSEOpen.isTheStockMarketOpen : 0;

    // Interpreting information
    let subtitleClass = isOpen ? "subtitle has-text-primary" : "subtitle has-text-danger";
    let subtitleText = isOpen ? "The market is open!" : "The market is closed! Check back at 9:30 a.m. EDT.";
    // default subtitle text if counldn't fetch data
    if(isOpen === 0) subtitleText = <a className="button is-primary is-loading has-background-dark no-borders">Loading</a>;
    if(this.state.isNYSEOpen && this.state.isNYSEOpen.success === false) subtitleText = "Unable to fetch data!";

    // Returning JSx
    return (
      <header className="margin-bottom-20px">

        <section className="hero is-dark is-bold is-medium ">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-2">
                Stock Market
              </h1>
              <h2 className={subtitleClass}>
                {subtitleText}
              </h2>
              <h3 className="subtitle is-italic">
                {this.props.title}
              </h3>
            </div>
          </div>
        </section>

      </header>
    );
  }
}

// Exporting Component
export default Header;
