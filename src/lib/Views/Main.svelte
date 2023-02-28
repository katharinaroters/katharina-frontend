<script lang="ts">
	export const prerender = true;
	export let featured;
</script>

{#if featured.featured}
	<div>
		<a href={featured.url}>
			<img src={featured.featured.url} alt="Featured" />
		</a>
	</div>
{/if}

<style lang="scss">
	div {
		width: 100%;
		height: 100%;

		// align-items: center;
		// align-content: center;
	}
	a {
		display: block;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		// box-sizing: border-box;
	}
	img {
		object-position: center left;
		width: 100%;
		height: 100%;
	}
</style>
