/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface NavbarProps {
  /**
   * @default ""
   */
  color?:
    | "primary"
    | "link"
    | "info"
    | "warning"
    | "success"
    | "danger"
    | "black"
    | "dark"
    | "white"
    | "light";

  /**
   * @default "navbar"
   */
  defaultClass?: string;
}

export default class Navbar extends SvelteComponentTyped<
  NavbarProps,
  {},
  { default: {} }
> {}
