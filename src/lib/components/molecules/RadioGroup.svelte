<script lang="ts">
  export let options: Array<{label: string; value: string}> = [];
  export let name = "radio";
  export let value: string | null = null;
</script>

<div class="flex flex-wrap gap-3">
  {#each options as o}
    <label class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-background-dark px-3 py-2 text-sm text-white/80 hover:text-white hover:border-primary/50 cursor-pointer">
      <input class="sr-only" type="radio" bind:group={value} value={o.value} name={name} />
      <span class="material-symbols-outlined text-[18px] text-primary">radio_button_checked</span>
      <span>{o.label}</span>
    </label>
  {/each}
</div>
