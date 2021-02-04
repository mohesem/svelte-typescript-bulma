<script>
  export let title = "";
  export let closeButton = false;
</script>

<header class="modal-card-head">
  {#if title}
    <p class="modal-card-title">{title}</p>
  {/if}
  <slot />

  {#if closeButton}<button class="delete" aria-label="close" on:click />{/if}
</header>
