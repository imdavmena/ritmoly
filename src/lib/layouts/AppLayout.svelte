<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
  export let data: any;
</script>

<div class="mx-auto max-w-6xl px-4 py-8 space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <div class="text-xs text-zinc-400">Signed in as</div>
      <div class="font-semibold">{data.user.email}</div>
    </div>
    <form method="POST" action="/api/auth/logout">
      <button class="rounded-xl border border-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-900" type="submit">
        Logout
      </button>
    </form>
  </div>

  <div class="grid gap-4 md:grid-cols-[220px_1fr]">
    <Card>
      <div class="space-y-2 text-sm">
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/app/dashboard">Dashboard</a>
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/app/upload">Upload</a>
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/app/playlists">Playlists</a>
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/app/billing">Billing</a>
      </div>
    </Card>
    <div><slot /></div>
  </div>
</div>
