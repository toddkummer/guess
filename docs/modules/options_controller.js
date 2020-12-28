/* global Stimulus */
export class OptionsController extends Stimulus.Controller {
  static get targets () {
    return ['modal', 'maximumNumber', 'numberOfGuesses']
  }

  connect () {
    this.element.dispatchEvent(new CustomEvent('connect', { detail: { name: 'options', controller: this } }))
  }

  open () {
    this.maximumNumberTarget.value = this.parent.maximumNumber
    this.numberOfGuessesTarget.value = this.parent.numberOfGuesses
    this.modalTarget.classList.add('is-active')
    this.maximumNumberTarget.focus()
  }

  save () {
    this.parent.maximumNumber = this.maximumNumberTarget.value
    this.parent.numberOfGuesses = this.numberOfGuessesTarget.value
    this.close()
    this.parent.resetWithNewOptions()
  }

  close () {
    this.modalTarget.classList.remove('is-active')
    this.parent.guessTarget.focus()
  }

  captureEscapeAndEnter (event) {
    if (event.key === 'Escape') {
      this.close()
    } else if (event.key === 'Enter') {
      this.save()
      event.preventDefault()
    }
  }
}
