<script lang="ts">
  import { onMount } from 'svelte'
  import CardButton from "./CardButton.svelte";
  import Activity from "../icons/Activity.svelte";

  export let inside;
  export let outside;

  let loadedTime: number = new Date().getTime();
  let currentTime: number = new Date().getTime()

  function updateTime() {
    currentTime = new Date().getTime();
  }  

  function flipCard(): void {
    console.log("flip-a-delphia")
  }

  onMount(() => setInterval(updateTime, 1000));

  $: secondsSinceUpdate = Math.floor((currentTime - loadedTime) / 1000)
</script>


<div class="vertical-sensor-display">
  <CardButton>
    <Activity on:click={flipCard} />
  </CardButton>

  <h2>Current target temperature</h2>
  <div class="sensor-reading">
    <div class="red">
      <span class="value">16</span>
      <span class="unit">°C</span>
    </div>
  </div>

  <h2>Inside temperature</h2>
  <div class="sensor-reading">
    <div class="blue">
      <span class="value">{ inside?.temperature }</span>
      <span class="unit">{ inside?.temperature_unit }</span>
    </div>

    <div>
      <span class="value">{ Math.floor(inside?.humidity) }</span>
      <span class="unit">{ inside?.humidity_unit || '%' }</span>
    </div>
  </div>

  <h2>Outside temperature</h2>
  <div class="sensor-reading">
    <div class="blue">
      <span class="value">{ outside?.temperature }</span>
      <span class="unit">{ outside?.temperature_unit }</span>
    </div>

    <div>
      <span class="value">{ Math.floor(outside?.humidity) }</span>
      <span class="unit">{ outside?.humidity_unit }</span>
    </div>
  </div>

  <h2>Pressure</h2>
  <div class="sensor-reading">
    <span class="value">{ inside?.pressure || 0}</span>
    <span class="unit">bar</span>
  </div>

  <div class="button-timer">
    <span>Updated { secondsSinceUpdate === 0 ? 'now' : secondsSinceUpdate + 's ago' }</span>
  </div>
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

.vertical-sensor-display {
  position: relative;
  padding: 2.25rem 1rem;
  border-radius: 12px;
  background-color: var(--background);
  transition: background-color var(--color-transition-duration) ease-in-out;

  @include tablet {
    padding: 2.25rem 3rem;
  }
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  color: var(--text-color);

  @include tablet {
    font-size: 1.6rem;
  }
}

.sensor-reading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.75rem;

  font-size: 2.2rem;
  line-height: 1;
  font-weight: 500;
  color: var(--text-color);

  @include tablet {
    font-size: 2.9rem;
  }

  @include desktop {
    font-size: 3rem;
  }

  .unit {
    font-weight: 300;
  }

  .red {
    color: var(--red);
  }

  .blue {
    color: var(--blue);
  }
}

.button-timer {
  width: 100%;
  text-align: right;
  color: rgba(0, 0, 0, .5);
}

</style>
