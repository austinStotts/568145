import React, { Component } from "react";

import TickBox from "./tickbox";
import Color from "./color";

// todo:
// * remake socketio to update canvas data
// * add clear canvas function


class PaintDraw extends Component {
  constructor (props) {
    super(props);
    this.state = {
      draw: false,
      x: '',
      y: '',
      red: Math.floor(Math.random() * 255), // red value for canvas
      green: Math.floor(Math.random() * 255), // green value for canvas
      blue: Math.floor(Math.random() * 255), // blue value for canvas
      weight: "3",
      undo: [], // FILO data structure to hold the last 20 canvas'
      image: '',
      room: '',
      current: 'home'
    }

    this.draw = this.draw.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
    this.download = this.download.bind(this);
    this.save = this.save.bind(this);
    this.undo = this.undo.bind(this);
    // this.update = this.update.bind(this);
    // this.room = this.room.bind(this);
    // this.join = this.join.bind(this);
    // this.newRoom = this.newRoom.bind(this);
    // this.check = this.check.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.changeWeight = this.changeWeight.bind(this);
  }

  changeWeight (value) {
    this.setState({weight: value})
  }

  start (event) {
    this.setState({
      draw:true,
      x: event.clientX,
      y: event.clientY,
    })
  }

  end () {
    this.setState({draw:false})
  }

  save () {
    let canvas = document.getElementById('canvas');
    if(this.state.undo.length <= 20) {
      let undo = [...this.state.undo];
      createImageBitmap(canvas,0,0,canvas.width,canvas.height)
      .then(data => {
        undo.push(data);
        this.setState({undo});
      })
    }
    else {
      let undo = [...this.state.undo];
      undo.shift();
      createImageBitmap(canvas,0,0,canvas.width,canvas.height)
      .then(data => {
        undo.push(data);
        this.setState({undo});
      })
    }
  }

  undo () {
    let undo = [...this.state.undo];
    if(undo.length > 0) {
      let data = undo.pop();
      this.setState({undo});
      let canvas = this.refs.canvas.getContext('2d');
      canvas.clearRect(0,0,2000,2000);
      canvas.drawImage(data,0,0);
      this.send();
    }
  }

  send () {
    const canvas = document.getElementById('canvas');
    this.socket.emit('update', {
      image: canvas.toDataURL(),
      room: this.state.current
    });
  }

  update (data) {
    let canvas = this.refs.canvas.getContext('2d');
    let img = new Image();
    img.onload = function () {
      //canvas.clearRect(0,0,2000,2000);
      canvas.drawImage(this, 0, 0);
    }
    img.src = data;
  }

  download () {
    let canvas = document.getElementById('canvas');
    let el = document.getElementById('download');
    this.setState({url:canvas.toDataURL('image/jpeg', 1.0)});
    el.setAttribute('download', 'myPrettyPicture:)');
  }

  draw (event) {
    if(this.state.draw) {
      const canvas = this.refs.canvas.getContext('2d');
      canvas.beginPath();
      canvas.strokeStyle = `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`;
      canvas.lineCap = 'round';
      canvas.lineJoin = 'round';
      canvas.lineWidth = this.state.weight;
      canvas.moveTo(this.state.x - 30, this.state.y - 58);
      canvas.lineTo(event.clientX - 30, event.clientY - 58);
      canvas.stroke();
      canvas.closePath();
      this.setState({x:event.clientX,y:event.clientY});
    }
  }

  handleKeyDown (e) {
    if(e === 90) {
      this.undo()
    }
  }

  componentDidMount () {
    this.refs.canvas.tabIndex = 1000
  }




  render () {
    return (
      <div className="paintdraw-wrapper">
        <button 
          className="home-button"
          onClick={() => this.props.changeShow("home")}
        >home</button>
        <div className="paintdraw-canvas-wrapper">
          <canvas
            id="canvas"
            className="paintdraw-canvas"
            ref="canvas" 
            onMouseDown={(event)=>{
              this.start(event);
              this.save();
            }}
            onMouseMove={this.draw} 
            onMouseUp={()=> {
              this.end();
              //this.send();
            }} 
            onMouseLeave={this.end}
            onKeyDown={e => this.handleKeyDown(e.keyCode)}
            width={window.innerWidth - 65} 
            height={window.innerHeight - 350}
            >
          </canvas>
        </div>
        <div className="below">
          <div className="paintdraw-options-bar">
            <a 
              className="download-button" 
              id="download" 
              onClick={this.download} 
              href={this.state.url} 
            >
              {'download'}
            </a>
            <a 
              className="undo-button" 
              onClick={this.undo}
            >
              {'undo'}
            </a>
          </div>
        </div>
        <div className="paintdraw-color-wrapper">
          <h3 className="color-label">color</h3>
          <Color changeColor={(val) => this.setState(val)} red={this.state.red} green={this.state.green} blue={this.state.blue}/>
        </div>
        <div className="weight-wrapper">
          <h3 className="brush-size">brush size</h3>
          <TickBox 
            buttonClass="weight-buttons" 
            tickBoxClass="weight-input" 
            changeValue={this.changeWeight}
          />
        </div>
      </div>
    )
  }
}

export default PaintDraw;
