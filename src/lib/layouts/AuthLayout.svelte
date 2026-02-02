<script lang="ts">
  export let data: any;
</script>
<div class="min-h-[calc(100vh-0px)]">
  <div class="mx-auto max-w-md px-4 py-10">
    <a href="/" class="text-sm text-zinc-400 hover:text-white">← Back</a>
    <div class="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
      <slot/>
    </div>
  </div>
</div>
