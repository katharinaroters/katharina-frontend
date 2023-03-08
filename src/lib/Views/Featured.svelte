<script>
	import showdown from 'showdown';
	const converter = new showdown.Converter();
	export let content;
	const sortedContent = [content?.contents[1], content?.contents[0], content?.contents[2]];
</script>

<section>
	{#each sortedContent as sContent}
		<div>
			<div class="image-wr">
				<a href="/viewPhoto/{sContent.attributes.slug?.data.attributes.slug}/{sContent.attributes.images.data[0].id}"
					><img
						src={sContent.attributes.featuredPhoto.data[0].formats.large.url}
						alt={sContent.attributes.featuredPhoto.data[0].alternativeText}
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
