/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ModalProps {
  /**
   * @default false
   */
  visibility?: boolean;

  /**
   * @default false
   */
  closeButton?: boolean;
}

export default class Modal extends SvelteComponentTyped<
  ModalProps,
  { visibility: CustomEvent<any> },
  { default: {} }
> {}
