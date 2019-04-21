import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import { Stage, Layer, Text } from 'react-konva';

import './App.css';
import ParticleModel from './particles/ParticleModel'
import ParticleHandler from './particles/ParticleHandler'
import ColoredCircle from './components/ColoredCircle'

const primaryColor = '#2979FF'
const disabledColor = '#e6e6e6'

class App extends Component {

  constructor(){
    super()
    this.init()
    this.state={
      spritePool: this.particleHandler.spritePool,
      movementFactor:200,
      currentScale:1.0,
      activeState: 'paused'
    }
  }

  init = () => {
    this.particleModel = new ParticleModel()
    this.particleHandler = new ParticleHandler()
    this.particleHandler.setup(8,this.particleModel,0,0)
  }

  reset = () => {
    this.init()
    this.setState({
      spritePool: this.particleHandler.spritePool,
      movementFactor:200,
      currentScale:1.0,
      activeState: 'paused'
    })
  }

  componentDidMount() {
    //This interval simulate and update requirement every 1 sec.
    this.interval = setInterval(() =>{
      if(!this.particleHandler.over()){
        this.particleHandler.update()
        this.setState({
          spritePool: this.particleHandler.spritePool,
          currentScale: this.particleHandler.spritePool[0].scale
        })
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startOrContinueParticlesMovement = () => {
    this.particleHandler.start()
    this.setState({
      activeState:'resumed'
    })
  }

  pauseParticlesMovement = () => {
    this.particleHandler.stop()
    this.setState({
      activeState:'paused'
    })
  }

  factorChanged = (event) => {
    console.log(event.target.value)
    const valueNumber = Number(event.target.value)
    if(isNaN(valueNumber)){
      this.setState({
        movementFactor:1
      })
      return
    }
    this.setState({
      movementFactor:valueNumber
    })
  }

  render() {
    const particlesCircles = this.state.spritePool.map(sprite => {
      return (
        <ColoredCircle x={sprite.x*this.state.movementFactor} y={sprite.y*this.state.movementFactor}/>
      )
    })
    return (
      <div>
        <Row vertical='center' horizontal='spaced' flexGrow={1} style={styles.toolsContainer}>
          <Row flexGrow={1}>
            <Row vertical='center' horizontal='spaced' style={styles.rowStyle}>
              <a href="#" onClick={() => {this.startOrContinueParticlesMovement()}} className="toolButton" style={{backgroundColor:this.state.activeState === 'paused' ? primaryColor : disabledColor}}>Start/Resume</a>
            </Row>
            <Row vertical='center' horizontal='spaced'>
              <a href="#" onClick={() => {this.pauseParticlesMovement()}} className="toolButton" style={{backgroundColor:this.state.activeState === 'resumed' ? primaryColor : disabledColor}}>Pause</a>
            </Row>
            <Row vertical='center' horizontal='spaced' style={styles.rowStyle}>
              <span>Movement factor:</span>
            </Row>
            <Row vertical='center' horizontal='spaced'>
              <input type="number" value={this.state.movementFactor} onChange={this.factorChanged}/>
            </Row>
            <Row vertical='center' horizontal='spaced' style={styles.rowStyle}>
              <span>Scale: {this.state.currentScale}</span>
            </Row>
          </Row>
          <Row vertical='center' horizontal='end' style={{marginRight:20}}>
            <a href="#" onClick={() => {this.reset()}} className="toolButton" style={{backgroundColor:primaryColor}}>Reset</a>
          </Row>
        </Row>
          <Stage width={window.innerWidth} height={window.innerHeight} x={window.innerWidth/2} y={window.innerHeight/2} style={styles.canvasStyle}>
            <Layer>
              {particlesCircles}
            </Layer>
          </Stage>
      </div>
    );
  }
}
const styles={
  toolsContainer:{
    height: 40,
  },
  rowStyle:{
    marginLeft: 20
  },
  canvasStyle:{
    backgroundColor:disabledColor,
    marginLeft: 20,
    marginRight: 20
  }
}

export default App;
