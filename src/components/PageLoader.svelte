<style>
  :fullscreen {
    width: 100%;
    height: 100%;
    background: white;
  }

  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script>
  import { fade } from 'svelte/transition';
</script>

<div class="fullscreen" in:fade out:fade>
  <div class="centered">
    <span class="title">
      loading ...
    </span>
  </div>
</div>
