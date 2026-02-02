<script lang="ts">
  import AppLayout from "$lib/layouts/AppLayout.svelte";
  export let data;
</script>
<AppLayout {data}><slot/></AppLayout>
