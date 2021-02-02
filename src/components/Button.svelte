<script>
  /**
   * Specify the kind of button
   * @type {"primary" | "secondary" | "tertiary"}
   */
  export let kind = "primary";

  export let label = "";
  export let color = "red";
</script>

<button
  class="button is-danger {color} {kind}"
  on:click={() => {
    color = 'red';
  }}>
  {label}
</button>
