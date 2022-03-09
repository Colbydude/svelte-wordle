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

<div
    class="grid gap-[5px]"
    style="grid-template-columns: repeat({game.characters}, minmax(0, 1fr));"
>
    {#each letters as letter, i}
        <Tile {letter} status={$game.evaluations[row][i]} />
    {/each}
</div>
