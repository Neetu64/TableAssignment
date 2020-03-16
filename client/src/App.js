import React from 'react';
import './App.css';
import './upload.css';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delimiterValue: ",",
      data: [],
      totalRows: 2,
      displayRows: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => {
        res = res.trim() + '\n';
        let rowArrays = [];
        let response = res;
        let count = response.indexOf("\n");
        while (count !== -1) {
          rowArrays.push(response.substring(0, count));
          response = response.substring(count + 1, response.length);
          count = response.indexOf("\n");
        }
        this.setState({ data: rowArrays, displayRows: rowArrays.slice(0, this.state.totalRows) });
      });
  }

  handleDelimiterChange = (event) => {
    this.setState({ delimiterValue: event.target.value });
  }

  handleRowChange = (event) => {
    const obj = {
      totalRows: event.target.value
    }
    if (event.target.value >= 2) {
      obj.displayRows = this.state.data.slice(0, event.target.value);
    }
    this.setState(obj);
  }

  render() {
    const { delimiterValue, totalRows, displayRows } = this.state
    return (
      <div className="App" >
      <h1 style={{'color': 'Green'}}>File Upload</h1>
        <div className="upload">
        <label style={{'width': '125px', 'color': 'blue'}}>Delimilter</label>
        <input type="text" onChange={this.handleDelimiterChange} value={delimiterValue} /><span></span>
        <label style={{'width': '125px', 'color': 'blue'}}>Columns</label>
        <input type="text" onChange={this.handleRowChange} value={totalRows} />
       </div>
        <div><br/><br/>
        <h2 style={{'color': 'Green'}}>Results</h2>
          <table className="table">
            {displayRows.map((row) => {
              return <tr>{row.split(delimiterValue).map((column) => {
                return <td>{column}</td>
              })}</tr>
            })} 
          </table>
        </div>
      </div>
    );
  }
}
