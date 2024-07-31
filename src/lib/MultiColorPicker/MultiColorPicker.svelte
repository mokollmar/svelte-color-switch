<!--  const multiConfig = [
	 	 1. is Default
	 	[
	 		{ css_variable: "--color-primary-demo", color: "#00A3FF" },
	 		{ css_variable: "--color-secondary-demo", color: "#31CDFF" },
	 		{ css_variable: "--color-bg-demo", color: "#FFFFFF" },
	 	],
	 	[
	 		{ css_variable: "--color-primary-demo", color: "#FF4848" },
	 		{ css_variable: "--color-secondary-demo", color: "#FF8088" },
	 		{ css_variable: "--color-bg-demo", color: "#0000" },
	 	],
	 	[
	 		{ css_variable: "--color-primary-demo", color: "#FFFFFF" },
	 		{ css_variable: "--color-secondary-demo", color: "#9E9E9E" },
	 		{ css_variable: "--color-bg-demo", color: "#0000" },
	 	],
	 ]; -->

<script>
    import { onMount } from "svelte";
    import Circle from "../Circle.svelte";
    import Icon from "../Icon.svelte";
    import {
        ex_getCurrentColor,
        ex_getStoredColor,
        ex_updateColor,
        ex_getColorDelayPresence,
    } from "../functions";
    import { MultiColorPicker_check } from "./components/check";

    export let multi_config;
    let className = ""; // get the class
    export { className as class };
    export let itemClass = "";

    MultiColorPicker_check({
        multi_config: multi_config,
        className: className,
        itemClass: itemClass,
    });

    onMount(() => {
        if (ex_getColorDelayPresence()) return;
        // Let's go
        multi_config[0].forEach((element) => {
            let css_variable = element.css_variable;
            const storedValue = ex_getStoredColor({ css: css_variable });
            if (storedValue)
                ex_updateColor({ css: css_variable, value: storedValue });
        });
    });
    let first_css_variable = multi_config[0][0].css_variable;
    let showColor = ex_getCurrentColor({ css: first_css_variable });

    function onUpdateArray(item, item_index) {
        item.forEach((element) =>
            ex_updateColor({ css: element.css_variable, value: element.color }),
        );
        showColor = ex_getCurrentColor({ css: item[0].css_variable });
        current_theme_index = item_index;
    }
</script>

<div class={className || "root_layout"}>
    {#each multi_config as item, item_index}
        <button
            id="color_circle"
            class={itemClass || "color_circle_layout"}
            on:click={() => onUpdateArray(item, item_index)}
        >
            <slot {item_index} {item}>
                <Circle color_config={item} size={28}>
                    {#if showColor == item[0].color}
                        <Icon circle_check={true} />
                    {/if}
                </Circle>
            </slot>
        </button>
    {/each}
</div>

<style>
    #color_circle {
        min-height: 1rem;
        min-width: 1rem;
    }

    /* Optional: */

    .color_circle_layout {
        width: 28px;
        height: 28px;
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
