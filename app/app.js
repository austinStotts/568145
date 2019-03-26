import React, { Component } from "react";
import ReactDOM from "react-dom";

// root component
class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render () {
    return (
      <div className="main-wrapper">
        <div className="header-wrapper">hi</div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))