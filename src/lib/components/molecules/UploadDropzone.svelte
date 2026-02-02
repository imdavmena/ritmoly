<script lang="ts">
  import Button from "$lib/components/atoms/Button.svelte";
  import { toast } from "$lib/stores/toast";

  export let onUploaded: (u: any) => void = () => {};
  let file: File | null = null;
  let loading = false;

  function pick(e: Event) {
    const t = e.target as HTMLInputElement;
    file = t.files?.[0] ?? null;
  }

  async function submitMeta() {
    if (!file) return toast("Select a file first", "err");
    loading = true;

    // MVP: enviamos metadata, NO archivo.
    const res = await fetch("/api/uploads/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        mime_type: file.type || "application/octet-stream",
        size_bytes: file.size
      })
    });

    const data = await res.json();
    loading = false;

    if (!data.ok) return toast(data.message ?? "Upload failed", "err");
    toast("Upload metadata saved (storage placeholder).", "ok");
    onUploaded(data.upload);
  }
</script>

<div class="space-y-3">
  <div class="text-sm text-[#a99bbb]">Select an audio/video file (.mp3, .wav, .mp4)</div>
  <input class="block w-full text-sm" type="file" accept=".mp3,.wav,.mp4,audio/*,video/*" on:change={pick} />
  <Button variant="secondary" loading={loading} on:click={submitMeta}>Save upload metadata</Button>

  <div class="text-xs text-[#a99bbb]">
    NOTE: Real binary upload is a placeholder. Use presigned uploads to S3/R2/Supabase Storage in production.
  </div>
</div>
