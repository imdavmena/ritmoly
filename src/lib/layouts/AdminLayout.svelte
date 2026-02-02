<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
  export let data: any;
</script>

<div class="mx-auto max-w-6xl px-4 py-8 space-y-6">
  <div class="flex items-center justify-between">
    <div class="font-bold">Admin</div>
    <a class="text-sm text-zinc-300 hover:text-white" href="/app/dashboard">← Back to App</a>
  </div>

  <div class="grid gap-4 md:grid-cols-[220px_1fr]">
    <Card>
      <div class="space-y-2 text-sm">
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/admin/dashboard">Dashboard</a>
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/admin/plans">Plans</a>
        <a class="block rounded-lg px-2 py-1 hover:bg-zinc-900" href="/admin/payments">Payments</a>
      </div>
    </Card>
    <div><slot /></div>
  </div>
</div>
