<script lang="ts">
    import Tile from "./Tile.svelte";

    export let letters = [" ", " ", " ", " ", " "];
</script>

<div class="grid grid-cols-5 gap-[5px]">
    {#each letters as letter}
        <Tile {letter} />
    {/each}
</div>
