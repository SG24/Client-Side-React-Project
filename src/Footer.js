// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";

// Declaring components
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    // Returning JSx
    return (
      <footer className="footer">

        <div className="content has-text-centered">
          <p>
            <strong>Stock Market</strong> by <a href="https://github.com/SG24">SG</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is presented using <a href="https://financialmodelingprep.com">Financial Modelling API</a>.
          </p>
        </div>

      </footer>
    );
  }
}

// Exporting Component
export default Footer;
