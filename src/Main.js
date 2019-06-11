// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";

// Importing Components
import Home from "./Home";

// Declaring Components
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // returning JSx
    return (
      <div>
        <Home />
      </div>
    );
  }
}

// Exporting Components
export default Main;