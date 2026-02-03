<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
  import StatsCard from "$lib/components/molecules/StatsCard.svelte";
  export let data: { stats: { uploads: number; playlists: number; plan: string; plan_slug: string; used: number; limit: number | null } };

  $: planDisplay = data.stats.limit === null
    ? `${data.stats.plan} (Unlimited)`
    : `${data.stats.plan} (${data.stats.used}/${data.stats.limit})`;
</script>

<div class="space-y-4">
  <h1 class="text-3xl font-black">Dashboard</h1>
  <div class="grid gap-4 md:grid-cols-3">
    <StatsCard label="Uploads" value={String(data.stats.uploads)} icon="upload" />
    <StatsCard label="Playlists" value={String(data.stats.playlists)} icon="queue_music" />
    <StatsCard label="Plan" value={planDisplay} icon="workspace_premium" />
  </div>
  <Card>
    <div class="text-zinc-300">Go to <a class="underline" href="/app/upload">Upload</a> to generate your first set.</div>
  </Card>
</div>
