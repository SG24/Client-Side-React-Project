// Navbar Component
// Displays Navbar and controls routing

// importing modules
import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./App.css";

// Declaring Components //
function Nav(props) {

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
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <div className="navbar-item has-dropdown has-dropdown-up is-hoverable">
            <a className="navbar-link">
              Search More
            </a>

            <div className="navbar-dropdown has-text-weight-bold">
              <Link to="/search/crypto" className="navbar-item">
                CryptoCurrencies
              </Link>
              <Link to="/search/companies" className="navbar-item">
                Stocks &amp; Companies
              </Link>

              <hr className="navbar-divider" />

              <Link to="/about" className="navbar-item">
                About Us
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/signup" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link to="/login" className="button is-light">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
}


// exporting components
export default Nav;
