import React, { Component } from "react";

import Color from "./color";

class Home extends Component {
  constructor (props) {
    super(props);

  }

  render () {
    return (
      <div className="home-wrapper">
        <h1 className="home-title">Paint Draw</h1>
        <div className="paint-wrapper">
          <button 
            className="paintdraw-home-button"
            onClick={() => this.props.changeShow("paintdraw")}
            >
            PaintDraw</button>
          <button 
            className="paintdrawpixel-home-button"
            onClick={() => this.props.changeShow("paintdrawpixel")}
            >
            PaintDraw Pixel</button>
        </div>
      </div>
    )
  }
}

export default Home;
