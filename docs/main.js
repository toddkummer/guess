import { Board } from './modules/board.js'
import { Game } from './modules/game.js'

new Game(new Board(document),
    { max_value: 200,
        guesses: 7 }
);
