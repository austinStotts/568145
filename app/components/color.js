import React, { Component } from "react";

class Color extends Component {
  constructor (props) {
    super(props);
    this.state = {
      red: this.props.red,
      green: this.props.green,
      blue: this.props.blue,
      color: `rgb(${this.props.red}, ${this.props.green}, ${this.props.blue})`,
    }

    this.red = this.red.bind(this);
    this.green = this.green.bind(this);
    this.blue = this.blue.bind(this);
  }

  red (e) {
    this.props.changeColor({
      red: e.target.value
    })
    this.setState({
      red: e.target.value
    })
  }

  green (e) {
    this.props.changeColor({
      green: e.target.value
    })
    this.setState({
      green: e.target.value
    })
  }

  blue (e) {
    this.props.changeColor({
      blue: e.target.value
    })
    this.setState({
      blue: e.target.value
    })
  }

  render () {
    return (
      <div className="color-wrapper">
        <input 
          className="red-slider" 
          min="1"
          max="255"
          value={this.props.red}
          onChange={this.red}
          type="range"></input>
        <p className="color-label-red">R</p>
        <br></br>
        <input 
          className="green-slider" 
          min="1"
          max="255"
          value={this.props.green}
          onChange={this.green}
          type="range"></input>
        <p className="color-label-green">G</p>
        <br></br>
        <input 
          className="blue-slider" 
          min="1"
          max="255"
          value={this.props.blue}
          onChange={this.blue}
          type="range"></input>
        <p className="color-label-blue">B</p>
        <br></br>
        <div style={{
          display: "inline-block",
          width: "220px",
          height: "110px",
          backgroundColor: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`,
          border: "1px solid black",
          borderRadius: "4px",
        }} className="color-swab"></div>
      </div>
    )
  }
}

export default Color;