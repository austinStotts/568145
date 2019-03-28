import React, { Component } from "react";

class TickBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 3
    }
    this.changeValue = this.changeValue.bind(this);
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
  }


  changeValue (value) {
    this.props.changeValue(value)
    this.setState({value: Number(value)}, () => {
    console.log(this.state.value)
    })
  }

  up () {
    if(this.refs.weightBox.value < 50) {
      this.changeValue(this.state.value + 1);
    }
  }

  down () {
    if(this.refs.weightBox.value > 0) {
      this.changeValue(this.state.value - 1);
    }
  }

  render () {
    return (
      <div>
        <button
          className={this.props.buttonClass}
          onClick={this.down}
        >{"<"}</button>
        <input 
          type="text" 
          ref="weightBox" 
          className={this.props.tickBoxClass}
          onChange={(e) => this.changeValue(e.target.value)}
          value={this.state.value}></input>
        <button
          className={this.props.buttonClass}
          onClick={this.up}
        >{">"}</button>
      </div>
    )
  }
}

export default TickBox;
