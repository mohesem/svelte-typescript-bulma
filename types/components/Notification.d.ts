/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface NotificationProps {
  /**
   * @default ""
   */
  color?: "primary" | "link" | "info" | "warning" | "success" | "danger";

  /**
   * @default ""
   */
  theme?: "white" | "light" | "dark" | "black" | "text" | "ghost";
}

export default class Notification extends SvelteComponentTyped<
  NotificationProps,
  {},
  { default: {} }
> {}
