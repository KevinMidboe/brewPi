<script lang="ts">
  import PageHeader from '$lib/components/PageHeader.svelte'
  import Display from '$lib/components/display.svelte'
  import VerticalSensorDisplay from '$lib/components/VerticalSensorDisplay.svelte'
  import Livestream from '$lib/components/Livestream.svelte'
  import Navigation from '$lib/components/Navigation.svelte';
  import type { PageData } from './$types';
  import RelayControls from '../lib/components/RelayControls.svelte';

  export let data: PageData
  const { inside, outside, relays } = data;
</script>

<PageHeader />

<div class="vertical-grid">
  <Navigation />

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
    margin: 1rem;

    @include desktop {
      grid-template-columns: 1fr 2fr 3fr;
      margin: 2rem;
    }
  }
</style>
