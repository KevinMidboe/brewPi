<script lang="ts">
  import { fly } from 'svelte/transition';
	import Navigation from './Navigation.svelte';
  import GithubIcon from '../icons/Github.svelte';

	let open: boolean = false;

	function toggleMenu() {
		open = !open;
	}

  function close() {
    open = false;
  }

	$: headerText = !open ? 'Menu' : 'Close';
</script>

{#if open}
  <div class="slideout-menu" transition:fly="{{ x: 550, duration: 300 }}">
    <h1>Navigation</h1>

    <Navigation on:click={close} />

    <ul class="bottom-content">
      <li>
      	<a href="https://github.com/kevinmidboe/brewpi">
	        <GithubIcon />
	        <span class="meta">View on Github</span>
	      </a>
      </li>
    </ul>
  </div>
{/if}

<header>
	<div on:click={toggleMenu} class:open aria-label="Open menu" class="menu">
		{#if !open}
			<span class="page-header-buttons__open">
				<span /> <span /> <span />
			</span>
		{:else}
			<span class="page-header-buttons__close">
        <span />
				<span />
			</span>
		{/if}

		<span class="page-header-text">{headerText}</span>
	</div>
</header>

<style lang="scss" module="scoped">
	.slideout-menu {
		position: fixed;
    display: flex;
    flex-direction: column;
		height: 100vh;
    width: 100vw;
		max-width: 550px;
		right: 0;
		top: 0;
		z-index: 1;

		background-color: #fff3f6;
    color: black;
		padding: calc(100px + 2rem) 2rem 1rem;
    border-top-left-radius: 4rem;

		h1 {
			padding-bottom: 4rem;
		}

    @media screen and (max-width: 640px) {
      padding: 100px 2rem 2rem;
    }

    .bottom-content {
      margin-top: auto;

      li, li a {
      	display: flex;
      	align-items: center;

      	.meta {
      		margin-left: 1rem;
      	}
      }

      li:not(:last-of-type) {
      	margin-bottom: 1rem;
      }
    }
	}

	header {
		top: 0;
		right: 0;
		display: flex;
    position: fixed;
    z-index: 10;
		padding: 0 1rem;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: var(--header-height);
		background-color: transparent;
		pointer-events: none;

		.menu {
			display: flex;
			place-items: center;
			background-color: var(--green);
      color: #fff3f6;
			padding: 14px 20px;
			border-radius: 25px;
			-webkit-transition: all 0.3s ease;
			transition: all 0.3s ease;
			cursor: pointer;
			pointer-events: auto;

			-webkit-user-select: none;
			user-select: none;

			&.open {
				background-color: salmon;
				color: black;
			}

			&:hover {
				transform: scale(1.04);
			}
		}

		.page-header-text {
			padding-left: 11px;
			display: inline-block;
		}

		.page-header-buttons__open {
			position: relative;
			display: inline-block;
			width: 24px;
			height: 24px;

			span {
				display: block;
				width: 22px;
				height: 2px;
				background: currentColor;
				position: absolute;
				left: 1px;

				&:first-child {
					top: 4px;
				}

				&:nth-child(2) {
					top: 11px;
				}

				&:nth-child(3) {
					top: 18px;
				}
			}
		}

		.page-header-buttons__close {
			position: relative;
      display: grid;
			width: 24px;
			height: 24px;
      place-items: center;

			span {
				display: block;
				width: 22px;
				height: 2px;
				background: currentColor;
				position: absolute;
				left: 1px;

				&:first-child {
					transform: rotate(-45deg);
				}

				&:nth-child(2) {
          transform: rotate(45deg);
				}
			}
		}
	}
</style>
