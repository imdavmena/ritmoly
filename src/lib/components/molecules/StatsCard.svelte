<script lang="ts">
  export let label = "";
  export let value = "";
  export let icon: string | null = null;
</script>

<div class="p-4 rounded-xl bg-surface border border-white/5">
  {#if icon}
    <div class="mb-1 text-[#a99bbb] font-mono text-xs flex items-center gap-1">
      <span class="material-symbols-outlined text-primary text-sm">{icon}</span>
      <span>{label.toUpperCase()}</span>
    </div>
  {:else}
    <p class="text-xs font-mono text-[#a99bbb] mb-1">{label.toUpperCase()}</p>
  {/if}
  <p class="text-white font-bold">{value}</p>
</div>
