<script lang="ts">
  import SectionHeader from "$lib/components/molecules/SectionHeader.svelte";
  import StatsCard from "$lib/components/molecules/StatsCard.svelte";
  import Button from "$lib/components/atoms/Button.svelte";
  import IconButton from "$lib/components/atoms/IconButton.svelte";
  import SearchInput from "$lib/components/atoms/SearchInput.svelte";
  import Toggle from "$lib/components/atoms/Toggle.svelte";
  import RadioColor from "$lib/components/atoms/RadioColor.svelte";
  import RadioGroup from "$lib/components/molecules/RadioGroup.svelte";
  import Pill from "$lib/components/atoms/Pill.svelte";
  import TrackCard from "$lib/components/molecules/TrackCard.svelte";

  let query = "";
  let toggleA = true;
  let toggleB = false;
  let radioVal = "option1";
</script>

<div class="max-w-5xl mx-auto flex flex-col gap-16 pb-20">
  <SectionHeader title="Overview" subtitle="Live preview of the design system" icon="dashboard" />

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <StatsCard label="FONT FAMILY" value="Space Grotesk" />
    <StatsCard label="PRIMARY COLOR" value="#BC88FC" />
    <StatsCard label="DARK MODE" value="Enabled" />
    <StatsCard label="VERSION" value="1.0.0 Alpha" />
  </div>

  <hr class="border-white/10" />

  <SectionHeader title="Buttons" />
  <div class="p-6 rounded-xl bg-surface border border-white/5 flex flex-wrap gap-4 items-center">
    <Button variant="primary">Generate Mix</Button>
    <Button variant="secondary">Save Draft</Button>
    <Button variant="ghost">Cancel</Button>
    <IconButton icon="play_arrow" variant="primary" />
    <IconButton icon="settings" variant="surface" />
  </div>

  <SectionHeader title="Inputs" />
  <div class="p-6 rounded-xl bg-surface border border-white/5 grid gap-4">
    <SearchInput label="Search Track" bind:value={query} />
  </div>

  <SectionHeader title="Selection Controls" />
  <div class="p-6 rounded-xl bg-surface border border-white/5 flex flex-col gap-6">
    <div class="flex items-center justify-between p-3 rounded-lg bg-background-dark border border-white/5">
      <div class="flex flex-col">
        <span class="text-white text-sm font-medium">AI Transition Smoothing</span>
        <span class="text-[#a99bbb] text-xs">Automatically beatmatch tracks</span>
      </div>
      <Toggle bind:checked={toggleA} />
    </div>
    <div class="flex items-center justify-between p-3 rounded-lg bg-background-dark border border-white/5">
      <div class="flex flex-col">
        <span class="text-white text-sm font-medium">Explicit Content</span>
        <span class="text-[#a99bbb] text-xs">Allow explicit tracks</span>
      </div>
      <Toggle bind:checked={toggleB} />
    </div>

    <div>
      <p class="text-xs font-bold text-[#a99bbb] uppercase tracking-wider mb-3">Accent Color Preference</p>
      <div class="flex flex-wrap gap-4">
        <RadioColor name="accent" color="#121212" />
        <RadioColor name="accent" color="#bc88fc" checked />
        <RadioColor name="accent" color="#00e5ff" />
      </div>
    </div>

    <div>
      <p class="text-xs font-bold text-[#a99bbb] uppercase tracking-wider mb-3">Radio Group</p>
      <RadioGroup bind:value={radioVal} options={[{label:'Option 1', value:'option1'}, {label:'Option 2', value:'option2'}]} />
    </div>
  </div>

  <SectionHeader title="Pills / Tags" />
  <div class="flex flex-wrap gap-3">
    <Pill>AI</Pill>
    <Pill variant="ghost">Playlist</Pill>
    <Pill variant="meta">BPM: 128</Pill>
    <span class="meta-pill">KEY: Cmin</span>
  </div>

  <SectionHeader title="Gradient Text" />
  <h1 class="text-5xl font-black"><span class="gradient-text">Design System</span></h1>

  <SectionHeader title="Track Card" />
  <TrackCard />
</div>
