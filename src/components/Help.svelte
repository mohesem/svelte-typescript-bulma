<script>
  // COLOR
  /**
   * @type {"primary" | "link" | "info" | "warning" | "success" | "danger" }
   */
  export let color = "";
  /**
   * @type {"is-primary" | "is-link" | "is-info" | "is-warning" | "is-success" | "is-danger" | ""}
   */
  $: _color = color ? `is-${color}` : "";

  // MESSAGE
  export let message = "";

  // ==>
  const defaultClass = "help";
  $: finalClasses = `${defaultClass} ${_color}`.replace(/  +/g, " ").trim();
</script>

<p class={finalClasses}>{message}</p>
