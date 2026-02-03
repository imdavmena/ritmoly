<script lang="ts">
  type RecentPlaylist = {
    _id: string;
    title: string;
    bpm_range: string;
    vibe: string;
    created_at: string | Date;
  };
  export let pl: RecentPlaylist;

  const initials = (title: string) => title.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const prettyDate = (d: string | Date) => new Date(d).toLocaleString();
</script>

<a class="group block bg-surface-dark border border-[#30273a] hover:border-primary/40 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40" href={`/app/playlists/${pl._id}`} aria-label={`Open ${pl.title}`}>
  <div class="flex justify-between items-start mb-4">
    <div class="size-12 rounded-lg bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center text-white font-bold text-lg border border-white/10">{initials(pl.title)}</div>
    <span class="material-symbols-outlined text-[#a99bbb] group-hover:text-white transition-colors">open_in_new</span>
  </div>
  <h3 class="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">{pl.title}</h3>
  <p class="text-[#a99bbb] text-xs mb-4">{prettyDate(pl.created_at)}</p>
  <div class="flex flex-wrap gap-2">
    <span class="px-2.5 py-1 rounded bg-[#30273a] text-primary text-xs font-bold flex items-center gap-1">
      <span class="material-symbols-outlined text-[14px]">speed</span> {pl.bpm_range}
    </span>
    <span class="px-2.5 py-1 rounded bg-[#30273a] text-white text-xs font-medium flex items-center gap-1">
      <span class="material-symbols-outlined text-[14px] text-orange-400">bolt</span> {pl.vibe}
    </span>
  </div>
</a>
