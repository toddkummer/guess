import { MessageBoxController } from './message_box_controller.js'
import { ProgressBar } from './progress_bar.js'
import { Game } from './game.js'

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

  connect () {
    this.instructionsTarget.textContent = `We have selected a random number between 1 and ${this.maxValue}. Guess it in ${this.guessesValue} turns or fewer to escape the T-Rex.`
    this.application.register('message-box', MessageBoxController)
    this.progressBar = new ProgressBar(this.progressBarTarget, this.guessesValue)
    this.game = new Game(this.guessesValue, this.maxValue)
    this.start()
  }

  addMessageBox (customEvent) {
    this.messageBox = customEvent.detail.controller
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
