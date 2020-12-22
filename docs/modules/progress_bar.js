export class ProgressBar {
  constructor (element, max) {
    this.bar = element
    this.bar.max = max
  }

  increment () {
    if (this.bar.classList.contains('is-invisible')) {
      this.bar.classList.remove('is-invisible')
    }
    this.bar.value = this.bar.value + 1

    const guessesLeft = this.bar.max - this.bar.value
    if (guessesLeft < 3 && guessesLeft > 1) {
      this.warning()
    } else if (guessesLeft === 1) {
      this.danger()
    }
  }

  reset () {
    this.bar.value = 0
    this.bar.classList.remove('is-warning', 'is-danger')
    this.bar.classList.add('is-success', 'is-invisible')
  }

  warning () {
    this.bar.classList.remove('is-success', 'is-danger')
    this.bar.classList.add('is-warning')
  }

  danger () {
    this.bar.classList.remove('is-success', 'is-warning')
    this.bar.classList.add('is-danger')
  }
}
