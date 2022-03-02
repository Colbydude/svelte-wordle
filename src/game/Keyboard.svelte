<script lang="ts">
    const keyboardRows = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
    ];
</script>

<div class="mx-2 my-0 h-[200px]">
    {#each keyboardRows as row, rowIndex}
        <div class="mx-auto mb-[8px] mt-0 flex w-full touch-manipulation">
            {#if rowIndex === 1}
                <div class="flex-[0.5_1_0%]" />
            {/if}
            {#each row as letter, letterIndex}
                <button
                    class:end={letterIndex === row.length - 1}
                    class:one-and-a-half={letter === "enter" || letter === "backspace"}
                    class="b-0 m-0 mr-[6px] flex h-[58px] flex-1 cursor-pointer select-none items-center justify-center rounded bg-gray-500 p-0 text-[13px] font-bold uppercase text-black dark:text-white"
                >
                    {#if letter === "backspace"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <path
                                class="fill-black dark:fill-white"
                                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                            />
                        </svg>
                    {:else}
                        {letter}
                    {/if}
                </button>
            {/each}
            {#if rowIndex === 1}
                <div class="flex-[0.5_1_0%]" />
            {/if}
        </div>
    {/each}
</div>

<style>
    .end {
        @apply m-0;
    }

    .one-and-a-half {
        @apply text-[12px];
        flex: 1.5;
    }
</style>
