<script lang="ts">
  export let label = "";
  export let value: string = "";
  export let placeholder = "";
  export let type: string = "text";
  export let name = "";
  export let error: string | null = null;
</script>

<label class="block">
  {#if label}<div class="mb-1 text-xs font-bold uppercase tracking-wider text-white">{label}</div>{/if}
  <input
    class={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/20 outline-none bg-background-dark ${
      error ? "border-red-500/60 focus:border-red-400" : "border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary"
    }`}
    bind:value
    {placeholder}
    {type}
    {name}
    {...$$restProps}
  />
  {#if error}<div class="mt-1 text-xs text-red-400">{error}</div>{/if}
</label>
