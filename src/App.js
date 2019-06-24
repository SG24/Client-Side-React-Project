// Importing Modules
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getUserID } from "./utils/auth";
// Importing Components
import SignUp from "./SignUp";
import Login from "./Login";
import SearchCrypto from "./SearchCrypto";
import SearchCompanies from "./SearchCompanies";
import About from "./About";
import NotFound from "./NotFound";
import Nav from "./Navbar";
import Me from "./Me";
import Footer from "./Footer";
import DailyStockData from "./DailyStockData";

// Declaring components and handling routing
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
    };
  }

  componentDidMount = () => {
    // checking and updating if any user is logged in 
    let user = getUserID();
    if (user.success) {
      this.setState({
        isLoggedIn: true,
        user: user.username,
      });
    }
    else if (!user.success) {
      this.setState({
        isLoggedIn: false,
        user: user.err,
      });
    }
  }

  render() {
    // extracting info
    let { user, isLoggedIn } = this.state;

    // Returning JSx
    return (
      <Router>

        <Nav user={user} isLoggedIn={isLoggedIn} />

        <Switch>
          <Route exact path="/" component={DailyStockData} />
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
            path="/login/:id"
            render={(routeprops) => (
              <Login {...routeprops} />
            )}
          />

          <Route
            exact path="/me"
            render={(routeprops) => (
              <Me {...routeprops} />
            )}
          />

          <Route
            render={(routeprops) => (
              <NotFound {...routeprops} />
            )}
          />

        </Switch>

        <Footer />

      </Router>
    );
  }
}

// exporting components
export default App;
