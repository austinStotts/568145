import React, { Component } from "react";
import ReactDOM from "react-dom";

import Home from "./components/home";
import PaintDraw from "./components/paintdraw";
import PaintDrawPixel from "./components/paintdrawpixel";

// root component
class App extends Component {
  constructor() {
    super()
    this.state = {
      show: "home"
    }
    this.changeShow = this.changeShow.bind(this);
  }

  changeShow(value) {
    this.setState({show:value})
  }

  render () {
    if(this.state.show === "home") {
      return (
        <Home  changeShow={this.changeShow}/>
      )
    } else if (this.state.show === "paintdraw") {
      return (
        <PaintDraw changeShow={this.changeShow}/>
      )
    } else if (this.state.show === "paintdrawpixel") {
      return (
        <PaintDrawPixel/>
      )
    } else {

    }
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))