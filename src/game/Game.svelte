<script lang="ts">
    import { setContext } from "svelte";

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

    setContext(GameStore.CONTEXT_KEY, {
        getGame: () => game,
    });
</script>

<svelte:window on:keyup={handleKeyUp} />

<Board />
<Keyboard on:message={handleMessage} />
