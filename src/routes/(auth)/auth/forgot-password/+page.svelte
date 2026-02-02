<script lang="ts">
	import Input from "$lib/components/atoms/Input.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast } from "$lib/stores/toast";
	import { goto } from "$app/navigation";

	let email = "";
	let loading = false;

	async function submit() {
		loading = true;
		const res = await fetch("/api/auth/forgot-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email })
		});
		const data = await res.json();
		loading = false;

		if (!data.ok) return toast(data.message ?? "Request failed", "err");
		toast("If the email exists, a reset link was sent.", "ok");
		await goto("/auth/login");
	}
</script>

<h1 class="text-2xl font-black">Forgot password</h1>
<p class="mt-1 text-sm text-[#a99bbb]">We’ll email you a reset link.</p>

<div class="mt-6 space-y-3">
	<Input label="Email" bind:value={email} type="email" />
	<Button variant="primary" loading={loading} on:click={submit}>Send reset link</Button>
	<div class="text-sm">
		<a class="text-white/80 hover:text-white" href="/auth/login">Back to login</a>
	</div>
</div>