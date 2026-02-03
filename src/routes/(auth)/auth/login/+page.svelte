<script lang="ts">
  import { toast } from "$lib/stores/toast";
  import { goto } from "$app/navigation";
  import { assets } from "$app/paths";

  let email = "";
  let password = "";
  // let remember = false;
  let loading = false;

  async function submit() {
    loading = true;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    loading = false;

    if (!data.ok) return toast(data.message ?? "Login failed", "err");
    toast("Welcome back!", "ok");
    await goto("/app/dashboard");
  }
</script>

<div class="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
  <!-- subtle grid overlay -->
  <div class="pointer-events-none absolute inset-0 opacity-[0.07]" style="background-image: linear-gradient(to right, #23262d 1px, transparent 1px), linear-gradient(to bottom, #23262d 1px, transparent 1px); background-size: 40px 40px;"></div>
  <!-- glow blobs -->
  <div class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[280px] sm:w-[620px] sm:h-[380px] md:w-[800px] md:h-[500px] bg-primary/20 blur-[100px] md:blur-[120px] rounded-full -z-10"></div>
  <div class="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[500px] md:h-[400px] bg-secondary/10 blur-[80px] md:blur-[100px] rounded-full -z-10"></div>

  <div class="relative z-10 w-full max-w-md">
    <!-- Brand -->
    <div class="flex flex-col items-center mb-6 sm:mb-10">
      <div class="w-16 h-16 bg-surface-dark  flex items-center justify-center mb-4">
        <img src={`${assets}/logo.svg`} alt="Ritmoly" class="w-10 h-10" />
      </div>
      <h1 class="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">RITMOLY</h1>
      <p class="text-[#a99bbb] mt-2 text-sm text-center">AI-powered mixing assistant</p>
    </div>

    <!-- Card -->
    <div class="bg-surface-dark/80 backdrop-blur-xl border border-[#30273a] rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>
      <h2 class="text-lg sm:text-xl font-bold text-white mb-6 text-center">Welcome back</h2>

      <form class="space-y-5" on:submit|preventDefault={submit}>
        <!-- Email -->
        <div>
          <label for="email" class="block text-xs font-medium text-[#a99bbb] uppercase tracking-wider mb-1.5 ml-1">Email address</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-[#8b7aa3] group-focus-within:text-primary transition-colors text-xl">alternate_email</span>
            </div>
            <input id="email" name="email" type="email" autocomplete="email" required bind:value={email}
              class="block w-full pl-10 pr-3 py-3 bg-surface-dark border border-[#30273a] rounded-lg text-white placeholder-[#8b7aa3] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm transition-all shadow-inner"
              placeholder="dj.name@example.com" />
          </div>
        </div>

        <!-- Password -->
        <div>
          <div class="flex items-center justify-between mb-1.5 ml-1">
            <label for="password" class="block text-xs font-medium text-[#a99bbb] uppercase tracking-wider">Password</label>
            <div class="text-xs">
              <a href="/auth/forgot-password" class="font-medium text-primary hover:text-primary-hover transition-colors">Forgot password?</a>
            </div>
          </div>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-[#8b7aa3] group-focus-within:text-primary transition-colors text-xl">lock</span>
            </div>
            <input id="password" name="password" type="password" autocomplete="current-password" required bind:value={password}
              class="block w-full pl-10 pr-3 py-3 bg-surface-dark border border-[#30273a] rounded-lg text-white placeholder-[#8b7aa3] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm transition-all shadow-inner"
              placeholder="••••••••" />
          </div>
        </div>

        <!-- Remember
        <div class="flex items-center ml-1">
          <input id="remember-me" name="remember-me" type="checkbox" bind:checked={remember}
            class="h-4 w-4 text-primary bg-surface-dark border-[#463a55] rounded focus:ring-primary focus:ring-offset-0" />
          <label for="remember-me" class="ml-2 block text-sm text-[#a99bbb] select-none">Remember me for 30 days</label>
        </div> -->

        <!-- Submit -->
        <button type="submit"
          class="w-full flex justify-center py-3.5 px-4 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all border border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}>
          {#if loading}
            <span class="material-symbols-outlined animate-spin mr-2">progress_activity</span>
          {/if}
          Log in
        </button>
      </form>

      <!-- Divider -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-[#30273a]"></div></div>
          <div class="relative flex justify-center text-sm"><span class="px-2 bg-surface-dark text-[#8b7aa3]">Or continue with</span></div>
        </div>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/api/auth/oauth/google" class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg bg-surface-dark border border-[#30273a] text-sm font-medium text-[#c9c3d6] hover:bg-white/5 transition-colors hover:text-white hover:border-[#5a4b6e]">
            <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></svg>
            <span class="ml-2">Google</span>
          </a>
          <a href="/api/auth/oauth/spotify" class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg bg-surface-dark border border-[#30273a] text-sm font-medium text-[#c9c3d6] hover:bg-white/5 transition-colors hover:text-white hover:border-[#5a4b6e]">
            <svg class="h-5 w-5 text-[#1DB954]" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.38 9.841-.719 13.44 1.56.42.24.6.841.301 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>
            <span class="ml-2">Spotify</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center">
      <p class="text-sm text-[#a99bbb]">Don't have an account? <a href="/auth/register" class="font-medium text-primary hover:text-primary-hover transition-colors">Sign up for free</a></p>
      <div class="mt-6 flex justify-center space-x-6 text-xs text-[#8b7aa3]">
        <a class="hover:text-white transition-colors" href="/terms">Terms of Service</a>
        <span class="text-[#5a4b6e]">•</span>
        <a class="hover:text-white transition-colors" href="/privacy">Privacy Policy</a>
        <span class="text-[#5a4b6e]">•</span>
        <a class="hover:text-white transition-colors" href="/help">Help</a>
      </div>
    </div>
  </div>

  <!-- bars animation -->
  <div class="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center space-x-1 opacity-20 pointer-events-none">
    <div class="w-2 h-4 bg-primary rounded-t animate-[pulse_1.5s_ease-in-out_infinite]"></div>
    <div class="w-2 h-8 bg-secondary rounded-t animate-[pulse_1.2s_ease-in-out_infinite]"></div>
    <div class="w-2 h-6 bg-primary rounded-t animate-[pulse_1.8s_ease-in-out_infinite]"></div>
    <div class="w-2 h-10 bg-secondary rounded-t animate-[pulse_1.4s_ease-in-out_infinite]"></div>
    <div class="w-2 h-5 bg-primary rounded-t animate-[pulse_2.0s_ease-in-out_infinite]"></div>
    <div class="w-2 h-9 bg-secondary rounded-t animate-[pulse_1.1s_ease-in-out_infinite]"></div>
    <div class="w-2 h-3 bg-primary rounded-t animate-[pulse_1.6s_ease-in-out_infinite]"></div>
    <div class="w-2 h-7 bg-secondary rounded-t animate-[pulse_1.3s_ease-in-out_infinite]"></div>
    <div class="w-2 h-12 bg-primary rounded-t animate-[pulse_1.9s_ease-in-out_infinite]"></div>
    <div class="w-2 h-6 bg-secondary rounded-t animate-[pulse_1.7s_ease-in-out_infinite]"></div>
  </div>
</div>
