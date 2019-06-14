// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import Header from "./Header";
import axios from "axios";
import setAuthToken, { saveUserID } from "./utils/auth";

// declaring constants
const LOGIN_URL = "/users/login";

// Declaring Components
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  // handling input on change event
  handleInputChange = (event) => {
    // updating state
    this.setState({ [event.target.name]: event.target.value });
  }

  // handling submit
  handleSubmit = (event) => {
    // preventing the page from loading
    event.preventDefault();
    // extracting user info and resetting state
    let { username, password } = this.state;
    this.setState({
      username: "",
      password: "",
    });
    // sending user info to server and storing the received token if success, redirecting to home
    axios.post(LOGIN_URL, { username, password })
      .then(data => {
        if (data.data.success) {
          let { username } = data.data.user;
          let token = data.data.token;

          saveUserID({ username, token });
          setAuthToken();

          this.props.history.push("/");
        }
        else alert(data.data.err);
      })
      .catch(e => console.log(e));
  }

  render() {
    // extracting value from state
    let { username, password } = this.state;

    return (
      <div>

        <Header title="Login" />

        <form className="container padding-40px">

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input onChange={(event) => this.handleInputChange(event)} name="username" value={username} className="input" type="text" placeholder="Username" />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input onChange={(event) => this.handleInputChange(event)} name="password" value={password} className="input" type="password" placeholder="**********" />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button onClick={(event) => this.handleSubmit(event)} className="button is-link">Login</button>
            </div>
            <div className="control">
              <button type="reset" className="button is-text">Cancel</button>
            </div>
          </div>

          <p className="subtitle has-text-danger is-italic is-size-6">{this.props.match.params.id === "auth" ? "Login to gain access" : ""}</p>

        </form>
      </div>
    );
  }
}

// Exporting Components
export default Login;
