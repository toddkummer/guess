export class Game {
  constructor (guessesAllowed, maximumValue) {
    this.guessesAllowed = guessesAllowed
    this.maximumValue = maximumValue
  }

  start () {
    this.numberToGuess = Math.floor(Math.random() * this.maximumValue) + 1
    console.log('number to guess: ' + this.numberToGuess)
    this.guessesAttempted = 0
  }

  guessNumber (value) {
    this.currentGuess = value
    console.log('current guess: ' + value)
    this.guessesAttempted++
  }

  get guessesLeft () {
    return this.guessesAllowed - this.guessesAttempted
  }

  get correct () {
    return this.currentGuess === this.numberToGuess
  }

  get outOfGuesses () {
    return this.guessesAttempted === this.guessesAllowed
  }

  get highOrLow () {
    return this.currentGuess > this.numberToGuess ? 'too high' : 'too low'
  }
}
