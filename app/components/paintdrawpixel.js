import React, { PureComponent } from 'react';

import Color from "./color";

class PaintDrawPixel extends PureComponent {
  constructor() {
    super()

    this.state = {
      paint: false,
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255),
      m: 30,
      n: 30,
      cellSize: 20,
      canvasWidth: 600,
      canvasHeight: 600,
      matrix: '',
      x: 500,
      y: 500,
      style: "paint"
    }

    this.drawBoxes = this.drawBoxes.bind(this);
    this.colorCell = this.colorCell.bind(this);
    this.locate = this.locate.bind(this);
    this.paintWhite = this.paintWhite.bind(this);
    this.doubleClick = this.doubleClick.bind(this);
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.paint= this.paint.bind(this);
    this.createMatrix = this.createMatrix.bind(this);
    this.updateMatrix = this.updateMatrix.bind(this);
    this.fill = this.fill.bind(this);
    this.startFill = this.startFill.bind(this);
    this.locateIndex = this.locateIndex.bind(this);
  }

  fill (y, x) {
    if(this.state.matrix[y][x] === 0) this.colorCell({
      clientX: x * this.state.cellSize, 
      clientY: y * this.state.cellSize
    })

    if(x - 1 >= 0) this.fill(y, x-1);
    console.log(this.state.matrix)
  }

  startFill (e) {
    let cords = this.locateIndex(e.clientX, e.clientY);
    this.fill(cords[0], cords[1]);
  }

  createMatrix (x, y) {
    let matrix = new Array(x);
    for(let i = 0; i < y; i++) {
      matrix[i] = new Array(y).fill(0);
    }
    this.setState({ matrix });
  }

  updateMatrix (y, x) {
    this.setState((state) => {
      state.matrix[y][x] = '1'
      return state;
    })
  }

  locateIndex (x, y) {
    let newX;
    let newY;
    for(let i = 0; i < this.state.m + 1; i++) {
      if((i*this.state.cellSize - x) < 20) {
        newX = i*this.state.cellSize + -19;
      }
    }

    for(let i = 0; i < this.state.n + 1; i++) {
      if((i*this.state.cellSize - y) < 20) {
        newY = i*this.state.cellSize + -19;
      }
    }

    if(newX === 1) newX = 0;
    if(newY === 1) newY = 0;
    return [Math.floor(newY / this.state.cellSize) + 1, Math.floor(newX / this.state.cellSize) + 1]
  }

  locate (x, y) {
    let newX;
    let newY;
    for(let i = 0; i < this.state.m + 1; i++) {
      if((i*this.state.cellSize - x) < 20) {
        newX = i*this.state.cellSize + -19;
      }
    }

    for(let i = 0; i < this.state.n + 1; i++) {
      if((i*this.state.cellSize - y) < 20) {
        newY = i*this.state.cellSize + -19;
      }
    }

    if(newX === 1) newX = 0;
    if(newY === 1) newY = 0;
    this.updateMatrix(Math.floor(newY / this.state.cellSize), Math.floor(newX / this.state.cellSize));
    return [newX,newY];
  }

  paintWhite () {
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "white";
    c.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    this.drawBoxes();
  }

  // draw lines on canvas to represent canvas
  drawBoxes () {
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "black";
    for(let i = 1; i < this.state.m; i++) {
      c.fillRect(i * 20, 0, 1, this.state.canvasHeight);
    }
    for(let i = 1; i < this.state.n; i++) {
      c.fillRect(0, i * 20, this.state.canvasWidth, 1);
    }
  }

  paint (e) {
    if(this.state.paint) this.colorCell(e);
  }

  colorCell (e) {
    let cords = this.locate(e.clientX - 30, e.clientY - 30);
    let xW = 19;
    let yW = 19;
    if(cords[0] === 0) xW = 20;
    if(cords[1] === 0) yW = 20;
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`;
    c.fillRect(cords[0],cords[1],xW,yW);
  }

  doubleClick (e) {
    let cords = this.locate(e.clientX - 30, e.clientY - 30);
    let xW = 19;
    let yW = 19;
    if(cords[0] === 0) xW = 20;
    if(cords[1] === 0) yW = 20;
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "white";
    c.fillRect(cords[0],cords[1],xW,yW);
  }

  turnOn () {
    this.setState({paint:true});
  }

  turnOff () {
    this.setState({paint:false});
  }

  componentDidMount () {
    this.paintWhite();
    this.createMatrix(this.state.m, this.state.n);
  }

  render() {
    return (
      <div 
        className="paintdrawpixel-wrapper"
        onMouseMove={(e) => {this.setState({y:e.pageY + 5,x:e.pageX})}}
      >
        <h1
          style={{
            position: "absolute",
            top: `${this.state.y}px`,
            left: `${this.state.x}px`,
            fontSize: "10px",
          }}
        >{this.state.style}</h1>
        <div 
          className="paintdrawpixel-canvas"
          onMouseDown={this.turnOn}
          onClick={this.colorCell}
          onDoubleClick={this.doubleClick}
          onMouseUp={this.turnOff}
          onMouseMove={this.paint}
          onMouseLeave={this.turnOff}
          onMouseEnter={(e) => {window.scrollTo(0, 0)}}
        >
          <canvas id="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} style={{border:'1px solid black'}}></canvas>
        </div>
        <div className="paindrawpixel-color-wrapper">
          <Color changeColor={(val) => this.setState(val)} red={this.state.red} green={this.state.green} blue={this.state.blue}/>
        </div>
        <div className="paintdrawpixel-options">
          <button>eraser</button>
          <button>fill</button>
        </div>
      </div>
    )
  }
}

export default PaintDrawPixel;
