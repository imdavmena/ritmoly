<!-- src/lib/components/atoms/Toggle.svelte -->
<script lang="ts">
  export let checked = false;
  export let onChange: (v: boolean) => void = () => {};
  export let label: string | null = null;
  let id = `tgl-${Math.random().toString(36).slice(2)}`;
  function toggle() {
    checked = !checked;
    onChange(checked);
  }
  $: ariaLabel = label ?? (checked ? "On" : "Off");
  $: track = checked ? "bg-primary" : "bg-[#463a55]";
</script>

<label class="inline-flex items-center gap-3 cursor-pointer select-none">
  <input id={id} type="checkbox" class="sr-only" bind:checked on:change={() => onChange(checked)} />
  <span
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    class={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/10 ${track} transition-colors`}
    on:click|stopPropagation={toggle}
  >
    <span
      class={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </span>
  {#if label}<span class="text-sm text-zinc-300">{label}</span>{/if}
</label>
