<div class="page-header">
  <img class="desktop-only" src="/branding/logo_landscape-2.png" alt="Schleppe brew logo" />
  <img class="mobile-only" src="/branding/logo-2.png" alt="Schleppe brew logo" />
<!--  <h1>Schleppe Brew</h1>
  <span class="subtitle">Monitor beer brewing refridgerator</span>
-->
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .page-header {
    width: 100%;
    text-align: center;
    font-family: 'Overpass';
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 0.2rem;
    
    @include tablet {
      font-size: 5rem;
    }
  }

  img.mobile-only {
    width: 100%;
    max-width: 350px;
  }

  .subtitle {
    font-size: 2rem;
  }
</style>
