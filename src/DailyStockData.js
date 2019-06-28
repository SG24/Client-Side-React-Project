// importing modules
import React from "react";
// Stylesheets
import "bulma/css/bulma.min.css";
import './App.css';
import uuidv4 from "uuid/v4";
import Header from "./Header";

// Declaring global variables and constants //
const DAILY_UPDATES = [
  {
    head: "Most Active Stocks",
    url: "https://financialmodelingprep.com/api/stock/actives?datatype=json"
  },
  {
    head: "Most Gainer Stocks",
    url: "https://financialmodelingprep.com/api/stock/gainers?datatype=json"
  },
  {
    head: "Most Loser Stocks",
    url: "https://financialmodelingprep.com/api/stock/losers?datatype=json",
  },
  {
    head: "Major Indexes",
    url: "https://financialmodelingprep.com/api/majors-indexes?datatype=json",
  },
  {
    head: "Sectors Performance",
    url: "https://financialmodelingprep.com/api/v3/stock/sectors-performance",
  },
  {
    head: "Forex",
    url: "https://financialmodelingprep.com/api/v3/forex?datatype=json",
  },
];

let checkPriceChange = (amt) => {
  // checking if amt has any symbols attached to it
  if (typeof (amt) === "string" && amt.indexOf("%") !== -1) {
    amt = Number(amt.split(/[%]/).shift());
  };

  // appending class depending upon amt
  if (amt < 0) return "has-text-danger";
  else if (amt > 0) return "has-text-success";
  else return "";
}

// declaring class components
class DailyStockData extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      isLoading: false,
      // activeData: {},
    };
    this.activeData = {};
  }

  // custom functions
  fetchData = (tab = undefined) => {

    let url = tab || tab === 0 ? DAILY_UPDATES[tab].url : DAILY_UPDATES[Number(this.state.isActive)].url;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if(data.sectorPerformance) this.activeData = data.sectorPerformance;
        else if(data.forexList) this.activeData = data.forexList;
        else this.activeData = data;
      })
      .catch(err => {
        this.activeData = {
          errMessage: "Unable to fetch data. Check internet connection and try again!",
          err,
        }
      })
      .then(undef => {
        this.setState({ isLoading: false })
      });
  }

  // inbuilt functions
  componentDidMount = this.fetchData

  // handling tab selection
  handleClick = (event) => {

    let tabIndex = Number(event.target.parentElement.dataset.index);

    // Changing tab active status //
    this.setState({
      isActive: tabIndex,
      isLoading: true,
    });

    // fetching data
    this.fetchData(tabIndex);
  }

  render() {
    // extracting state data into variables
    let { isActive, isLoading } = this.state;
    let { activeData } = this;

    // fixing indexes if there's special characters
    let fixIndexesTicker = (indexTicker) => {

      indexTicker = indexTicker.split(/[.%]\d*/).pop();

      return indexTicker;
    };

    // returing JSX
    return (
      <article className="margin-bottom-20px">
        <Header title="Home" />

        {/* Rendering tabs */}
        <div className="tabs is-centered is-toggle margin-bottom-20px">
          <ul>

            {
              DAILY_UPDATES.map((tab, ind) => {
                return (
                  <li data-index={ind} key={uuidv4()} className={Number(isActive) === Number(ind) ? "is-active" : ""}>
                    <a onClick={(event) => this.handleClick(event)} href="#">
                      {tab.head}
                    </a>
                  </li>
                );
              })
            }

          </ul>
        </div>

        {/* Rendering data in a table */}
        <section className="container margin-bottom-20px">

          <table className="table is-striped is-bordered margin-center">
            <thead>

              <GenerateRows isActive={isActive} />

            </thead>
            <tbody>

              {
                (function () {
                  // Checking if data is still loading
                  if (isLoading) return (
                    <tr>
                      <td colSpan="6">
                        <a className="button is-warning is-loading no-borders full-width has-background-white">Loading</a>
                      </td>
                    </tr>
                  );
                  // Checking if there is a message
                  else if (activeData.errMessage) return (
                    <tr>
                      <td colSpan="6">
                        {activeData.errMessage}
                      </td>
                    </tr>
                  );

                  // Extracting data into an array
                  let tempArr = [];

                  for (let key in activeData) {
                    // extraction
                    let tempData = activeData[key];

                    // fixing data.Changes || data.Change
                    activeData[key].Changes ? tempData.Changes = activeData[key].Changes : tempData.Changes = activeData[key].Change;
                    if (activeData[key].changesPercentage) tempData.Changes = activeData[key].changesPercentage;

                    // fixing indexes ticker
                    activeData[key].Ticker ? tempData.Ticker = fixIndexesTicker(tempData.Ticker) : tempData.Ticker = null;
                    if (activeData[key].sector) tempData.Name = activeData[key].sector;

                    // pushing to new array
                    tempArr.push(tempData);
                  }

                  // returning JSX
                  return (
                    tempArr.map((data) => {
                      return (

                        <GenerateRows key={uuidv4()} isActive={isActive} info={data} />

                      );
                    })
                  );
                })()
              }

            </tbody>
          </table>

        </section>

      </article>
    );
  }
}

// generating table row
function GenerateRows(props) {

  // extracting info
  let info = props.info ? props.info : null;

  // header for forex
  if (info === null && DAILY_UPDATES[props.isActive].head === "Forex") {
    return (
      <tr>
        <th>Ticker</th>
        <th>Bid</th>
        <th>Ask</th>
        <th>Open</th>
        <th>Low</th>
        <th>High</th>
        <th>Changes</th>
      </tr>
    );
  }
  // header for sectors performance
  else if (info === null && DAILY_UPDATES[props.isActive].head === "Sectors Performance") {
    return (
      <tr>
        <th>Name</th>
        <th>Change</th>
      </tr>
    );
  }
  // header for all but sectors performance or forex
  else if (info === null) {
    return (
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Change</th>
        <th>Price</th>
      </tr>
    );
  }

  // if info includes sectors performance
  if (DAILY_UPDATES[props.isActive].head === "Sectors Performance") {
    return (
      <tr>
        <td className="has-text-weight-semibold">{info.Name}</td>
        <td className={checkPriceChange(info.Changes)}>{info.Changes}</td>
      </tr>
    );
  }
  // if info includes forex
  else if (DAILY_UPDATES[props.isActive].head === "Forex") {
    return (
      <tr>
        <td className="has-text-weight-semibold">{info.ticker}</td>
        <td>{info.bid}</td>
        <td>{info.ask}</td>
        <td>{info.open}</td>
        <td>{info.high}</td>
        <td>{info.low}</td>
        <td className={checkPriceChange(info.changes)}>{info.changes}</td>
      </tr>
    );
  }

  // default return
  return (
    <tr>
      <td className="has-text-weight-semibold">{info.companyName ? info.companyName : info.Name}</td>
      <td>{info.Ticker ? info.Ticker : ""}</td>
      <td className={checkPriceChange(info.Changes)}>{info.Changes}</td>
      <td className={checkPriceChange(info.Changes)}>{info.Price}</td>
    </tr>
  );
}

// exporting
export default DailyStockData;
