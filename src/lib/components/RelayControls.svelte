<script lang="ts">
  //  import { toggleRelay } from '$lib/server/relayToggle'
  import { createEventDispatcher } from 'svelte';
  import Switch from './Switch.svelte';
  import type { IRelaysDTO } from '../interfaces/IRelaysDTO';

  export let relays: IRelaysDTO[] = [];
  const dispatch = createEventDispatcher();

  function toggleRelay(controls: string) {
    const url = `/api/relay/${controls}`;
    const options = {
      method: 'POST'
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((response) => {
        const changedRelay = relays.findIndex((relay) => relay.pin === response.pin);
        relays[changedRelay] = response;
      });

    dispatch('relaySwitched');
  }
</script>

<div class="card">
  <h1>Manual fridge controls</h1>

  <div class="vertical-sensor-display">
    {#each relays as relay}
    <div>
      <h2>{relay.controls} relay</h2>

      <div class="sensor-reading">
        <Switch checked="{relay.state}" on:change="{() => toggleRelay(relay.controls)}" />
      </div>
    </div>
    {/each}
  </div>
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .vertical-sensor-display {
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    @include desktop {
      justify-content: space-between;
    }
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    color: var(--text-color);
    text-transform: capitalize;

    @include tablet {
      font-size: 1.6rem;
    }
  }

  .sensor-reading {
    display: flex;
    justify-content: center;
    margin-bottom: 1.75rem;

    font-size: 2.5rem;
    line-height: 1;
    font-weight: 500;
    color: var(--text-color);
  }
</style>
