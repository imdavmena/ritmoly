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

  // Live validations
  $: emailError = email.length === 0
    ? null
    : (/^\S+@\S+\.\S+$/.test(email) ? null : "Invalid email format");

  function getPasswordIssues(pw: string) {
    const issues: string[] = [];
    if (pw.length < 8) issues.push("At least 8 characters");
    if (!/[A-Z]/.test(pw)) issues.push("One uppercase letter");
    if (!/[a-z]/.test(pw)) issues.push("One lowercase letter");
    if (!/[0-9]/.test(pw)) issues.push("One number");
    if (!/[^A-Za-z0-9]/.test(pw)) issues.push("One symbol");
    return issues;
  }
  $: pwIssues = password.length === 0 ? [] : getPasswordIssues(password);
  $: passwordError = password.length === 0 ? null : (pwIssues.length ? "Password is too weak" : null);
  $: confirmError = confirm.length === 0 ? null : (confirm !== password ? "Passwords do not match" : null);

  async function submit() {
    if (emailError) return toast(emailError, "err");
    if (pwIssues.length) return toast("Password is too weak", "err");
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

<form class="mt-6 space-y-3" on:submit|preventDefault={submit}>
  <Input label="Email" bind:value={email} type="email" error={emailError} />
  <div>
    <PasswordInput label="Password" bind:value={password} error={passwordError} />
    {#if password.length > 0}
      <ul class="mt-2 space-y-1 text-xs">
        <li class={password.length >= 8 ? "text-green-400" : "text-red-400"}>• At least 8 characters</li>
        <li class={/[A-Z]/.test(password) ? "text-green-400" : "text-red-400"}>• One uppercase letter</li>
        <li class={/[a-z]/.test(password) ? "text-green-400" : "text-red-400"}>• One lowercase letter</li>
        <li class={/[0-9]/.test(password) ? "text-green-400" : "text-red-400"}>• One number</li>
        <li class={/[^A-Za-z0-9]/.test(password) ? "text-green-400" : "text-red-400"}>• One symbol</li>
      </ul>
    {/if}
  </div>
  <PasswordInput label="Confirm password" bind:value={confirm} error={confirmError} />
  <Button type="submit" variant="primary" loading={loading}>Create account</Button>
  <div class="flex justify-between text-sm">
    <span></span>
    <a class="text-white/80 hover:text-white" href="/auth/login">Have an account? Login</a>
  </div>
</form>
