<script lang="ts">
    import { EvaluationStatus } from "../types";

    export let letter = " ";
    export let status: EvaluationStatus = EvaluationStatus.Unknown;
</script>

<div
    class:absent={status === EvaluationStatus.Absent}
    class:correct={status === EvaluationStatus.Correct}
    class:filled={letter != " " && status === EvaluationStatus.Unknown}
    class:present={status === EvaluationStatus.Present}
    class="tile inline-flex w-full select-none items-center justify-center border-2 border-solid border-gray-700 align-middle text-[2rem] font-bold uppercase leading-[2rem] text-black before:inline-block before:pb-[100%] dark:text-white"
>
    {#if letter !== " "}
        {letter}
    {/if}
</div>

<style>
    .tile.absent {
        @apply border-gray-700 bg-gray-700 text-white;
    }

    .tile.correct {
        @apply border-green-500 bg-green-500 text-white;
    }

    .tile.filled {
        @apply border-gray-400;
    }

    .tile.present {
        @apply border-yellow-500 bg-yellow-500 text-white;
    }

    @media (max-height: 600px) {
        .tile {
            font-size: 1em;
            line-height: 1em;
        }
    }
</style>
