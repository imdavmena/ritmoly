<!-- src/lib/components/atoms/Badge.svelte -->
<script lang="ts">
  export let tone: "neutral" | "success" | "warn" = "neutral";
</script>

<span
  class={`inline-flex items-center rounded-full px-2 py-0.5 text-xs border ${
    tone === "success"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : tone === "warn"
        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
        : "border-zinc-700 bg-zinc-900 text-zinc-200"
  }`}
>
  <slot />
</span>
