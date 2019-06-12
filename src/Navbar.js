// Navbar Component
// Displays Navbar

// importing modules
import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./App.css";
import {clearUserID } from "./utils/auth";

// Declaring Components //
class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isBurgerActive: false,
    };
  }

  // handling click on hamburgerBurger on smaller screens for menu
  onBurgerClick = () => {
    this.setState({isBurgerActive: !this.state.isBurgerActive});
  }

  // handling logout
  handleLogOut = () => {
    clearUserID();
  }

  render(){
    // calculating classes
    let isActive = this.state.isBurgerActive ? " is-active" : "";
    let {isLoggedIn, user} = this.props;
    let {handleLogOut} = this;

    return (
      <nav className="navbar is-fixed-bottom is-dark is-bold" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item is-uppercase is-italic has-text-weight-bold" href="#">
            Stock Market
          </a>
  
          <a onClick={() => this.onBurgerClick()} role="button" className={"navbar-burger burger" + isActive} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
  
        <div id="navbarBasicExample" className={"navbar-menu" + isActive}>
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

                {
                  (function(){
                    if(!isLoggedIn){
                      return (
                        <>
                          <Link to="/signup" className="button is-primary">
                            <strong>Sign up</strong>
                          </Link>
                          <Link to="/login/user" className="button is-light">
                            Log in
                          </Link>
                        </>
                      );
                    }
                    else if(isLoggedIn){
                      return (
                        <>
                          <Link to="/me" className="button is-link">
                            <strong>{user}</strong>
                          </Link>
                          <Link to="/" onClick={handleLogOut} className="button is-danger">
                            LogOut
                          </Link>
                        </>
                      );
                    }
                  })()
                }

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
