/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ModalCardHeaderProps {
  /**
   * @default ""
   */
  title?: string;

  /**
   * @default false
   */
  closeButton?: boolean;
}

export default class ModalCardHeader extends SvelteComponentTyped<
  ModalCardHeaderProps,
  { click: WindowEventMap["click"] },
  { default: {} }
> {}
