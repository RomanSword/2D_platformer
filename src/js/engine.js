import InputController from './inputController'
// import Player from './objects/player'
import Character from './objects/character'

export default class Engine {
  canvas = null
  players = null

  secondsCounter = 0

  constructor() {
    this.canvas = document.getElementById('canvas')
    this.canvas.width = 1024
    this.canvas.height = 576

    this.canvasContext = canvas.getContext('2d')
    this.inputController = new InputController({ engine: this })

    this.init()
  }

  init = () => {
    this.players = [
      // new Character({
      //   engine: this,
      //   position: { x: 100, y: 130 },
      //   state: 'stand',
      //   direction: 'right',
      //   isInputBlocked: true,
      // }),
      // new Character({
      //   engine: this,
      //   position: { x: 175, y: 130 },
      //   state: 'runStart',
      //   direction: 'right',
      //   isInputBlocked: true,
      // }),
      // new Character({
      //   engine: this,
      //   position: { x: 250, y: 130 },
      //   state: 'run',
      //   direction: 'right',
      //   isInputBlocked: true,
      // }),

      // new Character({
      //   engine: this,
      //   position: { x: 100, y: 260 },
      //   state: 'stand',
      //   direction: 'left',
      //   isInputBlocked: true,
      // }),
      // new Character({
      //   engine: this,
      //   position: { x: 175, y: 260 },
      //   state: 'runStart',
      //   direction: 'left',
      //   isInputBlocked: true,
      // }),
      // new Character({
      //   engine: this,
      //   position: { x: 250, y: 260 },
      //   state: 'run',
      //   direction: 'left',
      //   isInputBlocked: true,
      // }),
      new Character({
        engine: this,
        position: { x: 250, y: 390 },
        state: 'stand',
        direction: 'right',
        isInputBlocked: false,
      }),
    ]

    // Проблема в том, что персонаж не одного роста во всех спрайтах

    this.canvasContext.strokeStyle = 'red';
    this.canvasContext.lineWidth = 5;
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(100, 100);
    this.canvasContext.lineTo(250, 100);
    this.canvasContext.stroke();
  }

  animate = () => {
    requestAnimationFrame(this.animate)

    this.canvasContext.fillStyle = 'white'
    this.canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    this.players.forEach(player => player.update())
  }

  launch = () => {
    this.init()
    this.animate()
  }
}

const engineInstance = new Engine()

engineInstance.launch()
