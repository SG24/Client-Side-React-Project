// Importing modules
import React from 'react';
import "bulma/css/bulma.min.css";
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import Table from "./Table";
import Tabs from "./Tabs";

// Declaring constants and global variables
const HOME_URL = "/api/v1/fm/home";

// Declaring functions
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      homeData: [],
      nyse: undefined,
      activeTabIndex: 0,
    };
  }

  // fetching data
  fetchHomeData = () => fetch(HOME_URL)
    .then(response => response.json())
    .then(data => {
      // Checking if any error is being returned
      if (data[0].err) {
        this.setState({ homeData: data });
        return [];
      }
      return data;
    })
    .then(data => {
      // filtering stock info
      if (data.length !== 0 && data.constructor === Array) {
        let filteredData = data.filter(val => {
          return val.head && !val.stockExchangeName;
        });
        this.setState({ homeData: filteredData });
      }
      return data;
    })
    .then(data => {
      // extracting nyse data to separate state
      if (data.length !== 0 && data.constructor === Array) {
        let NYSE = data.filter((val) => {
          return !val.head && val.stockExchangeName;
        });
        this.setState({ nyse: NYSE[0] });
      }
    })
    .catch(err => {
      this.setState({ homeData: { err, errMessage: "Unable to fetch!" } });
    });

  componentDidMount = () => {
    // initial data fetch
    this.fetchHomeData();
  }

  // calculating and returning an headers array
  calcHeaders = (rawData) => {
    let headers = [];
    if (rawData.length !== 0 && !rawData[0].err) {
      rawData.filter(d => {
        headers.push(d.head);
      });
    }
    return headers;
  }

  // Handling on click event on tabs
  onClickTabs = (event) => {
    // updating the active tab index
    this.setState({ activeTabIndex: event.currentTarget.dataset.index });
  }

  // parsing data for table
  parseTableHeaders = () => {
    let containerObjVar = ["name", "changePercentage", "change", "open", "high", "low", "price"];
    let data = this.state.homeData.length !== 0 ? this.state.homeData[this.state.activeTabIndex] : 0;
    let headers = [];

    if (data !== 0) {
      let ask, bid, high, low, open;
      let { name, change, changePercentage, price } = data.data[0];
      if (price.constructor === Object) {
        low = price.low;
        ask = price.ask;
        bid = price.bid;
        high = price.high;
        open = price.open;
      }

      let containerObj = [{ name }, { changePercentage }, { change }, { open }, { high }, { low }, { price }];
      if (price.constructor === Object) {
        containerObj[containerObj.length - 1] = { price: "undefined" };
      }

      // checking if the values in container obj at the specified index with the key at the same index in containerObjVar !== undefined, then pushing the key in the headers array.
      containerObj.forEach((val, ind) => {
        if (val[containerObjVar[ind]] !== undefined && val[containerObjVar[ind]] !== "undefined") {
          headers.push(Object.keys(val)[0]);
        }
      });

    } else return 0;

    return headers;
  }

  parseTableData = () => {
    let data = this.state.homeData.length !== 0 ? this.state.homeData[this.state.activeTabIndex].data : 0;
    if (data === 0) return 0;

    let filteredData = data.map(val => {
      let filter = {};
      for (let key in val) {
        if (val[key] !== "undefined" && val[key] !== undefined && val[key].constructor !== Object) {
          filter[key] = val[key];
        }
        else if (val[key] !== "undefined" && val[key] !== undefined && val[key].constructor === Object) {
          filter = Object.assign(filter, val[key]);
        }
      }
      return filter;
    });
    return filteredData;
  }

  render() {
    // Extracting information
    let isOpen = this.state.nyse ? this.state.nyse.isTheStockMarketOpen : undefined;

    // returning JSx.
    return (
      <main>
        <Header isOpen={isOpen} />
        <div className="container margin-bottom-20px">
          <Tabs onClick={this.onClickTabs} headers={this.calcHeaders(this.state.homeData)} />
          <Table colorCode={["change", "changePercentage", "price", "open", "high", "low"]} highlightFirstCol={true} headers={this.parseTableHeaders()} data={this.parseTableData()} />
        </div>
        <Footer />
      </main>
    );
  }
}

// Exporting App
export default App;
