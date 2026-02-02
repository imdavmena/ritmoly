<!-- src/lib/components/atoms/Dropdown.svelte -->
<script lang="ts">
  export let label = "Select";
  export let items: { label: string; value: string }[] = [];
  export let value = "";
</script>

<label class="block">
  <div class="mb-1 text-sm text-zinc-300">{label}</div>
  <select
    class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
    bind:value
  >
    {#each items as it (it.value)}
      <option value={it.value}>{it.label}</option>
    {/each}
  </select>
</label>
