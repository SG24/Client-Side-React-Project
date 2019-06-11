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

// Declaring constants
const URL = {
  NYSE_url: "/api/v1/fm/nyse",
};

// Declaring functions //
// Fetches data
// url: Receives url to fetch the data from
// returns a promise with data
async function fetchData(url){
  let response = await fetch(url);
  let data = response.json();
  return data;
}

// Declaring components and handling routing
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nyse: {},
    };
  }

  componentDidMount = () => {
    fetchData(URL.NYSE_url)
      .then(data => this.setState({nyse: data[0]}))
      .catch(err => this.setState({nyse: {err, errMessage: "Unable to fetch data!"}}));
  }

  render() {
    // Extracting info
    let {nyse} = this.state;

    // Returning JSx
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
          <Route 
            render={(routeprops) => (
              <NotFound {...routeprops} isOpen={nyse.isTheMarketOpen} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

// exporting components
export default App;
