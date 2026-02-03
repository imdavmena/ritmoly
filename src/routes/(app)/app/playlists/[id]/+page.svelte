<script lang="ts">
	import Card from "$lib/components/atoms/Card.svelte";
	import Badge from "$lib/components/atoms/Badge.svelte";
	import Tabs from "$lib/components/atoms/Tabs.svelte";
	export let data: { playlist: any };
	const pl = data.playlist;
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-black">{pl.title}</h1>
			<div class="text-sm text-[#a99bbb]">
				{pl.bpm_range} • {pl.duration_minutes} min • {pl.vibe} • {pl.event_type}
			</div>
		</div>
		<Badge>{new Date(pl.created_at).toLocaleString()}</Badge>
	</div>

	{#each pl.sections as section}
		<Card>
			<div class="mb-3 font-semibold">{section.name}</div>
			<div class="space-y-3">
				{#each section.tracks as t, i}
					<div class="rounded-lg border border-white/10 p-3">
						<div class="flex items-center justify-between gap-3">
							<div class="font-medium">{i + 1}. {t.artist} — {t.title}</div>
							{#if t.preview_url}
								<audio class="h-8" src={t.preview_url} controls preload="none"></audio>
							{/if}
						</div>
						<div class="mt-2 grid gap-2 md:grid-cols-2">
							<div class="text-xs text-[#a99bbb]"><span class="font-semibold text-white">Reason:</span> {t.reason}</div>
							<div class="text-xs text-[#a99bbb]"><span class="font-semibold text-white">Mix note:</span> {t.mix_note}</div>
						</div>
						<div class="mt-2 flex flex-wrap gap-2 text-xs">
							{#if t.platform_links?.spotify}<a class="underline text-[#a99bbb] hover:text-white" href={t.platform_links.spotify} target="_blank" rel="noopener">Spotify</a>{/if}
							{#if t.platform_links?.beatport}<a class="underline text-[#a99bbb] hover:text-white" href={t.platform_links.beatport} target="_blank" rel="noopener">Beatport</a>{/if}
							{#if t.platform_links?.soundcloud}<a class="underline text-[#a99bbb] hover:text-white" href={t.platform_links.soundcloud} target="_blank" rel="noopener">SoundCloud</a>{/if}
							{#if t.platform_links?.youtube}<a class="underline text-[#a99bbb] hover:text-white" href={t.platform_links.youtube} target="_blank" rel="noopener">YouTube</a>{/if}
						</div>
					</div>
				{/each}
			</div>
		</Card>
	{/each}
</div>