<script lang="ts">
  export let data: {
    stats: { uploads: number; playlists: number; plan: string; plan_slug: string; used: number; limit: number | null };
    recent: Array<{ _id: string; title: string; bpm_range: string; vibe: string; event_type: string; created_at: string | Date }>;
  };

  const initials = (title: string) => title.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const prettyDate = (d: string | Date) => new Date(d).toLocaleString();
</script>

<!-- Hero Section: Upload -->
<section class="max-w-5xl mx-auto w-full">
  <div class="flex flex-col gap-2 mb-6">
    <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Initialize New Set</h1>
    <p class="text-[#a99bbb] text-base md:text-lg max-w-2xl">Drop your seed tracks here to let the AI analyze BPM, key, and energy levels to build your perfect journey.</p>
  </div>

  <!-- Upload Area -->
  <div class="relative group cursor-pointer">
    <div class="absolute inset-0 bg-primary/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div class="relative flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-[#463a55] bg-surface-dark/50 hover:bg-surface-dark hover:border-primary/50 transition-all duration-300 px-6 py-16 md:py-20">
      <div class="size-16 rounded-full bg-[#30273a] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
        <span class="material-symbols-outlined text-white text-[32px]">cloud_upload</span>
      </div>
      <div class="text-center space-y-2">
        <h3 class="text-xl font-bold text-white">Drop seed tracks here</h3>
        <p class="text-[#a99bbb] text-sm">Supports high-quality audio formats</p>
      </div>
      <!-- Chips -->
      <div class="flex flex-wrap justify-center gap-3">
        <div class="px-3 py-1 rounded-full bg-[#30273a] border border-[#463a55] text-xs font-bold text-[#a99bbb]">.MP3</div>
        <div class="px-3 py-1 rounded-full bg-[#30273a] border border-[#463a55] text-xs font-bold text-[#a99bbb]">.WAV</div>
        <div class="px-3 py-1 rounded-full bg-[#30273a] border border-[#463a55] text-xs font-bold text-[#a99bbb]">.AIFF</div>
      </div>
      <a href="/app/upload" class="mt-4 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide transition-colors shadow-lg shadow-primary/20">
        Browse Files
      </a>
    </div>
  </div>
</section>

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
        <div class="group bg-surface-dark border border-[#30273a] hover:border-primary/40 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
          <div class="flex justify-between items-start mb-4">
            <div class="size-12 rounded-lg bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center text-white font-bold text-lg border border-white/10">{initials(pl.title)}</div>
            <a class="text-[#a99bbb] hover:text-white transition-colors" href={`/app/playlists/${pl._id}`} aria-label="View playlist">
              <span class="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
          <h3 class="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">{pl.title}</h3>
          <p class="text-[#a99bbb] text-xs mb-4">{prettyDate(pl.created_at)}</p>
          <div class="flex flex-wrap gap-2 mb-5">
            <span class="px-2.5 py-1 rounded bg-[#30273a] text-primary text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">speed</span> {pl.bpm_range}
            </span>
            <span class="px-2.5 py-1 rounded bg-[#30273a] text-white text-xs font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-orange-400">bolt</span> {pl.vibe}
            </span>
          </div>
          <div class="flex items-center gap-2 mt-auto">
            <a class="flex-1 flex items-center justify-center gap-2 h-9 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors" href={`/app/playlists/${pl._id}`}>
              <span class="material-symbols-outlined text-[18px]">play_arrow</span> Open
            </a>
            <button class="size-9 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors" aria-label="Download (coming soon)" disabled>
              <span class="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>

<footer class="max-w-5xl mx-auto w-full pt-2 pb-6 text-center">
  <p class="text-[#a99bbb] text-xs">AI.DJ Platform • <a class="hover:text-primary underline" href="/">Documentation</a></p>
  <div class="text-xs text-white/40 mt-1">Uploads: {data.stats.uploads} • Playlists: {data.stats.playlists} • Plan: {data.stats.plan}</div>
  </footer>
