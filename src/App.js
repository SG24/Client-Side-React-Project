// Importing Modules
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Importing Components
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import SearchCrypto from "./SearchCypto";
import SearchCompanies from "./SearchCompanies";
import About from "./About";
import NotFound from "./NotFound";
import Nav from "./Navbar";

// Declaring components
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Router>

        <Nav />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/crypto" component={SearchCrypto} />
          <Route exact path="/search/companies" component={SearchCompanies} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

// exporting components
export default App;
