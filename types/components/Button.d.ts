/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ButtonProps {
  /**
   * @default ""
   */
  color?: "primary" | "link" | "info" | "warning" | "success" | "danger";

  /**
   * @default ""
   */
  theme?: "white" | "light" | "dark" | "black" | "text" | "ghost";

  /**
   * @default "normal"
   */
  size?: "small" | "normal" | "medium" | "large";

  /**
   * @default ""
   */
  label?: string;

  /**
   * Specify whether the button should be block
   * @default false
   */
  block?: boolean;

  /**
   * @default false
   */
  outline?: boolean;

  /**
   * @default false
   */
  invert?: boolean;

  /**
   * @default false
   */
  round?: boolean;

  /**
   * @default false
   */
  loading?: boolean;

  /**
   * @default false
   */
  freeze?: boolean;

  /**
   * @default false
   */
  disabled?: boolean;

  /**
   * @default ""
   */
  id?: string;

  /**
   * @default ""
   */
  name?: string;
}

export default class Button extends SvelteComponentTyped<
  ButtonProps,
  { click: WindowEventMap["click"] },
  { default: {} }
> {}
