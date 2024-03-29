<script lang="ts">
  import Graph from '../../../lib/components/Graph.svelte';
  import ArrowRight from '../../../lib/icons/ArrowRight.svelte';
  import IChartFrame from '../../../lib/interfaces/IChartFrame';
  let height: number;

  export let data;
  let brew = data.brew;
  let temperatureData: IChartFrame[] = data?.graphData?.temperature;
  let humidityData: IChartFrame[] = data?.graphData?.humidity;

  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const dateString = new Date(Number(brew.date * 1000)).toLocaleDateString('no-NB', dateFormat);

  const wizards = brew.by.join(', ');
</script>

<a href="/brews" class="nav-back">
  <ArrowRight />
</a>

<section class="card">
  <div
    class="desktop-only image-container"
    style="height: {height}px; background-color: {brew.color_primary || '#93a4a0'}"
  >
    <img src="/images/{brew.image}" alt="Tuborg Sommerøl" aria-label="Tuborg Sommerøl" />
  </div>

  <div
    class="beer-container"
    bind:clientHeight="{height}"
    style="background-color: {brew.color_secondary || '#DFE6E5'}"
  >
    <h1>{brew.beer.name}</h1>

    <div class="links">
      <a href="{brew.recipe}" target="_blank" rel="noreferrer">Recipe</a>
      <a href="{brew.order_page}" target="_blank" rel="noreferrer">Bryggselv</a>
      <a href="{brew.untapped}" target="_blank" rel="noreferrer">Untapped</a>
    </div>

    <table>
      <tbody>
        <tr>
          <td><b>Brygget:</b></td>
          <td>{dateString}</td>
        </tr>

        <tr>
          <td><b>Laget av:</b></td>
          <td>{wizards}</td>
        </tr>

        <tr>
          <td><b>Kategori:</b></td>
          <td>{brew.beer.category}</td>
        </tr>

        <tr>
          <td><b>Alkoholprosent:</b></td>
          <td>~ {brew.abv}%</td>
        </tr>
      </tbody>
    </table>

    <div
      class="mobile-only image-container"
      style="background-color: {brew.color_primary || '#93a4a0'}"
    >
      <img src="/images/{brew.image}" alt="Tuborg Sommerøl" aria-label="Tuborg Sommerøl" />
    </div>

    <h3>Beskrivelse</h3>
    <p>{brew.description}</p>

    <div class="graph-container">
      {#if temperatureData && temperatureData?.length}
      <div class="graph">
        <h3>Temperature during fermentation</h3>
        <Graph dataFrames="{temperatureData}" name="Temperature" hideTitle="{true}" />
      </div>
      {/if} {#if humidityData && temperatureData?.length}
      <div class="graph">
        <h3>Humidity during carbonation</h3>
        <Graph dataFrames="{humidityData}" name="Humidity" hideTitle="{true}" />
      </div>
      {/if}
    </div>

    <h3>Smak</h3>
    <p>
      Tuborg Sommerøl er en nordisk pilsner med en svært lys strågul farge. Aromaen er preget av
      fruktighet fra gjær, noter av blomster fra humle og lette noter av halm og honning fra malt.
      Ølet har en svært lett karakter med en lett maltsødme som er godt balansert mot en lav
      bitterhet.
    </p>

    <h3>Mat</h3>
    <p>
      Tuborg Sommerøl egner seg godt til lys sommermat som pizza, pastaretter, salat, fisk og
      skalldyr.
    </p>

    <p>Bruk av alkohol kan gi ulike skadevirkninger. Nærmere informasjon finner du her.</p>
  </div>
</section>

<style lang="scss">
  @import '../../../styles/media-queries.scss';

  .nav-back {
    position: fixed;
    top: 1.5rem;
    left: 1rem;
    width: 2rem;
    height: 2rem;
    transform: rotate(180deg);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      scale: 1.3;
      will-change: transform;
      color: var(--green);
    }
  }

  section {
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@200;300;400;500;600;700;800&display=swap');
    font-family: 'Epilogue', sans-serif;

    padding: unset !important;
    margin-bottom: 3rem;

    @include mobile {
      .beer-container {
        border-radius: inherit;
      }
    }

    @include tablet {
      .beer-container {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
      }

      .image-container {
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
      }
    }
  }

  .image-container {
    display: flex;
    justify-content: center;
    min-height: 1px;
    padding: 3rem 1rem;

    @include tablet {
      width: 33.33%;
      float: left;
      padding: 5rem 1rem;
    }

    @include mobile {
      width: calc(100% + 2rem);
      margin: 2rem 0 2rem -1rem;
    }

    img {
      display: block;
      height: 100%;
      object-fit: contain;
      object-position: top;
      width: calc(100% - 3rem);
    }
  }

  .beer-container {
    background-color: rgba(215, 224, 223, 0.8);
    padding: 2rem 1rem;

    @include tablet {
      float: left;
      width: 66.66%;
      padding: 4rem 3rem;
    }

    h1 {
      margin-bottom: 2.4rem;
      font-size: 3rem;
    }

    .links {
      margin-bottom: 2rem;

      a {
        position: relative;

        &:not(&:first-of-type) {
          margin-left: 1rem;
        }
      }

      a::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 1.5px;
        background-color: black;
      }
    }

    table {
      width: 100%;
      max-width: 550px;
      list-style: none;

      tr:last-child td {
        border-bottom: 1px solid #bdc8ca;
      }

      td {
        border-top: 1px solid #bdc8ca;
        padding: 1rem 0;
      }
    }

    h3 {
      letter-spacing: 0.4px;
    }

    p {
      line-height: 1.2;
      font-weight: 300;
    }

    .graph-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .graph {
      width: 100%;
      max-height: 50vh;
      margin-bottom: 5rem;

      @include desktop {
        float: left;
        max-height: 450px;
        max-width: 48%;
      }
    }
  }

  :global(canvas) {
    background-color: white;
    border-radius: 0.5rem;
    padding: 0 0.2rem;
  }
</style>
