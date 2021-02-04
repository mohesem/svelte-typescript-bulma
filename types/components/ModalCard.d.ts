/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ModalCardProps {
  /**
   * @default false
   */
  visibility?: boolean;
}

export default class ModalCard extends SvelteComponentTyped<
  ModalCardProps,
  { visibility: CustomEvent<any> },
  { default: {} }
> {}
