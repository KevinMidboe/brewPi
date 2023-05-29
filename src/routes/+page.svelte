<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte'
  import Display from '$lib/components/display.svelte'
  import VerticalSensorDisplay from '$lib/components/VerticalSensorDisplay.svelte'
  import Livestream from '$lib/components/Livestream.svelte'
  import BrewProgress from '$lib/components/BrewProgress.svelte';
  import type { PageData } from './$types';
  import RelayControls from '../lib/components/RelayControls.svelte';

  export let data: PageData
  const { inside, outside, relays } = data;
</script>

<PageHeader />

<div class="vertical-grid">
  <BrewProgress />

  <VerticalSensorDisplay {inside} {outside} />

  <RelayControls {relays} />

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
