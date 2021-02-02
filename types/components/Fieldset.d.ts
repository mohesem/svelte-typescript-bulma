/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export interface FieldsetProps {
  /**
   * @default false
   */
  disabled?: boolean;
}

export default class Fieldset extends SvelteComponentTyped<
  FieldsetProps,
  {},
  { default: {} }
> {}
