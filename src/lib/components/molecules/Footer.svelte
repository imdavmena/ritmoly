<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="border-t border-white/5 bg-background-dark/40">
	<div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
		<div class="space-y-3">
			<a href="/" class="flex items-center gap-2 font-black">
				<img src="/logo.svg" alt="RITMOLY" class="h-8 w-8" loading="lazy" />
				<span>RITMOLY</span>
			</a>
			<p class="text-sm text-zinc-400">AI DJ Playlist Builder</p>
		</div>

		<div>
			<div class="mb-3 text-sm font-semibold text-zinc-300">Product</div>
			<ul class="space-y-2 text-sm text-zinc-400">
				<li><a class="hover:text-white" href="/about">About</a></li>
				<li><a class="hover:text-white" href="/contact">Contact</a></li>
				<li><a class="hover:text-white" href="/#pricing">Pricing</a></li>
			</ul>
		</div>

		<div>
			<div class="mb-3 text-sm font-semibold text-zinc-300">Resources</div>
			<ul class="space-y-2 text-sm text-zinc-400">
				<li><a class="hover:text-white" href="/auth/register">Create account</a></li>
				<li><a class="hover:text-white" href="/auth/login">Login</a></li>
			</ul>
		</div>

		<div>
			<div class="mb-3 text-sm font-semibold text-zinc-300">Community</div>
			<ul class="space-y-2 text-sm text-zinc-400">
				<li><a class="hover:text-white" href="https://x.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
				<li><a class="hover:text-white" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
			</ul>
		</div>
	</div>

	<div class="border-t border-white/5">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-zinc-500">
			<div>© {year} RITTMOLY. All rights reserved.</div>
			<div class="flex gap-4">
				<a class="hover:text-white" href="/terms">Terms</a>
				<a class="hover:text-white" href="/privacy">Privacy</a>
			</div>
		</div>
	</div>
</footer>