// Importing modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import {Link} from "react-router-dom";

// Declaring Components
class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="grid-center margin-top-50px container">
        <h1 className="title is-1">404 Page Not Found</h1>
        <Link to="/" className="button is-success">Go to Home</Link>
      </div>
    );
  }
}

// Exporting Components
export default NotFound;
