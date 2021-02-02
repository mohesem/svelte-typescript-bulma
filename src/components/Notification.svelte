<script>
  //  COLOR
  /**
   * @type {"primary" | "link" | "info" | "warning" | "success" | "danger" }
   */
  export let color = "";
  /**
   * @type {"is-primary" | "is-link" | "is-info" | "is-warning" | "is-success" | "is-danger" | ""}
   */
  $: _color = color ? `is-${color}` : "";

  // THEME
  /**
   * @type { 'white' | 'light'| 'dark'| 'black' | 'text' | 'ghost' }
   */
  export let theme = "";
  /**
   * @type { 'is-white' | 'is-light'| 'is-dark'  | 'is-black'   | 'is-text'   | 'is-ghost'   | '' }
   */
  $: _theme = theme ? `is-${theme}` : null;

  // ==>
  const defaultClass = "notification";
  $: finalClasses = `${defaultClass} ${_color} ${_theme}`
    .replace(/  +/g, " ")
    .trim();
</script>

<div class={finalClasses}>
  <slot />
</div>
