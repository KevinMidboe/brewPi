<script lang="ts">
  export let data;

  const brews = data?.brews || [];
  const path = (date: string) => '/brews/' + String(date);

  const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = (date) => new Date(date * 1000).toLocaleDateString('no-NB', dateFormat);

</script>

<main class="card">
  <h1>Past brews</h1>

  <ul>
    {#each brews as brew}
    <li><a href="{path(brew.date)}">{ brew.beer.name } av { brew.beer.brewery }</a> - {dateString(brew.date)}</li>
    {/each}
  </ul>
</main>

<style lang="scss">
  main.card {
    height: calc(100vh - var(--header-height) * 2);

    ul {
      margin-left: 1.2em;
    }

    ul li {
      list-style-type: disc;
      line-height: 1.5;

      a {
        font-size: 1.2rem;
        color: #19A786;
      }
    }
  }
</style>
