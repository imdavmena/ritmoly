<script lang="ts">
  import Navbar from "$lib/components/molecules/Navbar.svelte";
  import Footer from "$lib/components/molecules/Footer.svelte";
  export let data: any;
</script>

<Navbar locale={data.locale} t={data.t} userEmail={data.user?.email ?? null}/>
<main class="mx-auto max-w-6xl px-4 py-8">
  <slot />
</main>
<Footer />
