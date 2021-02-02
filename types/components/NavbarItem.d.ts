/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface NavbarItemProps {
  /**
   * @default ""
   */
  href?: string;

  /**
   * @default ""
   */
  value?: string;

  /**
   * @default false
   */
  active?: boolean;
}

export default class NavbarItem extends SvelteComponentTyped<
  NavbarItemProps,
  {},
  { default: {} }
> {}
