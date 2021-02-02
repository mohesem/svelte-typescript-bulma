<script>
  export let href = "";
  export let value = "";
  export let active = false;
  $: _active = active ? "is-active" : null;

  // ==>
  const defaultClass = "navbar-item";
  $: finalClasses = `${defaultClass} ${_active}`.replace(/  +/g, " ").trim();
</script>

<a class={finalClasses} {href}>
  {value}
  <slot />
</a>
