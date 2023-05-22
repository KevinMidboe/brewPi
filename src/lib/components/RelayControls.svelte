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

<div class="relays-container">
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

  .relays-container {
    height: fit-content;
    border-radius: 12px;
    background-color: var(--background);
    transition: background-color var(--color-transition-duration) ease-in-out;
    padding: 2.25rem 1rem;

    @include tablet {
      padding: 2.25rem 3rem;
    }

    h1 {
      margin-top: 0;
    }
  }

  .vertical-sensor-display {
    position: relative;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
