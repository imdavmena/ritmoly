<script lang="ts">
  export let title = "Neon Nights";
  export let artist = "Cyberpunk Collective";
  export let bpm: number | string = 128;
  export let duration = "3:45";
  export let imageUrl: string | null = null;
</script>

<div class="p-4 rounded-xl bg-surface border border-white/5 flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
  <div class="size-16 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden" aria-label="album art">
    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
    <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity">play_arrow</span>
  </div>
  <div class="flex flex-col flex-1">
    <p class="text-white font-bold leading-tight">{title}</p>
    <p class="text-[#a99bbb] text-sm">{artist}</p>
  </div>
  <div class="flex flex-col items-end">
    <span class="text-secondary font-mono text-xs font-bold">{bpm} BPM</span>
    <span class="text-[#a99bbb] text-xs">{duration}</span>
  </div>
</div>
