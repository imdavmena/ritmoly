<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
</script>

<div class="space-y-4">
  <h1 class="text-3xl font-black">Dashboard</h1>
  <div class="grid gap-4 md:grid-cols-3">
    <Card><div class="text-sm text-zinc-400">Uploads</div><div class="text-2xl font-black">—</div></Card>
    <Card><div class="text-sm text-zinc-400">Playlists</div><div class="text-2xl font-black">—</div></Card>
    <Card><div class="text-sm text-zinc-400">Plan</div><div class="text-2xl font-black">—</div></Card>
  </div>
  <Card>
    <div class="text-zinc-300">Go to <a class="underline" href="/app/upload">Upload</a> to generate your first set.</div>
  </Card>
</div>
