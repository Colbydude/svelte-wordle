<script lang="ts">
    import Board from "./Board.svelte";
    import Keyboard from "./Keyboard.svelte";

    // Constants
    const SUPPORTED_KEYS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "Enter",
        "Backspace",
    ];
    const GUESS_LENGTH = 5;

    // Game State
    /**
     * Character of the current guess we're on.
     */
    let currentChar = 0;

    /**
     * The current guess (row) we're on.
     */
    let currentGuess = 0;

    /**
     * State of the entire board.
     */
    const guesses = [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
    ];

    /**
     * The list of characters that have been used.
     */
    const usedCharacters = new Set<string>();

    // Event Handlers
    const handleKeyUp = (e: KeyboardEvent) => {
        keyPressed(e.key);
    };

    const handleMessage = (e: CustomEvent<{ key: string }>) => {
        keyPressed(e.detail.key);
    };

    // Methods
    /**
     * Attempt to insert a space back at the current character.
     */
    const backspacePressed = () => {
        if (currentChar === 0) {
            return;
        }

        currentChar = currentChar - 1;
        updateGuess(currentGuess, currentChar, " ");
    };

    /**
     * Attempt to submit the current guess if all characters have been input.
     */
    const enterPressed = () => {
        if (currentChar < GUESS_LENGTH) {
            return;
        }

        submitGuess();

        currentGuess = currentGuess + 1;
        currentChar = 0;
    };

    /**
     * Attempt to insert the character in the guess.
     *
     * @param key
     */
    const keyPressed = (key: string) => {
        if (!SUPPORTED_KEYS.includes(key)) {
            return;
        }

        if (key === "Backspace") {
            backspacePressed();
            return;
        }

        if (key === "Enter") {
            enterPressed();
            return;
        }

        if (currentChar >= GUESS_LENGTH) {
            return;
        }

        updateGuess(currentGuess, currentChar, key);
        currentChar = currentChar + 1;
    };

    /**
     * Submit and process the guess and determine if we've won.
     */
    const submitGuess = () => {
        guesses[currentGuess].forEach((letter) => {
            usedCharacters.add(letter);
        });

        console.log(usedCharacters);

        // @TODO
    };

    /**
     * Insert the given character at the given guess and index.
     */
    const updateGuess = (guessIndex: number, charIndex: number, value: string) => {
        guesses[guessIndex][charIndex] = value;
        // console.log(guesses[guessIndex]);
    };
</script>

<svelte:window on:keyup={handleKeyUp} />

<Board {guesses} />
<Keyboard on:message={handleMessage} />
