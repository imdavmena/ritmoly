<script lang="ts">
  export let variant: "solid" | "ghost" | "meta" = "solid";
</script>

<span class={`
  ${variant === 'solid' ? 'pill' : variant === 'ghost' ? 'pill-ghost' : 'meta-pill'}
`}>
  <slot />
</span>
