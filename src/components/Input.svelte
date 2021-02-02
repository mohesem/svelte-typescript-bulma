<script>
  import Help from "./Help.svelte";
  //  COLOR
  /**
   * @type {"primary" | "link" | "info" | "warning" | "success" | "danger" }
   */
  export let color = "";
  /**
   * @type {"is-primary" | "is-link" | "is-info" | "is-warning" | "is-success" | "is-danger" | ""}
   */
  $: _color = color ? `is-${color}` : "";

  // SIZE
  /**
   * @type { 'small' | 'normal'| 'medium' | 'large' }
   */
  export let size = "normal";
  /**
   * @type { 'is-small' | 'is-normal' | 'is-medium' | 'is-large' }
   */
  $: _size = `is-${size}`;

  // ROUNDED
  export let round = false;
  $: _round = round ? "is-rounded" : null;

  // LOADING
  export let loading = false;
  $: _loading = loading ? "is-loading" : null;

  // NOTIFS
  export let notifs = [];

  // PROPS
  export let readonly = false;
  export let label = "";
  export let name = "";
  export let id = "";
  export let placeholder = "";
  export let value = "";

  /**
   * @type { 'text' | 'password' }
   */
  export let t = "text";

  // ==>
  const defaultClass = "input";
  $: finalClasses = `${defaultClass} ${_color} ${_size} ${_round} ${_loading}`
    .replace(/  +/g, " ")
    .trim();
</script>

<div class="field">
  <label class="label" for={name}>{label}</label>
  <div class="control">
    {#if (t = 'password')}
      <input
        class={finalClasses}
        type="password"
        {placeholder}
        {id}
        {name}
        {readonly}
        bind:value
        on:input
        on:blur />
    {:else}
      <input
        class={finalClasses}
        type="text"
        {placeholder}
        {id}
        {name}
        {readonly}
        bind:value
        on:input
        on:blur />
    {/if}
  </div>
  {#each notifs as n}
    <Help color={n.color} message={n.message} />
  {/each}
</div>
