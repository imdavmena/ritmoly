<script lang="ts">
  export let error: any;
  export let status: number;
</script>

<h1>{status}</h1>
<pre>{error?.message}</pre>