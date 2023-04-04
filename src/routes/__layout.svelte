<script context="module">
	import { noScroll } from '../store';
	import fetcher from '../utils/fetcher'
	export const prerender = false;
	export async function load({ page, fetch, session, context }) {
		const res = await fetcher('/navigations?populate=deep,3&filters[isParent][$eq]=true');
		if (res.status >= 200 && res.status < 300) {
			return {
				props: {
					navItems: await res.data.data
				}
			};
		}

		return {
			status: res.status
		};
	}
</script>

<script lang="ts">
	import { menuItems } from '../store';
	import Header from '$lib/Header/index.svelte';
	import Menu from '$lib/Menu/index.svelte';
	import '../app.css';
	// import Lock from '$lib/Views/Lock.svelte';
	export let navItems ;

	// export let navItems = [
	// 	{
	// 		title: 'PHOTOGRAPHY',
	// 		slug: { slug: 'photography' },
	// 		nestedNavigations: [
	// 			{ title: 'ARMENIAN ANATOMY', slug: { slug: 'photography/armenian_anatomy' } },
	// 			{ title: 'YEREVAN CONCRETE', slug: { slug: 'photography/yerevan_concrete' } },
	// 			{ title: 'UTOPIA & COLLAPSE', slug: { slug: 'photography/utopia_collapse' } },
	// 			{ title: 'HUNGARIAN CUBES', slug: { slug: 'photography/hungarian_cubes' } },
	// 			{ title: 'BOOKS', slug: { slug: 'photography/books' } },
	// 			{ title: 'RESEARCH', slug: { slug: 'photography/research' } }
	// 		]
	// 	},
	// 	{
	// 		title: 'WUNDERBLOCK',
	// 		slug: { slug: 'wunderblock' }
	// 	},
	// 	{
	// 		title: 'PAINTINGS',
	// 		slug: { slug: 'paintings' }
	// 	},
	// 	{
	// 		title: 'DRAWINGS',
	// 		slug: { slug: 'drawings' }
	// 	}
	// ];
	menuItems.set(navItems);
</script>

<svelte:head>
	<title>Katharina Roters</title>
</svelte:head>
<!-- <Lock /> -->
<div class="main-wrapper">
	<div class="app">
		<Menu {navItems} />
		<main class="negative-margin" class:noScroll={$noScroll}>
			<slot />
		</main>
	</div>
</div>

<!-- <footer /> -->
<style lang="scss">
	.main-wrapper {
		height: 100vh;
		width: 100vw;
		display: grid;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
	.app {
		height: var(--frame-height);
		width: var(--frame-width);
		display: grid;
		grid-template-columns: 350px auto;
		grid-template-rows: 100%;
		grid-template-areas: 'nav content';
	}
	main {
		flex: 1;
		grid-area: content;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		margin: 0 auto;
		box-sizing: border-box;
		&.noScroll {
			overflow-y: hidden;
		}
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
