/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface TextProps {
  /**
   * @default 2
   */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;

  align?: "center" | "justify" | "left" | "right" | undefined;

  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | undefiend;
}

export default class Text extends SvelteComponentTyped<
  TextProps,
  {},
  { default: {} }
> {}
