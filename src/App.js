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

// Declaring components and handling routing
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    // Returning JSx
    return (
      <Router>

        <Nav />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/crypto" component={SearchCrypto} />
          <Route exact path="/search/companies" component={SearchCompanies} />
          <Route exact path="/about" component={About} />
          
          <Route 
            exact path="/signup"
            render={(routeprops) => (
              <SignUp {...routeprops} />
            )}
          />
          
          <Route 
            exact path="/login"
            render={(routeprops) => (
              <Login {...routeprops} />
            )}
          />

          <Route 
            render={(routeprops) => (
              <NotFound {...routeprops} />
            )}
          />
          
        </Switch>
      </Router>
    );
  }
}

// exporting components
export default App;
