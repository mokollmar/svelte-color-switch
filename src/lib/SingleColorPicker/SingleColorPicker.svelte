<!-- maybe somehow slot? -->

<script>
    import { onMount } from "svelte";
    import Icon from "../Icon.svelte";
    import {
        ex_getCurrentColor,
        ex_getStoredColor,
        ex_updateColor,
        ex_getColorDelayPresence,
    } from "../functions";
    import { SingleColorPicker_check } from "./components/check";

    export let list_of_colors;
    export let css_variable;
    let className = ""; // get the class
    export { className as class };
    export let itemClass = "";

    SingleColorPicker_check({
        className: className,
        css_variable: css_variable,
        itemClass: itemClass,
        list_of_colors: list_of_colors,
    });

    onMount(() => {
        if (ex_getColorDelayPresence()) return;
        // Let's go
        const storedValue = ex_getStoredColor({ css: css_variable });
        if (storedValue) onUpdate(storedValue);
    });
    let showColor = ex_getCurrentColor({ css: css_variable });

    function onUpdate(value) {
        ex_updateColor({ css: css_variable, value: value });
        showColor = ex_getCurrentColor({ css: css_variable });
    }
</script>

<div class={className || "root_layout"}>
    {#each list_of_colors as color, item_index}
        <button
            id="color_circle"
            class={itemClass || "color_circle_layout"}
            style={`--my_color:${color}`}
            on:click={() => onUpdate(color)}
        >
            <slot {item_index}>
                {#if showColor === color}
                    <Icon circle_check={true} />
                {/if}
            </slot>
        </button>
    {/each}
</div>

<style>
    #color_circle {
        background-color: var(--my_color);
        min-height: 1rem;
        min-width: 1rem;
    }

    /* Optional: */

    .color_circle_layout {
        width: 1.75rem /* 24px */;
        height: 1.75rem /* 24px */;
        border-radius: 9999px;
        margin-left: 0.5rem /* 8px */;
        margin-right: 0.5rem /* 8px */;
    }
    .root_layout {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        --tw-space-x-reverse: 0;
        padding-top: 0.75rem /* 12px */;
        padding-bottom: 0.75rem /* 12px */;
    }
</style>
