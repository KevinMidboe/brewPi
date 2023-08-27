<script lang="ts">
  import Logo from '../lib/components/Logo.svelte';
  import VerticalSensorDisplay from '../lib/components/VerticalSensorDisplay.svelte';
  import BrewProgress from '../lib/components/BrewProgress.svelte';
  import RelayControls from '../lib/components/RelayControls.svelte';
  import type { PageData } from './$types';
  import type { IStateDTO } from '../lib/interfaces/IStateDTO';

  export let data: PageData;
  const { inside, outside, relays } = data;
</script>

<Logo />

<div class="vertical-grid">
  <BrewProgress />

  <VerticalSensorDisplay {inside} {outside} {relays} {state} />

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
