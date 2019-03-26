import React, { Component } from "react";

class PaintDraw extends Component {
  constructor (props) {
    super(props);
    this.state = {
      draw: false,
      x: '',
      y: '',
      undo: [],
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
      canvas.strokeStyle = this.props.color;
      canvas.lineCap = 'round';
      canvas.lineJoin = 'round';
      canvas.lineWidth = this.props.weight;
      canvas.moveTo(this.state.x - 30, this.state.y - 30);
      canvas.lineTo(event.clientX - 30, event.clientY - 30);
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
      <div style={{width:'100%',height:'100%'}}>
        <div className="paintdraw-canvas-wrapper">
          <canvas
            id="canvas"
            className="paintdraw-canvas"
            ref="canvas" 
            key={this.props.clear}
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
            width={this.props.width} 
            height={this.props.height} 
            >
          </canvas>
        </div>
        <div className="below">
          <div className="download">
            <a 
              className="function" 
              id="download" 
              onClick={this.download} 
              href={this.state.url} 
              style={{display:'block'}}
            >
              {'download'}
            </a>
            <a 
              className="function" 
              onClick={this.undo}
            >
              {'undo'}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default PaintDraw;
