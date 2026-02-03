<script lang="ts">
  import { onMount } from "svelte";
  import StatTile from "$lib/components/molecules/StatTile.svelte";
  import RecentPlaylistCard from "$lib/components/molecules/RecentPlaylistCard.svelte";
  import UploadHero from "$lib/components/molecules/UploadHero.svelte";
  export let data: {
    stats: { uploads: number; playlists: number; plan: string; plan_slug: string; used: number; limit: number | null };
    recent: Array<{ _id: string; title: string; bpm_range: string; vibe: string; event_type: string; created_at: string | Date }>;
  };

  const initials = (title: string) => title.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const prettyDate = (d: string | Date) => new Date(d).toLocaleString();

  $: usagePct = data.stats.limit === null ? 100 : Math.min(100, Math.round((data.stats.used / (data.stats.limit || 1)) * 100));

  // No local animations needed; StatTile handles its own count-up
</script>

<!-- Stats Summary (cards) -->
<section class="max-w-5xl mx-auto w-full mb-6">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-sm text-[#a99bbb] flex items-center gap-2">
      <span class="material-symbols-outlined text-primary">insights</span>
      Overview
    </h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    <StatTile label="Uploads" icon="upload" value={data.stats.uploads} accent="primary" />
    <StatTile label="Playlists" icon="queue_music" value={data.stats.playlists} accent="secondary" />
    <StatTile label="Plan" icon="workspace_premium" value={data.stats.limit === null ? 0 : data.stats.used} limit={data.stats.limit} used={data.stats.used} manageHref="/app/billing" />
  </div>
</section>

<!-- Hero Section: Upload -->
<UploadHero />

<!-- Recent Sets Section -->
<section class="max-w-5xl mx-auto w-full">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white flex items-center gap-2">
      <span class="material-symbols-outlined text-primary">history</span>
      Recent Generations
    </h2>
    <a class="text-sm font-medium text-primary hover:text-white transition-colors" href="/app/playlists">View All</a>
  </div>

  {#if !data.recent?.length}
    <div class="text-[#a99bbb] text-sm">No playlists yet. Generate one from the Upload page.</div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each data.recent as pl}
        <RecentPlaylistCard {pl} />
      {/each}
    </div>
  {/if}
</section>

<footer class="max-w-5xl mx-auto w-full pt-2 pb-6 text-center">
  <p class="text-[#a99bbb] text-xs">Ritmoly Platform • 2026</p>
  </footer>
