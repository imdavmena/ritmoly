<script lang="ts">
  import Input from "./Input.svelte";
  export let label = "Password";
  export let value = "";
  export let name = "password";
  export let error: string | null = null;

  let show = false;
</script>

<div class="space-y-2">
  <Input {label} bind:value type={show ? "text" : "password"} {name} {error} />
  <button type="button" class="text-xs text-zinc-400 hover:text-white" on:click={() => (show = !show)}>
    {show ? "Hide" : "Show"} password
  </button>
</div>
