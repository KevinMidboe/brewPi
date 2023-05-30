<script lang="ts">
  import { onMount } from 'svelte';
  import Graph from '../../lib/components/Graph.svelte';
  import type IChartFrame from '../../lib/interfaces/IChartFrame';
  import type { PageData } from './$types';

  export let data: PageData;

  let temperatureData: IChartFrame[] = data?.temperatureData;
  let humidityData: IChartFrame[] = data?.humidityData;
  let pressureData: IChartFrame[] = data?.pressureData;
  let DEFAULT_MINUTES: number = data?.DEFAULT_MINUTES;
  let minutes: number = DEFAULT_MINUTES;

  async function fetchData(unit: string, from: Date, to: Date, size: number) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ from, to, size })
    };

    return fetch(`/api/graph/${unit}`, options).then((resp) => resp.json());
  }

  const buttonMinutes = [
    { value: 15, name: 'Last 15 minutes' },
    { value: 60, name: 'Last hour' },
    { value: 360, name: 'Last 6 hours' },
    { value: 1440, name: 'Last day' },
    { value: 10080, name: 'Last week' },
    { value: 43200, name: 'Last month' },
    { value: 129600, name: 'Last 3 months' },
    { value: 259200, name: 'Last 6 months' },
    { value: 518400, name: 'Last year' }
  ];

  function reload(mins: number) {
    minutes = mins;
    const to: Date = new Date();
    const from = new Date(to.getTime() - minutes * 60 * 1000);
    const size = 40;

    fetchData('temperature', from, to, size).then((resp) => (temperatureData = resp?.data));
    fetchData('humidity', from, to, size).then((resp) => (humidityData = resp?.data));
    fetchData('pressure', from, to, size).then((resp) => (pressureData = resp?.data));
  }

  function scrollSelectedButtonIntoView() {
    const container = document.getElementsByClassName('button-wrapper')[0];
    const selected = document.getElementsByClassName('selected')[0] as HTMLElement;
    const containerWidth = container.getBoundingClientRect().width;
    const selectedWidth = selected.getBoundingClientRect().width;

    // if the container is in-view, return
    if (containerWidth > selected.offsetLeft) {
      return;
    }

    container.scrollLeft = selected.offsetLeft - selectedWidth / 2;
  }

  onMount(scrollSelectedButtonIntoView);
</script>

<div class="button-wrapper">
  {#each buttonMinutes as button}
    <button
      on:click="{() => reload(button.value)}"
      class="{button.value === minutes ? 'selected' : ''}">{button.name}</button
    >
  {/each}
</div>

<section class="graphs">
  {#if temperatureData}
    <div class="card">
      <Graph dataFrames="{temperatureData}" name="Temperature" />
    </div>
  {/if}
  {#if humidityData}
    <div class="card">
      <Graph dataFrames="{humidityData}" name="Humidity" />
    </div>
  {/if}
  {#if pressureData}
    <div class="card">
      <Graph dataFrames="{pressureData}" name="Pressure" />
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
      display: block;
      > *:not(*:first-child) {
        margin-top: 1rem;
      }
    }

    .card {
      padding: 1rem;
    }
  }

  .button-wrapper {
    display: flex;
    margin: 1rem 0;
    overflow-y: scroll;
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
