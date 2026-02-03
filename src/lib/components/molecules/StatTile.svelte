<script lang="ts">
  import { onMount } from "svelte";
  export let label = "";
  export let value = 0;
  export let icon: string | null = null;
  export let used: number | null = null; // for usage bar
  export let limit: number | null = null; // null means unlimited
  export let manageHref: string | null = null;
  export let accent: "primary" | "secondary" | "indigo" = "primary";

  let el: HTMLElement;
  let started = false;
  let display = 0;
  let progressDisplay = 0;
  const progress = limit === null ? 100 : Math.min(100, Math.round(((used ?? 0) / Math.max(1, limit)) * 100));

  function animateValue(from: number, to: number, duration: number, update: (v: number) => void) {
    const start = performance.now();
    function frame(now: number) {
      const p = Math.min(1, (now - start) / duration);
      const v = Math.round(from + (to - from) * p);
      update(v);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function start() {
    if (started) return;
    started = true;
    animateValue(0, value, 700, (v) => (display = v));
    animateValue(0, progress, 700, (v) => (progressDisplay = v));
  }

  onMount(() => {
    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) start();
    }, { threshold: 0.5 });
    if (el) io.observe(el);
    return () => io.disconnect();
  });
</script>

<div class="group relative overflow-hidden bg-surface-dark border border-[#30273a] hover:border-primary/40 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5" bind:this={el}>
  <div class="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full {accent === 'primary' ? 'bg-primary/10' : accent === 'secondary' ? 'bg-secondary/10' : 'bg-indigo-400/10'} blur-2xl"></div>
  <div class="flex items-center justify-between mb-2">
    <div class="size-10 rounded-lg border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
      {#if icon}<span class="material-symbols-outlined text-white">{icon}</span>{/if}
    </div>
    {#if manageHref}
      <a href={manageHref} class="text-[11px] text-primary hover:text-white transition-colors">Manage</a>
    {/if}
  </div>
  <div class="text-[#a99bbb] text-xs uppercase tracking-wide">{label}</div>
  <div class="text-3xl font-extrabold mt-1 gradient-text">{display}</div>
  {#if limit !== undefined}
    {#if limit === null}
      <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-white">Unlimited</div>
    {:else}
      <div class="mt-3">
        <div class="flex items-center justify-between text-[11px] text-[#a99bbb] mb-1">
          <span>Usage</span>
          <span>{used ?? 0} / {limit}</span>
        </div>
        <div class="h-1.5 rounded bg-[#30273a] overflow-hidden">
          <div class="h-full bg-gradient-to-r from-primary to-secondary" style={`width:${progressDisplay}%`}></div>
        </div>
      </div>
    {/if}
  {/if}
</div>
