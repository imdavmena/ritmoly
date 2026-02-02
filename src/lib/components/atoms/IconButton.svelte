<script lang="ts">
  import Icon from "./Icon.svelte";
  export let icon = "play_arrow";
  export let variant: "primary" | "surface" = "surface";
  export let size: number = 40; // px
  export let type: "button" | "submit" = "button";
</script>

<button
  {type}
  class={`inline-flex items-center justify-center rounded-full border transition ${
    variant === "primary"
      ? "bg-surface-highlight hover:bg-primary hover:text-background-dark text-white border-white/10 shadow-neon"
      : "bg-surface hover:bg-white/5 text-white border-white/10"
  }`}
  style={`width:${size}px;height:${size}px;`}
>
  <Icon name={icon} size={20} />
</button>
