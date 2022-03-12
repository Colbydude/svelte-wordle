<script lang="ts">
    import Header from "$components/partials/Header.svelte";
    import "../app.css";
</script>

<Header />

<main class="my-0 mx-auto flex w-full max-w-[500px] flex-col" style="height: calc(100% - 50px);">
    <slot />
</main>
