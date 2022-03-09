<script lang="ts">
    import { getContext } from "svelte";

    import Tile from "./Tile.svelte";

    import GameStore from "../store/game";
    import type { GameContext } from "../types";

    const { getGame } = getContext<GameContext>(GameStore.CONTEXT_KEY);
    const game = getGame();

    export let letters: string[] = [];
    export let row = 0;
</script>

<div class="grid grid-cols-5 gap-[5px]">
    {#each letters as letter, i}
        <Tile {letter} status={$game.evaluations[row][i]} />
    {/each}
</div>
