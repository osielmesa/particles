import Sprite from './Sprite'
import{directionsArray} from "./Commons";

class ParticleHandler{
  spritePool = []
  particleModel = {}
  x = 0
  y = 0

  setup (numParticles , particleModel, center_x, center_y){
    let directions = [...directionsArray]
    let directionsIndex = 0
    for(let n = 0;n<numParticles; n++){
      let sprite = new Sprite(directions[directionsIndex])
      this.spritePool.push(sprite)
      if(directionsIndex === 7){
        directionsIndex = 0
      }else{
        directionsIndex ++;
      }
    }
    this.particleModel = particleModel
    this.particleModel.setup(this.spritePool,center_x,center_y)
    this.x = center_x
    this.y = center_y
  }
  start(){
    this.particleModel.start()
  }
  stop(){
    this.particleModel.stop()
  }
  update(){
    this.particleModel.update()
  }
  over(){
    return this.particleModel.over()
  }
}

export default ParticleHandler
