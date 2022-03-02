<script lang="ts">
    export let letter = " ";
</script>

<div
    class="tile inline-flex w-full select-none items-center justify-center border-2 border-solid border-gray-400 align-middle text-[2rem] font-bold uppercase leading-[2rem] text-black before:inline-block before:pb-[100%] dark:text-white"
>
    {#if letter !== " "}
        {letter}
    {/if}
</div>

<style>
    @media (max-height: 600px) {
        .tile {
            font-size: 1em;
            line-height: 1em;
        }
    }
</style>
