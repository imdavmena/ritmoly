<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  import PasswordInput from "$lib/components/atoms/PasswordInput.svelte";
  import Button from "$lib/components/atoms/Button.svelte";
  import { toast } from "$lib/stores/toast";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let confirm = "";
  let loading = false;

  async function submit() {
    if (password !== confirm) return toast("Passwords do not match", "err");
    loading = true;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    loading = false;

    if (!data.ok) return toast(data.message ?? "Register failed", "err");
    toast("Registered! Check your email to verify.", "ok");
    await goto("/auth/login");
  }
</script>

<h1 class="text-2xl font-black">Create account</h1>
<p class="mt-1 text-sm text-[#a99bbb]">Start building playlists with RITTMOLY.</p>

<div class="mt-6 space-y-3">
  <Input label="Email" bind:value={email} type="email" />
  <PasswordInput label="Password" bind:value={password} />
  <PasswordInput label="Confirm password" bind:value={confirm} />
  <Button variant="primary" loading={loading} on:click={submit}>Create account</Button>
  <div class="flex justify-between text-sm">
    <span></span>
    <a class="text-white/80 hover:text-white" href="/auth/login">Have an account? Login</a>
  </div>
</div>
