<script lang="ts">
  export let open = false;
  export let title = "";
  export let onClose: () => void = () => {};
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" on:click={onClose}>
    <div class="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-5" on:click|stopPropagation>
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-lg font-bold">{title}</h3>
        <button class="text-zinc-400 hover:text-white" on:click={onClose}>✕</button>
      </div>
      <slot />
    </div>
  </div>
{/if}
