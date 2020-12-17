class ProgressBar {
    constructor(element) {
        this.bar = element;
    }

    set max(value) {
        this.bar.max = value;
    }

    increment() {
        if (this.bar.classList.contains('is-hidden')) {
            this.bar.classList.remove('is-hidden');
        }
        this.bar.value = this.bar.value + 1;

        const guessesLeft = this.bar.max - this.bar.value;
        if (guessesLeft < 3 && guessesLeft > 1) {
            this.warning();
        } else if (guessesLeft === 1) {
            this.danger();
        }
    }

    reset() {
        this.bar.value = 0;
        this.bar.classList.remove('is-warning', 'is-danger');
        this.bar.classList.add('is-success', 'is-hidden');
    }

    warning() {
        this.bar.classList.remove('is-success', 'is-danger');
        this.bar.classList.add('is-warning');
    }

    danger() {
        this.bar.classList.remove('is-success', 'is-warning');
        this.bar.classList.add('is-danger');
    }
}


class Board {
    constructor(parentElement) {
        this.instructions = parentElement.querySelector('.instructions');
        this.guesses = parentElement.querySelector('.guesses');
        this.lastResult = parentElement.querySelector('.lastResult');
        this.lowOrHi = parentElement.querySelector('.lowOrHi');
        this.progressBar = new ProgressBar(parentElement.querySelector('progress'));

        this.guessSubmit = parentElement.querySelector('.guessSubmit');
        this.guessField = parentElement.querySelector('.guessField');
        this.guessField.focus();

        this.message = parentElement.querySelector('.message');
        this.messageTitle = parentElement.querySelector('.message-header p');
        this.messageBody = parentElement.querySelector('.message-body');

        this.resetButton = parentElement.querySelector('.resetButton');
    }

    setup(options) {
        this.progressBar.max = options['guesses'];
        this.instructions.textContent = `We have selected a random number between 1 and ${options['max_value']}. Guess it in ${options['guesses']} turns or fewer to escape the T-Rex.`
    }

    get userGuess() {
        return Number(this.guessField.value);
    }
    resetUserGuessField() {
        this.guessField.value = '';
        this.guessField.focus();
    }

    displayGuess(guess) {
        if (this.guesses.textContent === '') {
            this.guesses.textContent = 'Guesses: ';
        }
        this.guesses.textContent += guess + ' ';
        this.progressBar.increment();
    }

    tooHigh(guessesLeft) {
        this._sayWrong(guessesLeft, 'too high');
    }
    tooLow(guessesLeft) {
        this._sayWrong(guessesLeft, 'too low');
    }
    justRight() {
        this._sayMessage('Correct!', 'Congratulations! You got it right! No dinner for T-Rex.')
        this.message.classList.replace('is-danger', 'is-success');
        this.lowOrHi.textContent = '';
        this._endGame();
    }
    tooManyGuesses(number) {
        this._sayMessage('Game Over!', 'You are out of guesses. The number was ' + number + '. Dinner time for T-Rex!')
        this._endGame();
        new Audio('http://soundbible.com/grab.php?id=1748&type=mp3').play();
    }

    reset(){
        this.guesses.textContent = '';
        this.lastResult.textContent = '';
        this.lowOrHi.textContent = '';
        this.progressBar.reset();
        this.resetButton.classList.add('is-hidden');
        this.message.classList.add('is-hidden');
        this.message.classList.replace('is-success', 'is-danger');

        this.guessField.classList.remove('is-hidden');
        this.guessSubmit.classList.remove('is-hidden');
        this.resetUserGuessField();
    }

    _sayWrong(guessesLeft, message) {
        this._sayMessage('Wrong!', 'Your guess is ' + message + '. You have ' + guessesLeft + ' guesses left.')
    }

    _sayMessage(title, body) {
        this.messageTitle.textContent = title;
        this.messageBody.textContent = body;
        this.message.classList.remove('is-hidden');
    }

    _endGame(){
        this.guessField.classList.add('is-hidden');
        this.guessSubmit.classList.add('is-hidden');
        this.resetButton.classList.remove('is-hidden');
        this.resetButton.focus();
    }
}

export { Board }