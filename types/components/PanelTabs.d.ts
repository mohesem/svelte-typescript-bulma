/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface PanelTabsProps {
  /**
   * @default false
   */
  isActive?: boolean;

  /**
   * @default ""
   */
  href?: string;
}

export default class PanelTabs extends SvelteComponentTyped<
  PanelTabsProps,
  {},
  { default: {} }
> {}
