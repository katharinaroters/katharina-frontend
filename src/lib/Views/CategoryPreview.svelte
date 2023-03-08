<script>
	import Arrow from '$lib/Arrow.svelte';
	import { onMount } from 'svelte';

	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const handleNextClick = () => {
		carousel.goToNext();
	};

	export let content = {},
		url = '';
</script>

{#if content.attributes.featuredPhoto.data.length}
	<section class="preview-slider">
		<!-- {#each content.featuredPhoto as photo}
			<div><a href="/{photo.caption}"><img src={photo.formats?.small?.url} alt="" /></a></div>
		{/each} -->
		<svelte:component
			this={Carousel}
			bind:this={carousel}
			autoplay={true}
			autoplayDuration={2500}
			arrows={false}
			dots={false}
			let:showNextPage
			let:showPrevPage
		>
			<div slot="prev">
				<Arrow />
			</div>
			<div slot="next">
				<Arrow />
			</div>
			{#each content.attributes.featuredPhoto.data as photo}
				<div><a href="/{photo.caption}"><img src={photo.formats?.large?.url} alt="" /></a></div>
			{/each}
		</svelte:component>
	</section>
{/if}

<style lang="scss">
	section.preview-slider {
		* {
			overflow: hidden !important;
		}
	}
	section {
		overflow: hidden;
		width: 100%;
		height: 100%;
		justify-content: end;
		justify-items: end;
		> div {
			height: 100%;
			width: 100%;
			a {
				display: block;
				height: 100%;
				width: 100%;
				img {
					object-fit: contain;
					width: 100%;
					object-position: center left;
					height: var(--frame-height);
				}
			}
		}
	}
</style>
