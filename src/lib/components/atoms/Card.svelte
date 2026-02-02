<script lang="ts">
  export let padded = true;
</script>

<div class={`rounded-xl border border-white/5 bg-surface/60 ${padded ? "p-5" : ""}`}>
  <slot />
</div>
