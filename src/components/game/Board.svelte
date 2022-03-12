<script lang="ts">
    import { getContext, onMount } from "svelte";

    import Row from "./Row.svelte";

    import type { GameContext } from "$lib/types";
    import GameStore from "$store/game";

    const { getGame } = getContext<GameContext>(GameStore.CONTEXT_KEY);
    const game = getGame();

    let boardWidth = 0;
    let boardHeight = 0;

    const handleWindowResize = () => {
        boardWidth = Math.min(
            Math.floor(
                (document.documentElement.clientHeight - 50 - 200) *
                    (game.characters / game.guesses)
            ),
            350
        );
        boardHeight = game.guesses * Math.floor(boardWidth / game.characters);
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
        style="width: {boardWidth}px; height: {boardHeight}px; grid-template-rows: repeat({game.guesses}, minmax(0, 1fr));"
    >
        {#each $game.board as guess, row}
            <Row letters={guess} {row} />
        {/each}
    </div>
</div>
