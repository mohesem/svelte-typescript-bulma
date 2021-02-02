/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface HelpProps {
  /**
   * @default ""
   */
  color?: "primary" | "link" | "info" | "warning" | "success" | "danger";

  /**
   * @default ""
   */
  message?: string;
}

export default class Help extends SvelteComponentTyped<HelpProps, {}, {}> {}
