<script>
  import "bulma/css/bulma.css";
  import { Button } from "./index.js";

  let c = "link";
</script>

<main>
  <Button
    color={c}
    label="button"
    on:click={() => {
      if (c === 'link') c = 'anger';
      else c = 'link';
    }} />
</main>
