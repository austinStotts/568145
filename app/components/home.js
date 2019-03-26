import React, { Component } from "react";

class Home extends Component {
  constructor (props) {
    super(props);

  }

  render () {
    return (
      <div>
        <h1>home</h1>
        <div>
          <button 
            className="paintdraw-home-button"
            onClick={() => this.props.changeShow("paintdraw")}
            >
            PaintDraw</button>
          <button 
            className="paintdrawpixel-home-button"
            onClick={() => this.props.changeShow("paintdrawpixel")}
            >
            {`PaintDraw\n Pixel`}</button>
        </div>
      </div>
    )
  }
}

export default Home;
