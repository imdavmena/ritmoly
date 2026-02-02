<script lang="ts">
  import Card from "$lib/components/atoms/Card.svelte";
  import Button from "$lib/components/atoms/Button.svelte";
  import SectionHeader from "$lib/components/molecules/SectionHeader.svelte";
  import PricingCards from "$lib/components/molecules/PricingCards.svelte";
  import FeatureGrid from "$lib/components/molecules/FeatureGrid.svelte";
  import FAQAccordion from "$lib/components/molecules/FAQAccordion.svelte";
  import TestimonialCards from "$lib/components/molecules/TestimonialCards.svelte";
  export let data;

  const how = [
    { title: "Upload", desc: "Upload .mp3/.wav/.mp4 (metadata only stored)." },
    { title: "Generate", desc: "AI produces a DJ-ready set structure." },
    { title: "Play", desc: "Get platform links to listen or buy tracks." }
  ];
</script>

<svelte:head>
  <title>RITTMOLY — AI DJ Playlist Builder</title>
  <meta name="description" content="Upload a track and generate a DJ-ready playlist using AI (vibe, BPM, energy, groove)." />
  <meta name="keywords" content="AI DJ playlist generator, DJ setlist AI, music playlist generator for DJs, AI music curator, DJ software with AI" />
  <meta property="og:title" content="RITTMOLY — AI DJ Playlist Builder" />
  <meta property="og:description" content="Generate a DJ set playlist from a seed track." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="space-y-14">
  <section class="rounded-3xl border border-white/10 bg-surface/50 p-8">
    <div class="max-w-2xl space-y-4">
      <h1 class="text-4xl font-black tracking-tight"><span class="gradient-text">{data.t.hero.title}</span></h1>
      <p class="text-[#a99bbb]">{data.t.hero.subtitle}</p>
      <div class="flex gap-3">
        <a href="/auth/register"><Button variant="primary">{data.t.cta.start}</Button></a>
        <a href="/about"><Button variant="ghost">Learn more</Button></a>
      </div>
    </div>
  </section>

  <section>
    <SectionHeader title="How it works" subtitle="Fast MVP workflow: upload → generate → links." />
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      {#each how as h}
        <Card>
          <div class="text-lg font-bold">{h.title}</div>
          <div class="mt-1 text-sm text-[#a99bbb]">{h.desc}</div>
        </Card>
      {/each}
    </div>
  </section>

  <section>
    <SectionHeader title="Features" subtitle="Modular design system + scalable SaaS foundations." />
    <FeatureGrid />
  </section>

  <section id="pricing">
    <SectionHeader title={data.t.pricing.title} subtitle={data.t.pricing.subtitle} />
    <PricingCards />
  </section>

  <section>
    <SectionHeader title="Testimonials" subtitle="DJs love consistent vibe lineage." />
    <TestimonialCards />
  </section>

  <section>
    <SectionHeader title="FAQ" subtitle="Clear answers, no wizardry hidden." />
    <FAQAccordion />
  </section>

  <section class="rounded-3xl border border-white/10 bg-surface/60 p-8">
    <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <div class="text-2xl font-black">Ready to build your next set?</div>
        <div class="text-[#a99bbb]">Start free. Pay with Binance when you need more.</div>
      </div>
      <a href="/auth/register"><Button variant="primary">Create account</Button></a>
    </div>
  </section>
</div>
