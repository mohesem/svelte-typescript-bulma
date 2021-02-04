/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface PanelHeaderProps {
  /**
   * @default ""
   */
  title?: string;
}

export default class PanelHeader extends SvelteComponentTyped<
  PanelHeaderProps,
  {},
  {}
> {}
