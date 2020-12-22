/* global Stimulus */
/* eslint-disable accessor-pairs */
export class MessageBoxController extends Stimulus.Controller {
  static get targets () {
    return ['header', 'body']
  }

  connect () {
    console.log('message box connect')
    this.element.dispatchEvent(new CustomEvent('connect', { detail: this }))
  }

  set header (value) {
    this.headerTarget.textContent = value
  }

  set body (value) {
    this.bodyTarget.textContent = value
  }

  wrong (guessesLeft, reason) {
    this.header = 'Wrong!'
    this.body = 'Your guess is ' + reason + '. You have ' + guessesLeft + ' guesses left.'
    this._unhide()
  }

  gameOver (number) {
    this.header = 'Game Over!'
    this.body = 'You are out of guesses. The number was ' + number + '. Dinner time for T-Rex!'
    this._unhide()
  }

  right () {
    this.header = 'Correct!'
    this.body = 'Congratulations! You got it right! No dinner for T-Rex.'
    this.element.classList.replace('is-danger', 'is-success')
    this._unhide()
  }

  reset () {
    this.element.classList.add('is-invisible')
    this.element.classList.replace('is-success', 'is-danger')
  }

  _unhide () {
    this.element.classList.remove('is-invisible')
  }
}
