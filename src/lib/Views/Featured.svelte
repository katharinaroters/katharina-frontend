<script>
	import showdown from 'showdown';
	const converter = new showdown.Converter();
	export let content;
	const contents = content.attributes.contents.data 
</script>

<section>
	{#each contents as sContent}
		<div>
			<div class="image-wr">
				<a href="/viewPhoto/{sContent.attributes.slug?.data.attributes.slug}/{sContent.attributes.featuredPhoto.data[0].id}"
					><img
						src={sContent.attributes.featuredPhoto.data[0].attributes.formats.large.url}
						alt={sContent.attributes.featuredPhoto.data[0].attributes.alternativeText}
					/></a
				>
			</div>
			<div>
				{@html converter.makeHtml(sContent.attributes.text)}
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	section {
		max-width: var(--max-width);
		// height: max-content;
		> div {
			margin-bottom: 50px;
		}
	}
	.image-wr {
		height: calc(var(--frame-height) * 85/100);
		a {
			height: 100%;
			display: block;
		}
	}
	img {
		width: fit-content;
		border: 0.5px solid #9c9c9c;
		height: 100%;
		object-fit: contain;
		object-position: left center;
	}
</style>
