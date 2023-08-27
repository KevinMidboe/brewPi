<script lang="ts">
  import Logo from '../lib/components/Logo.svelte';
  import VerticalSensorDisplay from '../lib/components/VerticalSensorDisplay.svelte';
  import BrewProgress from '../lib/components/BrewProgress.svelte';
  import RelayControls from '../lib/components/RelayControls.svelte';
  import type { PageData } from './$types';
  import type { IStateDTO } from '../lib/interfaces/IStateDTO';

  export let data: PageData;
  const { inside, outside } = data;
  let { relays, state } = data;

  const updateState = () =>
    setTimeout(() => {
      fetch('/api/state')
        .then((resp) => resp.json())
        .then((response: IStateDTO) => (state = response));
    }, 100);
</script>

<Logo />

<div class="vertical-grid">
  <BrewProgress />

  <VerticalSensorDisplay {inside} {outside} {relays} {state} />

  <RelayControls bind:relays="{relays}" on:relaySwitched="{updateState}" />
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

    @media (min-width: 900px) and (max-width: 1550px) {
      grid-template-columns: 2fr 2fr;
    }
  }

  :global(.vertical-grid > div:nth-child(3)) {
    @media (min-width: 900px) and (max-width: 1550px) {
      margin-top: -185px;
    }
  }
</style>
