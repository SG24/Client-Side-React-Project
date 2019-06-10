/**
 * How to use Header Component
 *  Renders the hero banner
 *  Requirements:
 *    => isOpen: a boolean declaring if the market is open
 *    => title: The title to be displayed on the banner
 */

// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";

// Declaring components
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    // Interpreting information
    let subtitleClass = this.props.isOpen ? "subtitle has-text-primary" : "subtitle has-text-danger";
    let subtitleText = this.props.isOpen ? "The market is open!" : "The market is closed! Check back at 9 a.m. EDT.";

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
