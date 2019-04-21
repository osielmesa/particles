
class ParticleModel {
  spritePool = []

  setup (spritePool, center_x, center_y){
    this.spritePool = spritePool
    for(let n = 0;n<this.spritePool.length;n++){
      this.spritePool[n].x = center_x
      this.spritePool[n].y = center_y
    }
  }
  start(){
    this.started = true
  }
  stop(){
    this.started = false
  }
  update(){
    if(this.started){
      for(let n = 0;n<this.spritePool.length;n++){
        this.spritePool[n].update()
      }
    }
  }
  over(){
    let countCompletedSprites = 0
    for(let n = 0;n<this.spritePool.length;n++){
      if(this.spritePool[n].scale === 0.1.toFixed(1)){
        countCompletedSprites ++;
      }
    }
    return countCompletedSprites === this.spritePool.length
  }
}

export default ParticleModel
