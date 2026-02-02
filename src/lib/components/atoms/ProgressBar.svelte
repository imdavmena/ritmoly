<!-- src/lib/components/atoms/ProgressBar.svelte -->
<script lang="ts">
  export let value = 0; // 0..100
</script>

<div class="h-2 w-full rounded-full bg-zinc-900 border border-zinc-800">
  <div
    class="h-2 rounded-full bg-white"
    style={`width:${Math.max(0, Math.min(100, value))}%`}
  ></div>
</div>
