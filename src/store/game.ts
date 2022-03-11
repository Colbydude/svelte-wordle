import { writable, type Subscriber, type Unsubscriber, type Writable } from "svelte/store";

import { SUPPORTED_KEYS } from "../constants";
import { dictionary } from "../game/words";
import { EvaluationStatus, GameState } from "../types";

export default class Game {
    static readonly CONTEXT_KEY = "game";

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
    private _currentChar = 0;

    /**
     * The current guess (row) we're on.
     */
    private _currentGuess = 0;

    /**
     * Evaluation status of each tile on the board.
     */
    private _evaluations: EvaluationStatus[][] = [];

    /**
     * The evaluation status of a given letter. For keeping track of the keys on the keyboard.
     */
    private _letterEvaluations: Map<string, EvaluationStatus>;

    /**
     * The current game state.
     */
    private _gameState: GameState = GameState.InProgress;

    /**
     * The number of guesses the player can make during this game.
     */
    private _guesses: number;

    /**
     * The writable store so Svelte components can subscribe to this class's properties.
     */
    private _store: Writable<Game>;

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

    public get characters(): number {
        return this._characters;
    }

    public get evaluations(): EvaluationStatus[][] {
        return this._evaluations;
    }

    public get guess(): number {
        return this._currentGuess + 1;
    }

    public get guesses(): number {
        return this._guesses;
    }

    public get letterEvaluations(): Map<string, EvaluationStatus> {
        return this._letterEvaluations;
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

        if (this._gameState !== GameState.InProgress) {
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
     * Sets the board and every evaluation back to empty.
     */
    private clearBoard(): void {
        const emptyBoard: string[][] = [];
        const emptyEvals: EvaluationStatus[][] = [];

        for (let row = 0; row < this._guesses; row++) {
            emptyBoard[row] = [];
            emptyEvals[row] = [];

            for (let col = 0; col < this._characters; col++) {
                emptyBoard[row][col] = " ";
                emptyEvals[row][col] = EvaluationStatus.Unknown;
            }
        }

        this._board = emptyBoard;
        this._evaluations = emptyEvals;
        this._letterEvaluations = new Map<string, EvaluationStatus>();
    }

    /**
     * Attempt to submit the current guess if all characters have been input.
     */
    private enterPressed(): void {
        if (this._currentChar < this._characters) {
            return;
        }

        if (!dictionary.includes(this._board[this._currentGuess].join(""))) {
            alert("Not a valid word!");
            return;
        }

        this.submitGuess();
        this._store.set(this);
    }

    /**
     * Evaluate and determine the status of the guess.
     */
    private evaluateRow(): void {
        const answerLetters = this._answer.split(""); // Break into an array and remove letters as we evaluate.

        // Mark as correct.
        this._board[this._currentGuess].forEach((letter, i) => {
            if (letter === this._answer[i]) {
                this._evaluations[this._currentGuess][i] = EvaluationStatus.Correct;
                this._letterEvaluations.set(letter, EvaluationStatus.Correct);
                answerLetters[i] = null;
            }
        });

        // Mark as present.
        this._board[this._currentGuess].forEach((letter, i) => {
            if (
                this._evaluations[this._currentGuess][i] === EvaluationStatus.Unknown &&
                answerLetters.includes(letter)
            ) {
                this._evaluations[this._currentGuess][i] = EvaluationStatus.Present;
                answerLetters[answerLetters.indexOf(letter)] = null; // Replace first instance of the letter.

                if (!this._letterEvaluations.has(letter)) {
                    this._letterEvaluations.set(letter, EvaluationStatus.Present);
                }
            }
        });

        // Mark as absent.
        this._board[this._currentGuess].forEach((letter, i) => {
            if (this._evaluations[this._currentGuess][i] === EvaluationStatus.Unknown) {
                this._evaluations[this._currentGuess][i] = EvaluationStatus.Absent;

                if (!this._letterEvaluations.has(letter)) {
                    this._letterEvaluations.set(letter, EvaluationStatus.Absent);
                }
            }
        });
    }

    /**
     * Submit and process the guess and determine if we've won.
     */
    private submitGuess(): void {
        this.evaluateRow();

        // Determine if we won if every eval in the row is correct.
        const didWin = this._evaluations[this._currentGuess].every(
            (evl) => evl === EvaluationStatus.Correct
        );

        // We won!
        if (didWin) {
            this._gameState = GameState.Win;
            console.log("WINNER");
            return;
        }

        this._currentGuess++;
        this._currentChar = 0;

        // Ran out of guesses. :(
        if (this._currentGuess >= this._guesses) {
            this._gameState = GameState.Lose;
            alert(`GAME OVER - Answer was: ${this._answer}`);
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
