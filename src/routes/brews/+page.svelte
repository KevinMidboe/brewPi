<script lang="ts">
  import ArrowRight from '../../lib/icons/ArrowRight.svelte';

  export let data;

  const brews = data?.brews || [];
  const path = (date: string) => '/brews/' + String(date);

  const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = (date: number) =>
    new Date(date * 1000).toLocaleDateString('no-NB', dateFormat);
</script>

<main class="card">
  <h1>Past brews</h1>

  <ul>
    {#each brews as brew}
    <li class="brew">
      <a href="{path(brew.date)}" data-sveltekit-preload-data="hover">
        <img src="/images/{brew.image}" alt="Beer label of {brew.beer.name}" />

        <div class="details">
          <h2>
            {brew.beer.name}
            <span>{brew.beer.category}</span>
          </h2>

          <p>By: {brew.by.join(', ')}</p>
          <p>Date: {dateString(brew.date)}</p>
          <p>Recipe by: {brew.beer.brewery}</p>
        </div>

        <div class="nav-arrow"><ArrowRight /></div>
      </a>
    </li>
    {/each}
  </ul>
</main>

<style lang="scss">
  @import '../../styles/media-queries.scss';

  main.card {
    min-height: calc(100vh - var(--header-height) * 2);
    margin-bottom: 2rem;
    padding: 0;

    h1 {
      margin: 1.5rem 0;
      font-size: 3rem;
    }

    ul {
      display: grid;
      grid-template-columns: 1fr;
      margin: 0;
      border-radius: inherit;

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
      }

      @include desktop {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .brew {
    list-style-type: none;
    line-height: 1.5;
    padding: 1.5rem;
    transition: all 0.2s ease-in-out;
    background-color: white;
    z-index: 1;
    border-radius: inherit;

    &:not(:last-of-type) {
      border-bottom: 1px solid #f5f5f7;
    }

    &:hover {
      // transform: scale(1.01);
      scale: 1.01;
      will-change: transform;
      box-shadow: 0px 2px 15px -3px rgba(25, 167, 134, 0.2);
      z-index: 2;
    }

    a {
      font-size: 1.2rem;
      color: #19a786;
      display: grid;
      grid-template-columns: 160px 1fr 30px;

      h2 {
        margin: 0 0 0.75rem;
        color: var(--green);

        span {
          display: block;
          font-style: italic;
          font-size: 1.2rem;
        }
      }

      img {
        width: 100%;
        max-width: 160px;
        border-radius: 0.5rem;
      }

      div.details {
        margin-left: 2rem;
        color: var(--text-color);

        p {
          margin: 0;
        }
      }

      div.nav-arrow {
        display: flex;
        align-items: center;
      }
    }
  }

  @include mobile {
    .brew {
      padding-left: 1rem !important;
    }

    .brew a {
      grid-template-columns: 120px 1fr;

      img {
        margin-top: 0.5rem;
        background-color: pink;
      }

      div.details {
        margin-left: 1rem;

        h2 {
          font-size: 1.5rem;
        }
      }

      div.nav-arrow {
        display: none;
      }
    }
  }
</style>
