/**
 * How to use this component:-
 *  Renders a table
 *  Requirements:
 *    => headers: An array of headers in the order to be displayed, capitalises before displaying
 *    => data: An data var, which contains an array of objects, color codes numerical fields depending on if theyre negative or positive
 *    => receives 0 for both if data not loaded yet
 *    => highlightFirstCol: Boolean, highlights first column if true
 *    => colorCode: Receives an array of strings, depending upon the first entry's value, all the mentioned fields are color coded. If any field is not found in headers data, it's skipped. If a field with first entry is not found, the second one is used as reference. Not beyond that.
 */

// Importing Modules
import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import uuidv4 from "uuid/v4";

// Declaring components
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.colorCodeArr = this.props.colorCode;
  }

  // checks val passed to it and returns color; if value can't be converted to number and it not zero, returns color
  // based on if the val passed doesn't include an alphabet and whether or not it has a minus sign;
  colorVal = (val) => {
    let color = "";

    // if val not passed or undefined received, reset color and return
    if(val === undefined){
      return color;
    }

    // if val passed is a valid number or if 0 is passed
    if(Number(val) || Number(val) === 0){
      color = val < 0 ? color = "has-text-danger" : "has-text-success";
    }
    // else if value passed is not a valid number and does not include any alphabet
    else if(!Number(val) && val.toString().search(/[A-Za-z]/) === -1){
      color = val.includes("-") ? "has-text-danger" : "has-text-success";
    }

    return color;
  }

  // checking if the reference head is included in the colorCodeArr
  checkColorCode = () => {

    let targetHead = "";

    // if headers don't exist, exit the function
    if(!this.props.headers) {
      return targetHead;
    };

    // if colorCodeArr exists and headers include 1st element of the array
    if(this.colorCodeArr && this.props.headers.includes(this.colorCodeArr[0])) {
      return this.colorCodeArr[0];
    }
    // else if the colorCodeArr exists and headers include 2nd element of the array
    else if(this.colorCodeArr && this.props.headers.includes(this.colorCodeArr[1])) {
      return this.colorCodeArr[1];
    }
    // else default case, return blank string for the target head
    return targetHead;
  }

  render() {
    // Extracting information from props
    let {headers, data, highlightFirstCol} = this.props;
    let tableCol1Class = highlightFirstCol ? "has-text-weight-bold" : "";
    // extracting colorVal function 
    let {colorVal, colorCodeArr} = this;
    // checking and updating the color code reference field for data passed
    let targetHead = this.checkColorCode();

    // Returning JSx
    return (
      <table className="table is-striped is-bordered margin-center margin-bottom-20px">
        <thead>
          <tr>
            {

              (function(){
                if(headers){
                  return headers.map((header) => {
                    let updatedHead = header.charAt(0).toUpperCase() + header.slice(1);
                    return(
                      <th key={uuidv4()}>{updatedHead}</th>
                    );
                  })
                }
                else if(!headers) return <th key={uuidv4()}></th>
              })()

            }
          </tr>
        </thead>
        <tbody>
            {

              (function(){

                if(data){
                  return data.map(val => {
                    
                    // calculating color code using the recently calculated reference field for each row, passing argument only if targethead exists
                    let colorCode = colorVal(targetHead === "" ? undefined : val[targetHead]);

                    return (
                      <tr key={uuidv4()}>
                        {headers.map((header, index) => {
                          
                          let isBold = index === 0 ? tableCol1Class : "";
                          let color = "";
                          
                          // if colorCodeArr includes the header, return the selected colorCode, otherwise a black string
                          color = colorCodeArr.includes(header) ? colorCode : "";

                          return (
                            <td className={isBold.toString() + color.toString()} key={uuidv4()}>{val[header]}</td>
                          );
                        })}
                      </tr>
                    );
                  })
                }
                else if(!data) return (<tr><td colSpan={headers.length}><a className="button is-loading">Loading</a></td></tr>);
              })()

            }
        </tbody>
      </table>
    );
  }
}


// Exporting Component
export default Table;
