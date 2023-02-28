<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const handleBack = async () => {
		const splitted = $page.path.split('/');
		const sliced = splitted.slice(0, splitted.length - 1);
		const prevLevel = splitted.length > 2 ? sliced.join('/') : '/';
		await goto(prevLevel);
	};
</script>

<ul>
	<li><a href="/about"><span>ABOUT</span></a></li>
	<li><a href="/contact"><span>CONTACT</span></a></li>
	<!-- {#if !$page.path.includes('viewPhoto') && !$page.path.includes('viewBook')}
		<li style="margin-top: 1rem;" on:click={handleBack}><span>back</span></li>
	{/if} -->
</ul>

<style type="scss">
	ul {
		margin: 0;
		& li {
			padding-top: 5px;
			font-size: 0.9rem;
			cursor: pointer;
		}
		list-style-type: none;
	}
</style>
