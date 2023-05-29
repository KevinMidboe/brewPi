<script lang="ts">
  //  import { toggleRelay } from '$lib/server/relayToggle'
  import Switch from './Switch.svelte';

  export let relays = [];

  function toggleRelay(location) {
    const url = `/api/relay/${location}`;
    const options = {
      method: 'POST'
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then(console.log);
  }

  function handleChange(event) {
    let isChecked = event.detail.checked;
    // Perform any desired actions based on the new value
    console.log('New value:', isChecked);
  }
</script>

<div class="card">
  <h1>Manual relay controls</h1>

  <div class="vertical-sensor-display">
    {#each relays as relay}
    <div>
      <h2>{relay.location} relay</h2>

      <div class="sensor-reading">
        <Switch checked="{relay.state}" on:change="{() => toggleRelay(relay.location)}" />
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
