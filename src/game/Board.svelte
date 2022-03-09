<script lang="ts">
    import { onMount } from "svelte";
    import Row from "./Row.svelte";

    export let guesses = [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
    ];
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
        {#each guesses as guess}
            <Row letters={guess} />
        {/each}
    </div>
</div>
