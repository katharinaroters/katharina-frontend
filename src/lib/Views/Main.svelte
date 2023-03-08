<script lang="ts">
	import showdown from 'showdown';
	const converter = new showdown.Converter();
	export const prerender = true;
	export let content;
</script>

{#if content.featured}
	<!-- <div>
		<a href={content.url}>
			<img src={content.featuredPhoto.url} alt="Featured" />
		</a>
	</div> -->
{/if}
{#if content.text}
<div>
	<div class="image-row">
		{#each content.images.data as image}
		<div>
			<img src={image.attributes.formats.small.url} alt="Featured" />
		</div>
		
		{/each}
	</div>

<div class="text">
	{@html converter.makeHtml(content.text)}
</div>	

</div>
{/if}

<style lang="scss">
	.image-row{
		width: 100%;
		max-height: 340px ;
		display: grid;
		column-gap: 20px;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		place-items: center;
		img{
		object-position: top;

		}
	}
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
