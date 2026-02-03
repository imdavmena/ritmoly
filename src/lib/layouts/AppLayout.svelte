<script lang="ts">
  import { page } from "$app/stores";
  export let data: any;

  $: pathname = $page.url.pathname;
  const linkBase = "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors";
  const inactive = "hover:bg-[#30273a] text-[#a99bbb] hover:text-white";
  const active = "bg-primary/20 text-primary";
  const linkClass = (href: string) => (pathname.startsWith(href) ? `${linkBase} ${active}` : `${linkBase} ${inactive}`);

  $: headerTitle = (() => {
    if (pathname.startsWith("/app/upload")) return "Upload";
    if (pathname.startsWith("/app/playlists")) return "Playlists";
    if (pathname.startsWith("/app/billing")) return "Billing";
    if (pathname.startsWith("/app/dashboard")) return "Set Generator";
    return "AI.DJ";
  })();

  let mobileOpen = false;
  const closeMobile = () => (mobileOpen = false);
</script>

<div class="flex h-screen w-full overflow-hidden">
  <!-- Sidebar (desktop) -->
  <aside class="w-64 h-full hidden md:flex flex-col border-r border-[#30273a] bg-background-dark shrink-0">
    <div class="flex h-full flex-col justify-between p-4">
      <div class="flex flex-col gap-8">
        <!-- User/Brand -->
        <div class="flex items-center gap-3 px-2">
          <div
            class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20"
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMuj53epN26--imPfT-FfFDq0KQHkUG6O-3e3CIxD3rkn1x7xNFugGod2XHrrfhlGq-KjSOsUqZDU0-cIb5dhkZjJUQWn2xbJeDGJksC3R8EEPifIo-35ZGBNyDOkr_U4j5sod6KzhDuJu72-Dh7EAMB4dQAEPbDDJnTheOqNwDHkK6d4rgzpkGTHifKxAB_FmUdxHm6qjy_uCxXpYlnCJ-BoXU7Q5rWSUjz3kZBslg5gyBnGkdr8g5RsVjqHIDdJuqLI-zBqnBKaD');"
          ></div>
          <div class="flex flex-col">
            <h1 class="text-white text-lg font-bold leading-none tracking-tight">AI.DJ</h1>
            <p class="text-xs text-white/60 mt-1">{data.user.email}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-2">
          <a class={linkClass("/app/dashboard")} href="/app/dashboard" aria-current={pathname.startsWith("/app/dashboard") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">dashboard</span>
            <span class="text-sm font-medium">Dashboard</span>
          </a>
          <a class={linkClass("/app/upload")} href="/app/upload" aria-current={pathname.startsWith("/app/upload") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">cloud_upload</span>
            <span class="text-sm font-medium">Upload</span>
          </a>
          <a class={linkClass("/app/playlists")} href="/app/playlists" aria-current={pathname.startsWith("/app/playlists") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">queue_music</span>
            <span class="text-sm font-medium">Playlists</span>
          </a>
          <a class={linkClass("/app/billing")} href="/app/billing" aria-current={pathname.startsWith("/app/billing") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">payments</span>
            <span class="text-sm font-medium">Billing</span>
          </a>
        </nav>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-auto pt-6 border-t border-[#30273a]">
        <form method="POST" action="/api/auth/logout">
          <button class="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#30273a] text-[#a99bbb] hover:text-white transition-colors" type="submit">
            <span class="material-symbols-outlined text-[24px]">logout</span>
            <span class="text-sm font-medium">Logout</span>
          </button>
        </form>
      </div>
    </div>
  </aside>

  <!-- Sidebar (mobile overlay) -->
  {#if mobileOpen}
    <button type="button" class="fixed inset-0 bg-black/50 z-40 md:hidden" aria-label="Close menu" on:click={closeMobile}></button>
  {/if}
  <aside id="mobile-sidebar" aria-hidden={!mobileOpen} class="md:hidden fixed top-0 left-0 h-full w-64 z-50 border-r border-[#30273a] bg-background-dark transform transition-transform duration-300" style:transform={mobileOpen ? 'translateX(0)' : 'translateX(-100%)'}>
    <div class="flex h-full flex-col justify-between p-4">
      <div class="flex flex-col gap-8">
        <!-- User/Brand -->
        <div class="flex items-center gap-3 px-2">
          <div
            class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20"
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMuj53epN26--imPfT-FfFDq0KQHkUG6O-3e3CIxD3rkn1x7xNFugGod2XHrrfhlGq-KjSOsUqZDU0-cIb5dhkZjJUQWn2xbJeDGJksC3R8EEPifIo-35ZGBNyDOkr_U4j5sod6KzhDuJu72-Dh7EAMB4dQAEPbDDJnTheOqNwDHkK6d4rgzpkGTHifKxAB_FmUdxHm6qjy_uCxXpYlnCJ-BoXU7Q5rWSUjz3kZBslg5gyBnGkdr8g5RsVjqHIDdJuqLI-zBqnBKaD');"
          ></div>
          <div class="flex flex-col">
            <h1 class="text-white text-lg font-bold leading-none tracking-tight">AI.DJ</h1>
            <p class="text-xs text-white/60 mt-1">{data.user.email}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-2">
          <a class={linkClass("/app/dashboard")} href="/app/dashboard" on:click={closeMobile} aria-current={pathname.startsWith("/app/dashboard") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">dashboard</span>
            <span class="text-sm font-medium">Dashboard</span>
          </a>
          <a class={linkClass("/app/upload")} href="/app/upload" on:click={closeMobile} aria-current={pathname.startsWith("/app/upload") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">cloud_upload</span>
            <span class="text-sm font-medium">Upload</span>
          </a>
          <a class={linkClass("/app/playlists")} href="/app/playlists" on:click={closeMobile} aria-current={pathname.startsWith("/app/playlists") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">queue_music</span>
            <span class="text-sm font-medium">Playlists</span>
          </a>
          <a class={linkClass("/app/billing")} href="/app/billing" on:click={closeMobile} aria-current={pathname.startsWith("/app/billing") ? "page" : undefined}>
            <span class="material-symbols-outlined text-[24px]">payments</span>
            <span class="text-sm font-medium">Billing</span>
          </a>
        </nav>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-auto pt-6 border-t border-[#30273a]">
        <form method="POST" action="/api/auth/logout" on:submit={closeMobile}>
          <button class="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#30273a] text-[#a99bbb] hover:text-white transition-colors" type="submit">
            <span class="material-symbols-outlined text-[24px]">logout</span>
            <span class="text-sm font-medium">Logout</span>
          </button>
        </form>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col h-full relative overflow-hidden">
    <!-- Top Navigation -->
    <header class="flex items-center justify-between border-b border-[#30273a] px-6 py-4 bg-background-dark/80 backdrop-blur-md z-10 sticky top-0">
      <div class="flex items-center gap-4">
        <!-- Mobile Menu Button (Visible on small screens) -->
        <button class="md:hidden text-white" aria-label="Open menu" aria-controls="mobile-sidebar" aria-expanded={mobileOpen} on:click={() => (mobileOpen = !mobileOpen)}>
          <span class="material-symbols-outlined">menu</span>
        </button>
        <div class="flex items-center gap-3 text-white">
          <span class="material-symbols-outlined text-primary">auto_fix_high</span>
          <h2 class="text-xl font-bold tracking-tight">{headerTitle}</h2>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <!-- Search -->
        <div class="hidden md:flex items-center bg-surface-dark rounded-full px-4 py-2 w-64 border border-[#30273a] focus-within:border-primary/50 transition-colors">
          <span class="material-symbols-outlined text-[#a99bbb] text-[20px]">search</span>
          <input class="bg-transparent border-none text-sm text-white focus:ring-0 w-full placeholder-[#a99bbb]" placeholder="Search tracks..." type="text" />
        </div>
        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button class="relative text-[#a99bbb] hover:text-white transition-colors" aria-label="Notifications">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-0 right-0 size-2 bg-primary rounded-full"></span>
          </button>
          <div
            class="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-[#30273a]"
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrq5Bm-gskA0rY2OPyg7DhhVaoZnTn6xYwV79ET5vUNP64DeXbaIqwNSYLMprKXuZhc904VM_XIY6AYHSUjuPiizqGvI_uG4tHbZo9w21VKTUIY3VvsEoP_MbNYf1VB8PRB5feh0wMsjUCtA_PF4UxbWMWwk_Vsz-qaNWs-N8hvvOiLRazutX_vXazETnK8S06Vlf-FqLZh9aWexI927zw2rjUPOk54yvTEmnTIDnuAYkhciP3LwJfSguGmfj9u_BST6SQRt305QrH');"
          ></div>
        </div>
      </div>
    </header>

    <!-- Scrollable Workspace -->
    <div class="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
      <slot />
    </div>
  </main>
</div>
