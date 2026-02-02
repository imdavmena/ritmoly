<script lang="ts">
	import PasswordInput from "$lib/components/atoms/PasswordInput.svelte";
	import Button from "$lib/components/atoms/Button.svelte";
	import { toast } from "$lib/stores/toast";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	let newPassword = "";
	let confirm = "";
	let loading = false;

	async function submit() {
		if (newPassword !== confirm) return toast("Passwords do not match", "err");
		loading = true;
		const token = $page.params.token;
		const res = await fetch("/api/auth/reset-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token, new_password: newPassword })
		});
		const data = await res.json();
		loading = false;

		if (!data.ok) return toast(data.message ?? "Reset failed", "err");
		toast("Password updated. Please login.", "ok");
		await goto("/auth/login");
	}
</script>

<h1 class="text-2xl font-black">Reset password</h1>
<p class="mt-1 text-sm text-[#a99bbb]">Choose a new password.</p>

<div class="mt-6 space-y-3">
	<PasswordInput label="New password" bind:value={newPassword} />
	<PasswordInput label="Confirm password" bind:value={confirm} />
	<Button variant="primary" loading={loading} on:click={submit}>Update password</Button>
	<div class="text-sm">
		<a class="text-white/80 hover:text-white" href="/auth/login">Back to login</a>
	</div>
</div>