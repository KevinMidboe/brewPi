<script lang="ts">
  import HeaderComponent from '../lib/components/Header.svelte';
  // import Darkmode from '$lib/components/Darkmode.svelte'
  import '../styles/global.css';
</script>

<div class="app">
  <HeaderComponent />
  <!-- <Darkmode/> -->

  <main>
    <slot />
  </main>
</div>

<style lang="scss">
  @import '../styles/media-queries.scss';

  .app {
    min-height: calc(100vh - var(--header-height));
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 95vh;
    margin: var(--header-height) 2.5rem 0;

    @include mobile {
      margin: var(--header-height) 1rem 0;
      min-height: 85vh;
    }
  }
</style>
