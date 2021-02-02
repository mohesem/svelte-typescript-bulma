<script lang="ts">
  export let centered = false;
</script>

<style>
  .centered {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="card" class:centered>
  <slot />
</div>
