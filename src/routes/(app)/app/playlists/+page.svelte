<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import EmptyState from "$lib/components/molecules/EmptyState.svelte";
	import Spinner from "$lib/components/atoms/Spinner.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	export let data: { playlists: Array<any> };
	let loading = false;
	onMount(() => {
		// placeholder in case we add client actions later
	});
</script>

<div class="space-y-4">
	<h1 class="text-3xl font-black">Your Playlists</h1>

	{#if loading}
		<div class="flex items-center gap-2 text-[#a99bbb]"><Spinner /> Loading…</div>
	{:else if !data.playlists?.length}
		<EmptyState>No playlists yet. Generate one from the Upload page.</EmptyState>
	{:else}
		<div class="grid gap-4">
			{#each data.playlists as pl}
				<Card>
					<a class="block" href={`/app/playlists/${pl._id}`}>
						<div class="flex items-center justify-between">
							<div>
								<div class="font-semibold">{pl.title}</div>
								<div class="text-xs text-[#a99bbb]">{pl.bpm_range} • {pl.vibe} • {pl.event_type}</div>
							</div>
							<div class="text-xs text-[#a99bbb]">{new Date(pl.created_at).toLocaleString()}</div>
						</div>
					</a>
				</Card>
			{/each}
		</div>
	{/if}
</div>