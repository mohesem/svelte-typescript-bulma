/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ToastProps {
  /**
   * @default ""
   */
  color?: "primary" | "link" | "info" | "warning" | "success" | "danger";

  /**
   * @default ""
   */
  theme?: "white" | "light" | "dark" | "black" | "text" | "ghost";
}

export default class Toast extends SvelteComponentTyped<ToastProps, {}, {}> {}
