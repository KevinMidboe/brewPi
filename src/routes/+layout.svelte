<script lang="ts">
  import HeaderComponent from '$lib/components/Header.svelte';
  // import Darkmode from '$lib/components/Darkmode.svelte'
</script>

<HeaderComponent />
<!-- <Darkmode/> -->

<div class="page-content">
  <slot></slot>
</div>

<style lang="scss">
  @import '../styles/media-queries.scss';

  .page-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 2.5em;
    margin-top: var(--header-height);

    @include mobile {
      padding: 1em;
    }
  }
</style>
