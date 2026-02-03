<script lang="ts">
  import Input from "$lib/components/atoms/Input.svelte";
  import PasswordInput from "$lib/components/atoms/PasswordInput.svelte";
  import Button from "$lib/components/atoms/Button.svelte";
  import { toast } from "$lib/stores/toast";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let loading = false;

  async function submit() {
    loading = true;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    loading = false;

    if (!data.ok) return toast(data.message ?? "Login failed", "err");
    toast("Welcome back!", "ok");
    await goto("/app/dashboard");
  }
</script>

<h1 class="text-2xl font-black">Login</h1>
<p class="mt-1 text-sm text-[#a99bbb]">Access your dashboard.</p>

<form class="mt-6 space-y-3" on:submit|preventDefault={submit}>
  <Input label="Email" bind:value={email} type="email" />
  <PasswordInput label="Password" bind:value={password} />
  <Button type="submit" variant="primary" loading={loading}>Login</Button>
  <div class="flex justify-between text-sm">
    <a class="text-white/80 hover:text-white" href="/auth/forgot-password">Forgot password?</a>
    <a class="text-white/80 hover:text-white" href="/auth/register">Create account</a>
  </div>
</form>
