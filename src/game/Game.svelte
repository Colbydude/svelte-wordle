<script lang="ts">
    import Board from "./Board.svelte";
    import Keyboard from "./Keyboard.svelte";

    import GameStore from "../store/game";

    // @TODO "API" for answer.
    const game = new GameStore(6, 5, "vague");

    // Event Handlers
    const handleKeyUp = (e: KeyboardEvent) => {
        game.keyPressed(e.key);
    };

    const handleMessage = (e: CustomEvent<{ key: string }>) => {
        game.keyPressed(e.detail.key);
    };
</script>

<svelte:window on:keyup={handleKeyUp} />

<Board guesses={$game.board} />
<Keyboard on:message={handleMessage} />
