<!-- Color Delay + Transition between colors -->

<script>
    import { onMount } from "svelte";
    import { ColorDelay_check } from "./components/check";
    import { ex_getStoredColor, ex_updateColor } from "../functions";

    export let css_variables; // needs to be an array
    export let transition; // bool
    ColorDelay_check(css_variables);

    let isMounted = false;
    onMount(() => (isMounted = true));

    function getColor() {
        css_variables.forEach((css) => {
            const color = ex_getStoredColor({ css: css });
            if (color) ex_updateColor({ css: css, value: color });
            // mark Presence:
            localStorage.setItem("ColorDelay", "X");
        });
        return true;
    }
</script>

{#if isMounted && getColor()}
    {#if transition == true}
        <section><slot /></section>
    {:else}
        <slot />
    {/if}
{/if}

<style>
    section {
        transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 250ms;
    }
    section :global(> :first-child) {
        transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 250ms;
    }
    section :global(> :last-child) {
        transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
        transition-duration: 250ms;
    }
</style>
