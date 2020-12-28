import { Game } from '../../docs/modules/game.js'

describe('Game', () => {
  const game = new Game(3, 10)
  game.start()
  game.numberToGuess = 3

  it('is too low', () => {
    game.guessNumber(2)
    expect(game.highOrLow).toEqual('too low')
    expect(game.correct).toBe(false)
  })

  it('is too high', () => {
    game.guessNumber(4)
    expect(game.highOrLow).toEqual('too high')
    expect(game.correct).toBe(false)
  })

  it('not out of guesses', () => {
    expect(game.outOfGuesses).toBe(false)
  })

  it('correct', () => {
    game.guessNumber(3)
    expect(game.correct).toBe(true)
  })

  it('out of guesses', () => {
    expect(game.outOfGuesses).toBe(true)
  })
})
