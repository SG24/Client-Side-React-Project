// Navbar Component
// Displays Navbar and controls routing

// importing modules
import React from "react";
import {} from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./App.css";

// Declaring Components
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (

      <nav className="navbar is-fixed-bottom is-dark is-bold" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item is-uppercase is-italic has-text-weight-bold" href="#">
            Stock Market
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item is-active">
              Home
            </a>

            <div className="navbar-item has-dropdown has-dropdown-up is-hoverable">
              <a className="navbar-link">
                Search More
              </a>

              <div className="navbar-dropdown has-text-weight-bold">
                <a className="navbar-item">
                  CryptoCurrencies
                </a>
                <a className="navbar-item">
                  Stocks &amp; Companies 
                </a>
                
                <hr className="navbar-divider" />
                
                <a className="navbar-item">
                  About Us
                </a>
                <a className="navbar-item">
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

    );
  }
}


// exporting components
export default Nav;
