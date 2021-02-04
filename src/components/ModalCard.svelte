<script>
  import { createEventDispatcher } from "svelte";

  export let visibility = false;
  /**
   *@default () =>  { visibility = false; }
   */
  /* export let onClose = () => { */
  /*   console.log("clicked"); */
  /*   /1* visibility = false; *1/ */
  /* }; */

  const dispatch = createEventDispatcher();

  $: {
    dispatch("visibility", visibility);
  }
</script>

<div class="modal" class:is-active={visibility}>
  <div
    class="modal-background"
    on:click={() => {
      visibility = false;
    }} />
  <div class="modal-card">
    <slot />
  </div>
</div>
