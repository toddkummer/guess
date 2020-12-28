import { MessageBoxController } from './message_box_controller.js'
import { ProgressBar } from './progress_bar.js'
import { Game } from './game.js'
import { OptionsController } from './options_controller.js'

/* global Stimulus */
class BoardController extends Stimulus.Controller {
  static get targets () {
    return ['instructions', 'guess', 'submit', 'previousGuesses', 'progressBar', 'reset']
  }

  static get values () {
    return {
      max: Number,
      guesses: Number
    }
  }

  get maximumNumber () {
    return parseInt(this.storage.getItem('maximumNumber') || this.maxValue)
  }

  set maximumNumber (value) {
    this.storage.setItem('maximumNumber', value)
  }

  get numberOfGuesses () {
    return parseInt(this.storage.getItem('numberOfGuesses') || this.guessesValue)
  }

  set numberOfGuesses (value) {
    this.storage.setItem('numberOfGuesses', value)
  }

  connect () {
    this.application.register('message-box', MessageBoxController)
    this.application.register('options', OptionsController)
    this.prepareBoard()
    this.start()
  }

  prepareBoard () {
    this.instructionsTarget.textContent = `We have selected a random number between 1 and ${this.maximumNumber}. Guess it in ${this.numberOfGuesses} turns or fewer to escape the T-Rex.`
    this.progressBar = new ProgressBar(this.progressBarTarget, this.numberOfGuesses)
    this.game = new Game(this.numberOfGuesses, this.maximumNumber)
  }

  addChild (customEvent) {
    const { name, controller } = customEvent.detail
    this[name] = controller
    controller.parent = this
  }

  start () {
    this.game.start()
    this.guessTarget.focus()
    this.progressBar.reset()
  }

  checkGuessOnEnter (e) {
    if (e.key === 'Enter') {
      this.checkGuess()
    }
  }

  checkGuess () {
    this.displayGuess()
    this.progressBar.increment()
    this.game.guessNumber(parseInt(this.userGuess))

    if (this.game.correct) {
      this.justRight()
    } else if (this.game.outOfGuesses) {
      this.tooManyGuesses(this.game.numberToGuess)
    } else {
      this.messageBox.wrong(this.game.guessesLeft, this.game.highOrLow)
    }

    this.resetUserGuessField()
  }

  reset () {
    this.previousGuessesTarget.textContent = ''
    this.toggleControls()
    this.messageBox.reset()
    this.start()
  }

  resetWithNewOptions () {
    this.prepareBoard()
    this.reset()
    if (this.guessTarget.classList.contains('is-hidden')) {
      this.toggleControls()
    }
  }

  get storage () {
    return window.localStorage
  }

  get userGuess () {
    return this.guessTarget.value
  }

  displayGuess () {
    if (this.previousGuessesTarget.textContent === '') {
      this.previousGuessesTarget.textContent = 'Guesses: '
    }
    this.previousGuessesTarget.textContent += this.userGuess + ' '
  }

  justRight () {
    this.messageBox.right()
    this._endGame()
  }

  tooManyGuesses (number) {
    this.messageBox.gameOver(number)
    this._endGame()
    new Audio('http://soundbible.com/grab.php?id=1748&type=mp3').play()
  }

  resetUserGuessField () {
    this.guessTarget.value = ''
    this.guessTarget.focus()
  }

  _endGame () {
    this.toggleControls()
    this.resetTarget.focus()
  }

  toggleControls () {
    this.guessTarget.classList.toggle('is-hidden')
    this.submitTarget.classList.toggle('is-hidden')
    this.resetTarget.classList.toggle('is-hidden')
  }
}

export { BoardController }
