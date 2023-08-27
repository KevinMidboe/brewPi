<script lang="ts">
  import { onMount } from 'svelte';
  import CardButton from './CardButton.svelte';
  import Activity from '../icons/Activity.svelte';
  import { ISensorDTO } from '../interfaces/ISensorDTO';
  import { IRelaysDTO } from '../interfaces/IRelaysDTO';
  import { IStateDTO } from '../interfaces/IStateDTO';

  export let inside: ISensorDTO;
  export let outside: ISensorDTO;
  export let relays: IRelaysDTO[] = [];
  export let state: IStateDTO;

  let loadedTime: number = new Date().getTime();
  let currentTime: number = new Date().getTime();
  let autoReload = false;

  function updateTime() {
    currentTime = new Date().getTime();
  }

  function flipCard(): void {
    console.log('flip-a-delphia');
  }

  function tempToStateClass(temp: number | undefined) {
    if (temp === undefined || !!isNaN(temp)) return 'idle';
    return Number(temp) > 14 ? 'heating' : 'cooling';
  }

  onMount(() => setInterval(updateTime, 1000));
  $: secondsSinceUpdate = Math.floor((currentTime - loadedTime) / 1000);
</script>

<div class="card">
  <h1>Fridge sensors</h1>
  <CardButton>
    <Activity on:click="{flipCard}" />
  </CardButton>

  <h2>Current target temperature</h2>
  <div class="sensor-reading">
    <div class="{state?.state}">
      <span class="value">{state?.goal || 0}</span>
      <span class="unit">°C</span>
    </div>

    <div>
      <span class="value"></span>
      <span class="unit">{state?.state || 'unknown'}</span>
    </div>
  </div>

  <h2>Inside frigde temperature</h2>
  <div class="sensor-reading">
    <div class="{tempToStateClass(inside?.temperature)}">
      <span class="value">{inside?.temperature || 0}</span>
      <span class="unit">{inside?.temperature_unit || '°C'}</span>
    </div>

    <div>
      <span class="value">{Math.floor(inside?.humidity || 0)}</span>
      <span class="unit">{inside?.humidity_unit || '%'}</span>
    </div>
  </div>

  <h2>Outside temperature</h2>
  <div class="sensor-reading">
    <div class="{tempToStateClass(outside?.temperature)}">
      <span class="value">{outside?.temperature || 0}</span>
      <span class="unit">{outside?.temperature_unit || '°C'}</span>
    </div>

    <div>
      <span class="value">{Math.floor(outside?.humidity || 0)}</span>
      <span class="unit">{outside?.humidity_unit || '%'}</span>
    </div>
  </div>

  <h2>Pressure</h2>
  <div class="sensor-reading">
    <span class="value">{inside?.pressure || 0}</span>
    <span class="unit">bar</span>
  </div>

  <div class="button-timer">
    <span>Updated {secondsSinceUpdate === 0 ? 'now' : secondsSinceUpdate + 's ago'}</span>
  </div>
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .card {
    position: relative;
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
    flex-wrap: wrap;
    margin-bottom: 1.75rem;

    font-size: 2.2rem;
    line-height: 1;
    font-weight: bold;
    color: var(--text-color);

    @include tablet {
      font-size: 2.9rem;
    }

    @include desktop {
      font-size: 3rem;
    }

    > div {
      display: flex;
      white-space: nowrap;
    }

    .unit {
      font-weight: 300;
      margin-left: 0.3rem;
    }

    .info {
      font-size: 1rem;
      width: 100%;
      margin-bottom: 0;
      font-weight: 500;
    }

    .heating {
      color: var(--red);
    }

    .cooling {
      color: var(--blue);
    }

    .idle {
      color: var(--green);
    }
  }

  .button-timer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: rgba(0, 0, 0, 0.5);

    svg {
      margin-left: 0.5rem;
    }
  }
</style>
