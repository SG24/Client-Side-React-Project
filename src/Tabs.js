/**
 * How to use this component: 
 *  Displays a list of tabs. 
 *  Requirements:
 *    => An array of headers and an onclick function, default active tab is 0;
 */

// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import uuidv4 from "uuid/v4";

// Declaring Component
class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: 0,
    };
  }

  // updating the index of active tab in the state
  updateActiveTab = (index) => {
    this.setState({isActiveTab: index});
  }

  render() {
    // Extracting information
    let {onClick, headers} = this.props;

    // Returning JSx
    return (
      <div className="tabs is-toggle is-centered margin-bottom-20px">
        <ul>

          {
            headers.map((header, index) => {
              return (
                <li key={uuidv4()} data-index={index} className={index === Number(this.state.isActiveTab) ? "is-active" : ""} onClick={(event) => {this.updateActiveTab(index); onClick(event)}}>
                  <a>
                    <span>{header}</span>
                  </a>
                </li>
              );
            })
          }

        </ul>
      </div>
    );
  }
}

// Exporting Component
export default Tabs;
