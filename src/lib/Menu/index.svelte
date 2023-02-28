<script>
	import MenuList from './MenuList.svelte';
	import SecondaryNav from './SecondaryNav.svelte';
	import { leftText } from '$store';
	import showdown from 'showdown';
	const converter = new showdown.Converter();
	export let navItems;
</script>

<nav class="negative-margin">
	<div>
		<header>
			<div class="name"><a href="/"><span>KATHARINA ROTERS</span></a></div>
		</header>
		<div class="primary-nav">
			<MenuList {navItems} />
		</div>
		{#if $leftText?.length}
			<div class="left-text">{@html converter.makeHtml($leftText)}</div>
		{/if}
	</div>
	<div class="secondary-nav">
		<SecondaryNav />
	</div>
</nav>

<style type="scss">
	header {
		margin-bottom: 2.2vw;
	}
	.left-text {
		font-size: 0.69rem;
		margin-top: 40px;
		width: 58%;
	}
	nav {
		color: rgb(78, 78, 78);
		grid-area: nav;
		height: 100%;
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 100%;
		align-content: space-between;
		:global(a) {
			text-decoration: none;
		}
	}
</style>
