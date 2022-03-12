<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import Game from "$components/game/Game.svelte";
</script>

<svelte:head>
    <title>Svelte Wordle</title>
</svelte:head>

<Game />
