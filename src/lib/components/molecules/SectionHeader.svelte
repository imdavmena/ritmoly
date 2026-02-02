<script lang="ts">
	export let title = "";
	export let subtitle: string | null = null;
	export let icon: string | null = null;
</script>

<header class="py-6">
	<div class="flex items-center gap-3">
		{#if icon}<span class="material-symbols-outlined text-primary">{icon}</span>{/if}
		<h2 class="text-white text-3xl font-bold tracking-tight">
			{title}
		</h2>
	</div>
	{#if subtitle}
		<p class="mt-2 text-[#a99bbb]">{subtitle}</p>
	{/if}
</header>