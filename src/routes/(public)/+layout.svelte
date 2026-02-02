<script lang="ts">
  import PublicLayout from "$lib/layouts/PublicLayout.svelte";
  export let data;
</script>
<PublicLayout {data}><slot/></PublicLayout>
