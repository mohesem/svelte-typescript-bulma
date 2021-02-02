/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface ModalNotifProps {
  /**
   * @default false
   */
  active?: boolean;

  /**
   * @default () => null
   */
  onClose?: () => null;
}

export default class ModalNotif extends SvelteComponentTyped<
  ModalNotifProps,
  {},
  { default: {} }
> {}
