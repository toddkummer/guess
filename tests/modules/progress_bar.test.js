import '@testing-library/jest-dom'
import { ProgressBar } from '../../docs/modules/progress_bar'

describe('ProgressBar', () => {
  const element = document.createElement('progress', { class: 'is-invisible is-success' })
  element.classList.add('is-invisible')
  element.classList.add('is-success')
  const progressBar = new ProgressBar(element, 4)

  it('invisible to start', () => {
    expect(element).toHaveClass('is-invisible')
  })

  describe('increment', () => {
    beforeAll(() => progressBar.increment())

    it('becomes visible', () => expect(element).not.toHaveClass('is-invisible'))
    it('increments value', () => expect(element.value).toBe(1))
    it('is success', () => expect(element).toHaveClass('is-success'))
    it('is not warning', () => expect(element).not.toHaveClass('is-warning'))
    it('is not danger', () => expect(element).not.toHaveClass('is-danger'))
  })

  describe('two guesses left', () => {
    beforeAll(() => progressBar.increment())

    it('is not success', () => expect(element).not.toHaveClass('is-success'))
    it('is warning', () => expect(element).toHaveClass('is-warning'))
    it('is not danger', () => expect(element).not.toHaveClass('is-danger'))
  })

  describe('one guess left', () => {
    beforeAll(() => progressBar.increment())

    it('is not success', () => expect(element).not.toHaveClass('is-success'))
    it('is not warning', () => expect(element).not.toHaveClass('is-warning'))
    it('is danger', () => expect(element).toHaveClass('is-danger'))
  })

  describe('reset', () => {
    beforeAll(() => progressBar.reset())
    it('is invisible', () => expect(element).toHaveClass('is-invisible'))
    it('is success', () => expect(element).toHaveClass('is-success'))
    it('is not warning', () => expect(element).not.toHaveClass('is-warning'))
    it('is not danger', () => expect(element).not.toHaveClass('is-danger'))
  })
})
