<script lang="ts">
  import Logo from '../lib/components/Logo.svelte';
  import VerticalSensorDisplay from '../lib/components/VerticalSensorDisplay.svelte';
  // import Livestream from '$lib/components/Livestream.svelte'
  import BrewProgress from '../lib/components/BrewProgress.svelte';
  import type { PageData } from './$types';
  import RelayControls from '../lib/components/RelayControls.svelte';

  export let data: PageData;
  const { inside, outside, relays } = data;
</script>

<Logo />

<div class="vertical-grid">
  <BrewProgress />

  <VerticalSensorDisplay inside="{inside}" outside="{outside}" />

  <RelayControls relays="{relays}" />

  <!-- <Livestream /> -->
</div>

<style lang="scss">
  @import '../styles/media-queries.scss';

  .vertical-grid {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 15px;
    margin: 1rem 0;

    @include desktop {
      grid-template-columns: 2fr 2fr 3fr;
      margin: 2rem;
    }
  }
</style>
