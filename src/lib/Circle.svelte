<script>
    export let color_config;
    export let size;

    let radius = size / 4; // because the stroke width is: radius * 2
    let circumference = Math.PI * radius * 2;
    let quarterCircumference = circumference / color_config.length;
</script>

<div id="circle_layout">
    <svg width={size} height={size}>
        {#each color_config as config, index}
            <circle
                r={radius}
                cx={size / 2}
                cy={size / 2}
                stroke={config.color}
                stroke-width={radius * 2}
                stroke-dasharray={`${quarterCircumference} ${circumference - quarterCircumference}`}
                stroke-dashoffset={-index * quarterCircumference}
                fill="none"
            />
        {/each}
        <slot />
    </svg>
</div>
