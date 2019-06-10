// Importing Modules
import React from "react";
import Home from "./Home";
import Nav from "./Navbar";

// Declaring components
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render(){
    return (
      <div>
        <Nav />
        <Home />
      </div>
    );
  }
}

// exporting components
export default App;
