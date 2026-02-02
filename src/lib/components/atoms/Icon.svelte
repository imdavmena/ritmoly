<!-- Material Symbols Outlined icon wrapper -->
<script lang="ts">
  export let name = "star";
  export let size: number | string = 24; // tailwind not needed for sizing here
  export let filled = true; // maps to FILL axis
  export let className = "";
</script>

<span class={`material-symbols-outlined ${className}`} style={`font-size:${size}px;`} aria-hidden="true">
  {name}
</span>
