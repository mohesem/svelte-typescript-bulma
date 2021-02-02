<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { backOut } from "svelte/easing";

  import Notification from "./Notification.svelte";
  import Text from "./Text.svelte";

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

  // TODO: resolve type
  // _id : number
  // msg: string
  // color : Color
  // theme : Theme
  let toasts = [];
  let retainMs = 3500;

  // TODO: add types
  // msg: string
  // color: string
  // theme: string

  const pushToast = (err) => {
    console.log("======", err);
    toasts = [
      ...toasts,
      {
        _id: ++toastId,
        msg: err.msg,
        color: err.color,
        theme: err.theme,
      },
    ];
    setTimeout(() => {
      unshiftToast();
    }, retainMs);
  };

  const unshiftToast = () => {
    toasts = toasts.filter((_a, i) => i > 0); // 새로운 할당
  };

  onMount(() => {
    // @ts-ignore
    window.pushToast = pushToast;
  });
</script>

<style>
  .toast-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: 9999;
  }
  .toast-item {
    border-radius: 4px;
    padding: 0px;
    margin: 10px auto;
    max-width: 400px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
</style>

<div class="toast-wrapper">
  {#each toasts as toast (toast._id)}
    <div
      class="notification {_color} {_theme} toast-item"
      in:fly={{ delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut }}
      out:fade={{ duration: 500, opacity: 0 }}>
      <Notification color={toast.color}>
        <Text>{toast.msg}</Text>
      </Notification>
    </div>
  {/each}
</div>
