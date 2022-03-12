<script lang="ts">
    import { fade } from "svelte/transition";

    import { toasts } from "$store/toasts";
</script>

<div
    class="pointer-events-none absolute top-[10%] left-[50%] z-50 w-fit -translate-x-1/2 text-center"
>
    {#each $toasts as toast}
        <div
            out:fade={{ duration: 100 }}
            class="relative m-4 rounded border-none bg-gray-900 p-4 font-bold text-white dark:bg-white dark:text-gray-900"
        >
            {toast}
        </div>
    {/each}
</div>
