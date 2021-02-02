<script>
  //  COLOR
  /**
   * @type {"primary" | "link" | "info" | "warning" | "success" | "danger" | "black" | "dark" | "white" | "light" }
   */
  export let color = "";
  /**
   * @type {"is-primary" | "is-link" | "is-info" | "is-warning" | "is-success" | "is-danger" | "id-black" | "id-white" | "is-dark" | "is-light" | ''}
   */
  $: _color = color ? `is-${color}` : "";

  //
  export let defaultClass = "navbar";

  // remove extra spaces
  $: finalClasses = `${defaultClass} ${_color}`.replace(/  +/g, " ").trim();
</script>

<nav class={finalClasses} role="navigation" aria-label="main navigation">
  <slot />
</nav>
