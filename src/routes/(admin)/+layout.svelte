<script lang="ts">
  import AdminLayout from "$lib/layouts/AdminLayout.svelte";
  export let data;
</script>
<AdminLayout {data}><slot/></AdminLayout>
