/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface CardProps {
  /**
   * @default false
   */
  centered?: boolean;
}

export default class Card extends SvelteComponentTyped<
  CardProps,
  {},
  { default: {} }
> {}
