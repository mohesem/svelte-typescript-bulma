<script>
  // SIZE
  /**
   * @type { 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined }
   */
  export let size = 2;
  /**
   * @type { 'is-size-1' | 'is-size-2' | 'is-size-3' | 'is-size-4' | 'is-size-5' | 'is-size-6' | 'is-size-7' | undefined }
   */
  $: _size = `is-size${size}`;

  // TextAlign
  /**
   * @type { 'center' | 'justify' | 'left' | 'right' | undefined}
   */
  export let align;
  /**
   * @type { 'has-text-centered' | 'has-text-justified' | 'has-text-left' | 'has-text-right' | undefined }
   */
  $: _align = `has-text-${align}`;

  // TextWeight
  /**
   * @type { 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | undefiend }
   */
  export let weight;
  /**
   * @type { 'has-text-weight-light' | 'has-text-weight-normal' | 'has-text-weight-medium' | 'has-text-weight-semibold' | 'has-text-weight-bold' | undefined }
   */
  $: _weight = `has-text-weight${weight}`;

  // ==>
  $: finalClasses = `${_size} ${_align} ${_weight}`.replace(/  +/g, " ").trim();
</script>

<p class={finalClasses}>
  <slot />
</p>
