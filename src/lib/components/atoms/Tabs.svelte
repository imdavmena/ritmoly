<!-- src/lib/components/atoms/Tabs.svelte -->
<script lang="ts">
  export let tabs: { key: string; label: string }[] = [];
  export let active: string = "";
  export let onSelect: (k: string) => void = () => {};
</script>

<div class="flex gap-2">
  {#each tabs as t (t.key)}
    <button
      type="button"
      class={`rounded-xl px-3 py-1.5 text-sm border ${active === t.key ? "bg-white text-zinc-950 border-white" : "bg-zinc-950 border-zinc-800 text-zinc-200 hover:bg-zinc-900"}`}
      on:click={() => onSelect(t.key)}>{t.label}</button
    >
  {/each}
</div>
