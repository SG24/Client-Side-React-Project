/**
 * How to use Header Component
 *  Renders the hero banner
 *  Requirements:
 *    => title: The title to be displayed on the banner
 */

// ==============================================================
// HEader not updating with fetched data
// ==============================================================

// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";

// importing utils
import functions from "./utils/functions";
let { fetchData } = functions;

// Declaring constants
const URL = {
  NYSE_url: "/api/v1/fm/nyse",
};

// Declaring components
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nyse: null,
    };
  }

  componentDidMount = () => {
    fetchData(URL.NYSE_url)
      .then(data => this.setState({ nyse: data[0] }))
      .catch(err => this.setState({ nyse: { err, errMessage: "Unable to fetch data!" } }));
  }

  render() {
    // extracting information
    let isOpen = this.state.nyse ? this.state.nyse.isTheMarketOpen : -1;

    // console.log(isOpen);

    // Interpreting information
    let subtitleClass = isOpen ? "subtitle has-text-primary" : "subtitle has-text-danger";
    let subtitleText = isOpen ? "The market is open!" : "The market is closed! Check back at 9:30 a.m. EDT.";

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
