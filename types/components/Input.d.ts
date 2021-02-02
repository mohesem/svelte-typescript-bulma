/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface InputProps {
  /**
   * @default ""
   */
  color?: "primary" | "link" | "info" | "warning" | "success" | "danger";

  /**
   * @default "normal"
   */
  size?: "small" | "normal" | "medium" | "large";

  /**
   * @default false
   */
  round?: boolean;

  /**
   * @default false
   */
  loading?: boolean;

  /**
   * @default []
   */
  notifs?: [];

  /**
   * @default false
   */
  readonly?: boolean;

  /**
   * @default ""
   */
  label?: string;

  /**
   * @default ""
   */
  name?: string;

  /**
   * @default ""
   */
  id?: string;

  /**
   * @default ""
   */
  placeholder?: string;

  /**
   * @default ""
   */
  value?: string;

  /**
   * @default "text"
   */
  t?: "text" | "password";
}

export default class Input extends SvelteComponentTyped<
  InputProps,
  { input: WindowEventMap["input"]; blur: WindowEventMap["blur"] },
  {}
> {}
