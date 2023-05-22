<script lang="ts">
import ArrowRight from "../icons/ArrowRight.svelte";

interface IRoute {
  name: string
  path: string
}

const routes: Array<IRoute> = [{
  name: 'Home',
  path: '/'
}, {
  name: 'Past brews',
  path: '/brews'
}, {
  name: 'Graphs',
  path: '/graphs'
}]
</script>

<ul class="navigation-cards" on:click>
  {#each routes as route}
    <a href={route.path}>
      <li>
        <span>{ route.name }</span>
        <ArrowRight />
      </li>
    </a>
  {/each}
</ul>

<style lang="scss" module="scoped">
.navigation-cards a {
  display: block;
  border-radius: 2rem;
  background: var(--green);
  transition: background-color var(--color-transition-duration) ease-in-out, transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }

  margin: 1rem 0;
  &:first-of-type {
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.75rem;
    color: white;
    font-size: 1.3rem;
  }
}
</style>