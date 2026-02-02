<script lang="ts">
  export let locale: "en" | "es" = "en";
  export let t: any;
  export let userEmail: string | null = null;
  import { browser } from "$app/environment";
  let dark = true;
  function applyTheme() {
    if (!browser) return;
    const root = document.documentElement.classList;
    dark ? root.add("dark") : root.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }
  if (browser) {
    const saved = localStorage.getItem("theme");
    if (saved) dark = saved === "dark"; else dark = true;
    queueMicrotask(applyTheme);
  }
</script>

<nav class="sticky top-0 z-40 border-b border-white/5 bg-background-dark/80 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
    <a href="/" class="flex items-center gap-2 text-lg font-black tracking-tight">
      <img src="/logo.svg" alt="RITMOLY" class="h-8 w-8" loading="lazy" />
      <span>RITMOLY</span>
    </a>
    <div class="flex items-center gap-4 text-sm">
      <a class="text-zinc-300 hover:text-white" href="/about">{t.nav.about}</a>
      <a class="text-zinc-300 hover:text-white" href="/contact">{t.nav.contact}</a>
      <a class="text-zinc-300 hover:text-white" href="/#pricing">{t.nav.pricing}</a>
      {#if userEmail}
        <a class="rounded-lg border border-white/5 px-3 py-1.5 hover:bg-surface" href="/app/dashboard">App</a>
      {:else}
        <a class="rounded-lg border border-white/5 px-3 py-1.5 hover:bg-surface" href="/auth/login">{t.nav.login}</a>
      {/if}
      <!-- <button class="rounded-full border border-white/10 px-2 py-1 hover:bg-white/5" on:click={() => { dark = !dark; applyTheme(); }} aria-label="Toggle dark mode">
        <span class="material-symbols-outlined text-white/80">{dark ? "dark_mode" : "light_mode"}</span>
      </button> -->
      <a class="text-zinc-400 hover:text-white" href={`?lang=${locale==="en"?"es":"en"}`}>{locale==="en"?"ES":"EN"}</a>
    </div>
  </div>
</nav>
