import {UP,RIGHT_DIAGONAL_UP,RIGHT,RIGHT_DIAGONAL_DOWN,DOWN,LEFT_DIAGONAL_DOWN,LEFT,LEFT_DIAGONAL_UP} from './Commons'

class Sprite {
  x = 0
  y = 0
  scale = 1.0
  resource = ""
  constructor(resource){
    this.resource = resource
  }
  update(){
    //Using toFixed to limit number of decimals to one.
    this.scale = (this.scale - 0.1).toFixed(1)
    const positiveMovement = (1-this.scale).toFixed(1)
    const negativeMovement = -(1-this.scale).toFixed(1)
    switch (this.resource) {
      case UP:
        this.y = positiveMovement
        break
      case RIGHT_DIAGONAL_UP:
        this.x = positiveMovement
        this.y = positiveMovement
        break
      case RIGHT:
        this.x = positiveMovement
        break
      case RIGHT_DIAGONAL_DOWN:
        this.x = positiveMovement
        this.y = negativeMovement
        break
      case DOWN:
        this.y = negativeMovement
        break
      case LEFT_DIAGONAL_DOWN:
        this.x = negativeMovement
        this.y = negativeMovement
        break
      case LEFT:
        this.x = negativeMovement
        break
      case LEFT_DIAGONAL_UP:
        this.x = negativeMovement
        this.y = positiveMovement
        break
      default:
        break
    }
    console.log(this.x,this.y)
  }
}

export default Sprite
