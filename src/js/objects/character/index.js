import getSprites from './sprites'


/*
  state - состояния: stand, run
  direction - направление: right, left
*/
export default class Character {
  frameCounter = 0
  speed = 10

  sprites = []
  sprite = null

  defaultState = 'stand'
  isLoading = false
  isAnimationReverse = false

  ms = 0

  constructor({
    engine = {},
    position = { x: 250, y: 200 },
    state = 'stand',
    direction = 'right',
    isInputBlocked = false
  }) {
    this.engine = engine
    this.position = position
    this.state = state
    this.direction = direction
    this.isInputBlocked = isInputBlocked

    this.initSprites()
  }

  initSprites = async () => {
    this.isLoading = true
    this.sprites = await getSprites()
    this.isLoading = false
  }

  turnRight = () => {
    this.direction = 'right'
  }

  turnLeft = () => {
    this.direction = 'left'
  }

  runStart = () => {
    this.state = 'runStart'
  }

  run = () => {
    this.state = 'run'
  }

  stand = () => {
    this.state = 'stand'
    this.isAnimationReverse = false
  }

  setDefaultState = () => {
    this.state = this.defaultState
    this.isAnimationReverse = false
  }

  get isAnimationEnded() {
    return this.frameCounter === this.sprites[this.direction][this.state].frames
  }

  get isAnimationReversible() {
    const sprite = this.sprites[this.direction][this.state]

    if (sprite.lastReverseFrame === null) {
      return false
    }

    return this.frameCounter <= sprite.lastReverseFrame
  }

  // Задваивающаяся анимация runStart как-то связана с isAnimationEnded
  // Чтобы избежать задвоений переключение между состоянями должно производиться
  // в draw методе, Он вызывается чаще чем onKeyDown

  onKeyDown = key => {
    if (this.isInputBlocked || this.isAnimationReverse) {
      return
    }

    console.log('-----------------------');

    if (this.state === 'stand') {
      if (key === 'ArrowRight') {
        this.turnRight()
        this.runStart()
      } else if (key === 'ArrowLeft') {
        this.turnLeft()
        this.runStart()
      }
      
      this.frameCounter = 0
      return
    }

    if (this.state === 'run') {
      return
    }
  }

  onKeyUp = key => {
    if (this.isInputBlocked) {
      return
    }

    if (this.state === 'runStart' && !this.isAnimationEnded && this.isAnimationReversible) {
      this.isAnimationReverse = true
      return
    }

    this.stand()
    this.frameCounter = 0
  }

  draw = () => {
    const sprite = this.sprites[this.direction][this.state]
    
    if (this.ms % sprite.fpms === 0) {
      if (this.frameCounter === sprite.frames) {
        this.frameCounter = 0
      } else if (this.isAnimationReverse) {
        this.frameCounter -= 1

        if (this.frameCounter <= 0) {
          this.setDefaultState()
        }
      } else {
        this.frameCounter += 1
      }
    }

    if (this.state === 'runStart' && this.isAnimationEnded) {
      this.run()
    }

    this.drawImage(sprite)
  }

  drawImage = ({ image, width, scaleMultiplier }) => {
    /*
    АРГУМЕНТЫ:
      - изображение
      - X координата для угла фрагмента, который будет вырезан
      - Y координата для угла фрагмента, который будет вырезан
      - ширина фрагмента, который будет вырезан
      - высота фрагмента, который будет вырезан
      - X координата, в которую будет помещен фрагмент
      - Y координата, в которую будет помещен фрагмент
      - ширина, под которую нужно растянуть фрагмент
      - высота, под которую нужно растянуть фрагмент
    */
    this.engine.canvasContext.drawImage(
      image,
      width * this.frameCounter,
      0,
      width,
      image.height,
      this.position.x - width / 2,
      this.position.y,
      width * scaleMultiplier,
      image.height * scaleMultiplier
    )
  }

  update = () => {
    if (!this.isLoading) {
      this.draw()
      this.updateMs()
    }
  }

  updateMs = () => {
    this.ms += 1

    if (this.ms === 1000) {
      this.ms = 0
    }
  }
}
