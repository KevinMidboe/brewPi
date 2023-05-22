<script lang="ts">
	import { onMount } from 'svelte'
	// import { setTheme, theme } from '../themeStore'
	import type { Theme } from '../types'

	function toggleDarkmode() {
		// setTheme(nextTheme);

		// document.body.className = $theme
	}

	function systemDarkModeEnabled() {
		const computedStyle = window.getComputedStyle(document.body);
    if (computedStyle['colorScheme'] != null) {
			return computedStyle.colorScheme.includes('dark');
		}
		return false;
	}

	$: icon = true ? '🌝' : '🌚';
	// $: icon = $theme === 'dark' ? '🌝' : '🌚';
	// $: nextTheme = ($theme === 'dark' ? 'light' : 'dark') as Theme

	// onMount(() => document.body.className = $theme)
</script>

<div class="darkToggle">
	<span on:click={() => toggleDarkmode()}>{icon}</span>
</div>

<style lang="scss" module="scoped">
	.darkToggle {
		height: 25px;
		width: 25px;
		cursor: pointer;
		// background-color: red;
		position: fixed;
		bottom: 1rem;
		right: 2rem;
		z-index: 10;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
