<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
  import UploadDropzone from "$lib/components/molecules/UploadDropzone.svelte";
  import Button from "$lib/components/atoms/Button.svelte";
  import Dropdown from "$lib/components/atoms/Dropdown.svelte";
  import Input from "$lib/components/atoms/Input.svelte";
  import { toast } from "$lib/stores/toast";
  import { goto } from "$app/navigation";

  let upload: any = null;
  let duration_minutes: "30" | "60" | "90" = "60";
  let vibe = "groovy tech house";
  let bpm_range = "124-128";
  let event_type = "club";

  let loading = false;

  async function generate() {
    if (!upload) return toast("Upload metadata first", "err");
    loading = true;
    const res = await fetch("/api/playlist/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upload_id: upload._id, duration_minutes: Number(duration_minutes), vibe, bpm_range, event_type })
    });
    const data = await res.json();
    loading = false;

    if (!data.ok) return toast(data.message ?? "Generate failed", "err");
    toast("Playlist generated!", "ok");
    await goto(`/app/playlists/${data.playlist._id}`);
  }
</script>

<div class="space-y-4">
  <h1 class="text-3xl font-black">Upload</h1>

  <Card>
    <UploadDropzone onUploaded={(u) => (upload = u)} />
  </Card>

  <Card>
    <div class="grid gap-4 md:grid-cols-2">
      <Dropdown label="Duration" bind:value={duration_minutes}
        items={[{label:"30 min",value:"30"},{label:"60 min",value:"60"},{label:"90 min",value:"90"}]}
      />
      <Input label="Vibe" bind:value={vibe} />
      <Input label="BPM range" bind:value={bpm_range} />
      <Input label="Event type" bind:value={event_type} />
    </div>

    <div class="mt-4">
      <Button variant="primary" loading={loading} on:click={generate}>Generate playlist</Button>
    </div>
  </Card>
</div>
