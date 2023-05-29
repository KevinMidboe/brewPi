<script lang="ts">
  import HeaderComponent from '$lib/components/Header.svelte';
  // import Darkmode from '$lib/components/Darkmode.svelte'
  import '../styles/global.css';
</script>

<HeaderComponent />
<!-- <Darkmode/> -->

<div class="page-content">
  <slot />
</div>

<style lang="scss">
  @import '../styles/media-queries.scss';

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--header-height));
    margin: var(--header-height) 2.5rem 0;

    @include mobile {
      margin: var(--header-height) 1rem 0;
    }
  }
</style>
