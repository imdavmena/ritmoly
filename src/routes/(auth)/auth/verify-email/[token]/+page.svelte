<script lang="ts">
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast } from "$lib/stores/toast";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	let status: "idle" | "ok" | "err" = "idle";
	let message = "Verifying your email...";

	onMount(async () => {
		const token = $page.params.token;
		const res = await fetch("/api/auth/verify-email", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token })
		});
		const data = await res.json();
		if (!data.ok) {
			status = "err";
			message = data.message ?? "Verification failed";
			toast(message, "err");
			return;
		}
		status = "ok";
		message = "Email verified. You can now login.";
		toast(message, "ok");
	});

	async function goLogin() { await goto("/auth/login"); }
</script>

<div class="space-y-4">
	<h1 class="text-2xl font-black">Verify email</h1>
	<p class="text-[#a99bbb]">{message}</p>
	<div>
		<Button variant="primary" on:click={goLogin}>Go to login</Button>
	</div>
	{#if status === "err"}
		<div class="text-sm text-red-400">If the link expired, request a new one via Forgot password.</div>
	{/if}
</div>