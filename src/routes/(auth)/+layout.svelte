<script lang="ts">
  import AuthLayout from "$lib/layouts/AuthLayout.svelte";
  export let data;
</script>
<AuthLayout {data}><slot/></AuthLayout>
