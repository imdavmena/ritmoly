<script lang="ts">
  import { toasts } from "$lib/stores/toast";
</script>

<div class="fixed right-4 top-4 z-[60] space-y-2">
  {#each $toasts as t (t.id)}
    <div class={`rounded-xl border px-4 py-2 text-sm ${t.type === "ok"
        ? "border-emerald-500/40 bg-emerald-500/10"
        : "border-red-500/40 bg-red-500/10"}`}>
      {t.msg}
    </div>
  {/each}
</div>
