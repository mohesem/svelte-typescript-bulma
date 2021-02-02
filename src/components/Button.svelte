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

  // SIZE
  /**
   * @type { 'small' | 'normal'| 'medium' | 'large' }
   */
  export let size = "normal";
  /**
   * @type { 'is-small' | 'is-normal' | 'is-medium' | 'is-large' }
   */
  $: _size = `is-${size}`;

  // LABEL
  /**
   * @type { string}
   */
  export let label = "";

  // BLOCK
  /** Specify whether the button should be block*/
  export let block = false;
  $: _block = block ? "is-fullwidth" : null;

  // OUTLINE
  export let outline = false;
  $: _outline = outline ? "is-outlined" : null;

  // INVERT
  export let invert = false;
  $: _invert = invert ? "is-inverted" : null;

  // ROUNDED
  export let round = false;
  $: _round = round ? "is-rounded" : null;

  // LOADING
  export let loading = false;
  $: _loading = loading ? "is-loading" : null;

  // STATIC
  // static keyword is reserved
  export let freeze = false;
  $: _freeze = freeze ? "is-static" : null;

  // DISABLED
  export let disabled = false;

  // ID
  /**
   * @type { string}
   */
  export let id = "";
  // NAME
  /**
   * @type { string}
   */
  export let name = "";

  // ==>
  const defaultClass = "button";
  $: finalClasses = `${defaultClass} ${_color} ${_theme} ${_size} ${_block} ${_outline} ${_invert} ${_round} ${_loading} ${_freeze}`
    .replace(/  +/g, " ")
    .trim();
</script>

<button class={finalClasses} {disabled} {id} {name} on:click>
  {label}
  <slot /></button>
