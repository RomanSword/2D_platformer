export default class InputController {
  keys = {
    right: { pressed: false },
    left: { pressed: false },
    up: { pressed: false },
    down: { pressed: false }
  }

  constructor({ engine }) {
    this.engine = engine

    window.addEventListener('keydown', this.onKeyDownListener)
    window.addEventListener('keyup', this.onKeyUpListener)
  }

  onKeyDownListener = ({ key }) => {
    this.changePressedKey(key, true)
    this.engine.players.forEach((player) => player.onKeyDown(key))
  }

  onKeyUpListener = ({ key }) => {
    this.changePressedKey(key, false)
    this.engine.players.forEach((player) => player.onKeyUp(key))
  }

  changePressedKey = (key, value) => {
    if (key === 'ArrowRight') {
      this.keys.right.pressed = value
    } else if (key === 'ArrowLeft') {
      this.keys.left.pressed = value
    } else if (key === 'ArrowUp') {
      this.keys.up.pressed = value
    } else if (key === 'ArrowDown') {
      this.keys.down.pressed = value
    }
  }
}
