<script>
  import Box from "./Box.svelte";
  import Button from "./Button.svelte";
  import ButtonGroup from "./ButtonGroup.svelte";

  // ACTIVE
  export let active = false;
  $: _active = active ? "is-active" : null;

  // ON CLOSE
  export let onClose = () => null;

  // ==>
  const defaultClass = "modal";
  $: finalClasses = `${defaultClass} ${_active}`.replace(/  +/g, " ").trim();
</script>

<div class={finalClasses}>
  <div class="modal-background" />
  <div class="modal-content">
    <Box>
      <slot />
      <ButtonGroup>
        <Button color="danger" on:click={onClose}>close</Button>
      </ButtonGroup>
    </Box>
  </div>
</div>
