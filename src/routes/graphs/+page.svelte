<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchTemperature, fetchHumidity, fetchPressure } from '$lib/graphQueryGenerator';
  import Graph from '$lib/components/Graph.svelte';
  import type IChartFrame from '$lib/interfaces/IChartFrame';
  import type { PageData } from './$types';

  export let data: PageData

  let temperatureData: IChartFrame[] = data?.temperatureData;
  let humidityData: IChartFrame[] = data?.temperatureData;
  let pressureData: IChartFrame[] = data?.temperatureData;
  let DEFAULT_MINUTES: number = data?.DEFAULT_MINUTES
  let minutes: number = DEFAULT_MINUTES;

  const buttonMinutes = [{
      value: 15,
      name: 'Last 15 minutes'
    }, {
      value: 60,
      name: 'Last hour'
    }, {
      value: 1440,
      name: 'Last day'
    }, {
      value: 10080,
      name: 'Last week'
    }, {
      value: 43200,
      name: 'Last month'
    }, {
      value: 129600,
      name: 'Last 3 months'
    }, {
      value: 259200,
      name: 'Last 6 months'
    }, {
      value: 518400,
      name: 'Last year',
    }]

  function reload(mins: number) {
    minutes = mins
    const from: Date = new Date();
    const to = new Date(from.getTime() - minutes * 60 * 1000);
    const size = 40;

    fetchTemperature(from, to, size, window.fetch).then((resp) => (temperatureData = resp));
    fetchHumidity(from, to, size, window.fetch).then((resp) => (humidityData = resp));
    fetchPressure(from, to, size, window.fetch).then((resp) => (pressureData = resp));
  }
</script>

<!-- <h1>Server: {emoji.emoji}</h1> -->

<input type="number" bind:value={minutes} on:input={() => reload(minutes)} />

<div class="button-wrapper">
  {#each buttonMinutes as button}
    <button on:click={() => reload(button.value)} class="{button.value === minutes ? 'selected' : ''}">{ button.name }</button>
  {/each}
</div>

<section class="graphs">
  {#if temperatureData}
    <div class="graphWrapper">
      <Graph dataFrames={temperatureData} name="Temperature" />
    </div>
  {/if}
  {#if humidityData}
    <div class="graphWrapper">
      <Graph dataFrames={humidityData} name="Humidity" beginAtZero={false} />
    </div>
  {/if}
  {#if pressureData}
    <div class="graphWrapper">
      <Graph dataFrames={pressureData} name="Pressure" beginAtZero={false} />
    </div>
  {/if}
</section>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .graphs {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;

    @include mobile {
      grid-template-columns: 1fr;
    }

    .graphWrapper {
      max-width: 100vw;
    }
  }

  .button-wrapper {
    display: flex;
    width: min-content;
  }

  button {
    display: block;
    border-radius: 2rem;
    white-space: nowrap;
    font-size: 1.1rem;
    border: none;
    width: content;
    padding: 0.5rem 1rem;
    margin: 0.3rem;
    color: white;
    cursor: pointer;
    background: var(--green);
    transition: background-color var(--color-transition-duration) ease-in-out, transform 0.2s ease;

    &:hover {
      transform: scale(1.04);
    }

    &.selected {
      background-color: salmon;
      color: black;
    }
  }
</style>
