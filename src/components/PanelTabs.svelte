<script>
  export let isActive = false;
  export let href = "";
</script>

<a class="panel-block" class:is-active={isActive} {href}>
  <slot />
</a>
