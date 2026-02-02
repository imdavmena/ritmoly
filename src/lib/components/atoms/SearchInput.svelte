<script lang="ts">
  export let label = "";
  export let value = "";
  export let placeholder = "Search...";
  export let name = "search";
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <label class="text-xs font-bold text-white uppercase tracking-wider" for={name}>{label}</label>
  {/if}
  <div class="relative">
    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">search</span>
    <input
      id={name}
      class="w-full bg-background-dark border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
      bind:value
      {placeholder}
      name={name}
      type="text"
    />
  </div>
</div>
