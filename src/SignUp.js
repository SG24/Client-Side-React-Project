// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import axios from "axios";

// Importing Components
import Header from "./Header";

// Declaring Constants
let SIGNUP_URL = "/users/signup";

// Declaring Components
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
  }

  // handling input change event
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handling submit
  handleSubmit = (event) => {
    // prevent the page from reloading 
    event.preventDefault();
    // extracting user info and resetting state
    let { username, password, email } = this.state;
    this.setState({
      username: "",
      password: "",
      email: "",
    });
    // sending user info to server and redirecting to login if success
    axios.post(SIGNUP_URL, { username, password, email })
      .then(data => {
        if(data.data.success) this.props.history.push("/login/user");
        else alert(data.data.err);
      })
      .catch(e => console.log(e));
  }

  render() {
    // Extracting info from state
    let { username, password, email } = this.state;

    // Returning JSx
    return (

      <div>

        <Header title="SignUp" />

        <form className="container">

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input value={username} onChange={(event) => this.handleInputChange(event)} className="input" name="username" type="text" placeholder="Username" />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input value={email} onChange={(event) => this.handleInputChange(event)} className="input" name="email" type="email" placeholder="Email" />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input value={password} onChange={(event) => this.handleInputChange(event)} className="input" name="password" type="password" placeholder="**********" />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button onClick={this.handleSubmit} className="button is-link">SignUp</button>
            </div>
            <div className="control">
              <button type="reset" className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Exporting Components
export default SignUp;
