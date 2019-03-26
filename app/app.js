import React, { Component } from "react";
import ReactDOM from "react-dom";

import PaintDraw from "./components/paintdraw";

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
        <div className="header-wrapper">
          <div className="paintdraw-wrapper">
            <PaintDraw 
              width={window.innerWidth - 65} 
              height={window.innerHeight - 350}
            />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))