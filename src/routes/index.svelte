<!-- <script context="module" lang="ts">
    export const prerender = true;
</script> -->
<script lang="ts">
    import GuessBoard from "../game/GuessBoard.svelte";
    import Keyboard from "../game/Keyboard.svelte";
</script>

<svelte:head>
    <title>Svelte Wordle</title>
</svelte:head>

<GuessBoard />
<Keyboard />
