import { writable, type Subscriber, type Unsubscriber, type Writable } from "svelte/store";

import { SUPPORTED_KEYS } from "../constants";

export default class Game {
    /**
     * The correct solution for this game.
     */
    private _answer: string;

    /**
     * The state of the entire board.
     */
    private _board: string[][] = [];

    /**
     * The number of characters that the words can be for this game.
     */
    private _characters: number;

    /**
     * Character (col) of the current guess we're on.
     */
    private _currentChar: number = 0;

    /**
     * The current guess (row) we're on.
     */
    private _currentGuess: number = 0;

    /**
     * Whether or not the game has ended (on winning or running out of guesses).
     */
    private _gameOver: boolean = false;

    /**
     * The number of guesses the player can make during this game.
     */
    private _guesses: number;

    /**
     * Whether or not the player has guessed the correct answer.
     */
    private _hasWon: boolean = false;

    /**
     * The most recently submitted guess.
     */
    private _lastGuess: string = "";

    /**
     * The writable store so Svelte components can subscribe to this class's properties.
     */
    private _store: Writable<Game>;

    /**
     * The list of characters that have been used.
     */
    private _usedCharacters: Set<string> = new Set<string>();

    constructor(guesses: number, characters: number, answer: string) {
        if (answer.length !== characters) {
            throw new RangeError(`Answer does not match ${characters} characters.`);
        }

        this._answer = answer;
        this._characters = characters;
        this._guesses = guesses;

        this.clearBoard();

        this._store = writable(this);
    }

    public get answer(): string {
        return this._answer;
    }

    public get board(): string[][] {
        return this._board;
    }

    public get guess(): number {
        return this._currentGuess + 1;
    }

    public get lastGuess(): string {
        return this._lastGuess;
    }

    public get usedCharacters(): Set<string> {
        return this._usedCharacters;
    }

    /**
     * Attempt to insert the character in the guess.
     *
     * @param key
     */
    public keyPressed(key: string): void {
        if (!SUPPORTED_KEYS.includes(key)) {
            return;
        }

        if (this._gameOver || this._hasWon) {
            return;
        }

        if (key === "Backspace") {
            this.backspacePressed();
            return;
        }

        if (key === "Enter") {
            this.enterPressed();
            return;
        }

        if (this._currentChar >= this._characters) {
            return;
        }

        this.updateGuess(this._currentGuess, this._currentChar, key);
        this._currentChar++;

        this._store.set(this);
    }

    /**
     * The subscribe method so Svelte can make class properties reactive.
     *
     * @param subscriber
     */
    public subscribe(subscriber: Subscriber<Game>): Unsubscriber {
        return this._store.subscribe(subscriber);
    }

    /**
     * Attempt to insert a space back at the current character.
     */
    private backspacePressed(): void {
        if (this._currentChar === 0) {
            return;
        }

        this._currentChar--;
        this.updateGuess(this._currentGuess, this._currentChar, " ");

        this._store.set(this);
    }

    /**
     * Sets the board and every tile back to empty.
     */
    private clearBoard(): void {
        const emptyBoard: string[][] = [];

        for (let row = 0; row < this._guesses; row++) {
            emptyBoard[row] = [];

            for (let col = 0; col < this._characters; col++) {
                emptyBoard[row][col] = " ";
            }
        }

        this._board = emptyBoard;
    }

    /**
     * Attempt to submit the current guess if all characters have been input.
     */
    private enterPressed(): void {
        if (this._currentChar < this._characters) {
            return;
        }

        this.submitGuess();
        this._store.set(this);
    }

    /**
     * Submit and process the guess and determine if we've won.
     */
    private submitGuess(): void {
        this._board[this._currentGuess].forEach((letter) => {
            this._usedCharacters.add(letter);
        });

        this._lastGuess = this._board[this._currentGuess].join("");

        // We won!
        if (this._lastGuess === this._answer) {
            this._hasWon = true;
            this._gameOver = true;
            console.log("WINNER");
            return;
        }

        this._currentGuess++;
        this._currentChar = 0;

        // Ran out of guesses. :(
        if (this._currentGuess >= this._guesses) {
            this._gameOver = true;
            console.log("GAME OVER");
        }
    }

    /**
     * Insert the given character at the given guess and character.
     *
     * @param row
     * @param col
     * @param value
     */
    private updateGuess(row: number, col: number, value: string): void {
        this._board[row][col] = value;
    }
}
