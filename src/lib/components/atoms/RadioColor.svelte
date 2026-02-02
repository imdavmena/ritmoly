<script lang="ts">
  export let color = "#bc88fc";
  export let name = "color-pref";
  export let checked = false;
</script>

<label class="group relative size-10 cursor-pointer">
  <input class="peer sr-only" type="radio" {name} {checked} />
  <div class="size-10 rounded-full border border-[var(--border,#463a55)] peer-checked:border-white peer-checked:ring-2 peer-checked:ring-white/50 transition-all" style={`background:${color}`}></div>
</label>
