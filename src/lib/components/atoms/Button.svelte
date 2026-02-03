<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let variant: "primary" | "secondary" | "ghost" | "danger" = "primary";
  export let loading = false;
  export let type: "button" | "submit" = "button";
  export let disabled = false;

  const dispatch = createEventDispatcher<{ click: void }>();
  function handleClick(event: MouseEvent) {
    if (disabled || loading) return;
    dispatch("click");
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/40";
  const variants: Record<typeof variant, string> = {
    primary: "bg-primary text-background-dark hover:bg-primary-hover shadow-neon",
    secondary: "border border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-white/5",
    danger: "bg-red-600 text-white hover:bg-red-500"
  };
</script>

<button
  {type}
  {...$$restProps}
  class={`${base} ${variants[variant]} ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}`}
  disabled={disabled || loading}
  on:click={handleClick}
>
  {#if loading}
    <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
  {/if}
  <slot />
</button>
