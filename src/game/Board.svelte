<script lang="ts">
    import { getContext, onMount } from "svelte";

    import Row from "./Row.svelte";

    import GameStore from "../store/game";
    import type { GameContext } from "../types";

    const { getGame } = getContext<GameContext>(GameStore.CONTEXT_KEY);
    const game = getGame();

    let boardWidth = 0;
    let boardHeight = 0;

    const handleWindowResize = () => {
        boardWidth = Math.min(
            Math.floor((document.documentElement.clientHeight - 50 - 200) * (5 / 6)),
            350
        );
        boardHeight = 6 * Math.floor(boardWidth / 5);
    };

    onMount(() => {
        handleWindowResize();
    });
</script>

<svelte:window on:resize={handleWindowResize} />

<div class="align-center flex grow justify-center overflow-hidden">
    <div
        class="grid w-full grid-rows-6 gap-[5px] p-[10px]"
        on:load={handleWindowResize}
        style={`width: ${boardWidth}px; height: ${boardHeight}px;`}
    >
        {#each $game.board as guess, row}
            <Row letters={guess} {row} />
        {/each}
    </div>
</div>
