<script>
  import { createEventDispatcher } from "svelte";

  export let visibility = false;
  export let closeButton = false;
  // @ts-ignore
  /* export let onClose = () => { */
  /*   visibility = false; */
  /* }; */

  const dispatch = createEventDispatcher();

  $: {
    dispatch("visibility", visibility);
  }
  $: console.log({ visibility });
</script>

<div class="modal" class:is-active={visibility}>
  <div
    class="modal-background"
    on:click={() => {
      visibility = false;
    }} />
  <slot />
  {#if closeButton}
    <button
      class="modal-close is-large"
      aria-label="close"
      on:click={() => {
        visibility = false;
      }} />
  {/if}
</div>
