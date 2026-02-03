<script lang="ts">
  export let title: string = "Initialize New Set";
  export let subtitle: string = "Drop your seed tracks here to let the AI analyze BPM, key, and energy levels to build your perfect journey.";
  export let ctaHref: string = "/app/upload";
  export let ctaText: string = "Browse Files";
</script>

<section class="max-w-5xl mx-auto w-full">
  <div class="flex flex-col gap-2 mb-6">
    <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
    <p class="text-[#a99bbb] text-base md:text-lg max-w-2xl">{subtitle}</p>
  </div>

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
      <div class="flex flex-wrap justify-center gap-3">
        <div class="px-3 py-1 rounded-full bg-[#30273a] border border-[#463a55] text-xs font-bold text-[#a99bbb]">.MP3</div>
        <div class="px-3 py-1 rounded-full bg-[#30273a] border border-[#463a55] text-xs font-bold text-[#a99bbb]">.WAV</div>
        <div class="px-3 py-1 rounded-full bg-[#30273a] border border-[#463a55] text-xs font-bold text-[#a99bbb]">.AIFF</div>
      </div>
      <a href={ctaHref} class="mt-4 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide transition-colors shadow-lg shadow-primary/20">
        {ctaText}
      </a>
    </div>
  </div>
</section>
