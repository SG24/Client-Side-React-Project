// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import Header from "./Header";

// Declaring Components
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>

      <Header isOpen={this.props.isOpen} title="Login"/>

      <form action="" method="POST" className="container">

        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input" type="text" placeholder="Username" />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="**********" />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Login</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    );
  }
}

// Exporting Components
export default Login;
