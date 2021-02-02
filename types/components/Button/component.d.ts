/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ButtonProps {
  /**
   * Specify the kind of button
   * @default "primary"
   */
  kind?: "primary" | "secondary" | "tertiary";

  /**
   * @default ""
   */
  label?: string;

  /**
   * @default "red"
   */
  color?: string;
}

export default class Button extends SvelteComponentTyped<ButtonProps, {}, {}> {}
