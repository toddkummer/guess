class Game {
    constructor(board, options) {
        options = Object.assign({ max_value: 100, guesses: 10 }, options)

        this.board = board;
        this.board.guessSubmit.addEventListener('click', this.checkGuess.bind(this), false);
        this.board.guessField.addEventListener('keypress', function(e) {
            if(e.key == 'Enter') {
                this.checkGuess();
            }
        }.bind(this))
        this.board.resetButton.addEventListener('click', this.reset.bind(this), false);

        this.board.setup(options);
        this.numberOfGuesses = options['guesses'];
        this.maxValue = options['max_value'];
        this.start();
    }

    start(){
        this.number = Math.floor(Math.random() * this.maxValue) + 1;
        this.guessCount = 1;
    }

    checkGuess(){
        const userGuess = this.board.userGuess;
        this.board.displayGuess(userGuess);

        if (userGuess === this.number) {
            this.board.justRight();
        } else if (this.guessCount === this.numberOfGuesses) {
            this.board.tooManyGuesses(this.number);
        } else {
            const guessesLeft = this.numberOfGuesses - this.guessCount;
            if(userGuess < this.number) {
                this.board.tooLow(guessesLeft);
            } else if(userGuess > this.number) {
                this.board.tooHigh(guessesLeft);
            }
        }

        this.guessCount++;
        this.board.resetUserGuessField();
    }

    reset(){
        this.board.reset();
        this.start();
    }
}

export { Game }