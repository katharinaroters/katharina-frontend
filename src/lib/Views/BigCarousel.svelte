<script>
	import { onMount } from 'svelte';
	import Arrow from '$lib/Arrow.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import { navigating } from '$app/stores';
	export let images, currentImage, prevImage, nextImage, currentIndex, slugId;
	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	let leftArr, rightArr;
	let sampleImage;

	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
		window.onresize = () => {
			handleArrAlloc(leftArr, rightArr, sampleImage?.offsetWidth);
		};
	});
	const handleGoTo = (carousel, currentIndex) => {
		if (carousel) {
			carousel.goTo(currentIndex);
		}
	};
	const handleArrAlloc = (leftArr, rightArr, offsetWidth) => {
		if (offsetWidth) {
			if (leftArr) leftArr.style = `width:${offsetWidth / 2}px`;
			if (rightArr) rightArr.style = `width:${offsetWidth / 2}px;left:${offsetWidth / 2}px`;
		}
	};
	// const handleNextClick = () => {
	// 	carousel.goToNext();
	// };
	// const handlePrevClick = () => {
	// 	carousel.goToPrev();
	// };
	$: {
		handleGoTo(carousel, currentIndex);
	}
	$: {
		handleArrAlloc(leftArr, rightArr, sampleImage?.offsetWidth);
	}
</script>

<div class="wrapper">
	<div class="carousel-wr">
		<!-- {#if images} -->
		<!-- {#key slugId} -->
		<svelte:component
			this={Carousel}
			bind:this={carousel}
			autoplay={false}
			arrows={true}
			infinite={false}
			initialPageIndex={currentIndex}
			dots={false}
			let:showNextPage
			let:showPrevPage
		>
			<div slot="prev">
				{#if prevImage}
					<a href="/viewPhoto/{slugId}/{prevImage.id}">
						<div class="arrow" bind:this={leftArr}>
							<Arrow color="#323232" />
						</div>
					</a>
				{:else}
					<div />
				{/if}
			</div>
			<div slot="next">
				{#if nextImage}
					<a href="/viewPhoto/{slugId}/{nextImage.id}">
						<div class="arrow right" bind:this={rightArr}>
							<Arrow left={false} color="#323232" />
						</div>
					</a>
				{:else}
					<div />
				{/if}
			</div>
			{#each images as photo, index}
				{#if index === 2}
					<div class="photo">
						<img src={photo?.url} bind:this={sampleImage} alt="" />
						<!-- <div class="img" style="background-image: url({photo?.formats?.large?.url});"></div> -->
					</div>
				{:else}
					<div class="photo">
						<img src={photo?.url} alt="" />
						<!-- <div class="img" style="background-image: url({photo?.formats?.large?.url});"></div> -->
					</div>
				{/if}
			{/each}
		</svelte:component>
		<!-- {/key} -->
		<!-- {:else if $navigating !== null && !$navigating.to.path.includes('viewPhoto')} -->

		<!-- {/if} -->
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		max-height: fit-content;
		overflow: hidden;

		> :global(div) {
			overflow: hidden;
		}
	}
	.arrow {
		cursor: pointer;
		position: absolute;
		// width: 50%;
		height: 100%;
		z-index: 499;

		left: 0;
		&:hover {
			> :global(div) {
				opacity: 1;
			}
		}
		> :global(div) {
			transition: opacity 0.1s ease-in-out;
			opacity: 0;
			position: absolute;
			z-index: 500;
			top: calc(50% - 0.9vmin);
			left: 10px;
		}
		&.right {
			// left: unset;
			// right: 0;
			> :global(div) {
				left: unset;
				right: 10px;
			}
		}
	}
	.carousel-wr {
		overflow: hidden;
		max-width: var(--max-width);
		display: inline-block;
		// height: calc(var(--frame-height) - 2px);

		// max-height: calc(var(--frame-height) - 2px);
		height: fit-content;

		.photo {
			// height: max-content;
			// max-width: calc(var(--max-width) - 2px);
			max-width: min-content !important;
			height: calc(var(--frame-height) * 85 / 100);
			position: relative;
		}
		img {
			// width: calc(var(--max-width) - 2px);
			height: calc(100% - 2px);
			// @media (max-aspect-ratio: 256/128) {
			// 	height: calc(var(--frame-height) * 0.9 - 2px);
			// }
			// @media (max-aspect-ratio: 256/140) {
			// 	height: calc(var(--frame-height) * 0.8 - 2px);
			// }
			// max-width: calc(100% - 2px);
			max-width: calc(var(--max-width) - 2px);
			object-fit: contain;
			display: block;
			object-position: center center;
			border: 0.5px solid #9c9c9c;
		}
		.img {
			height: calc(var(--frame-height) - 2px);
			max-width: calc(var(--max-width) - 2px);
			background-size: contain;
			background-repeat: no-repeat;
			border: 0.5px solid #9c9c9c;

			background-position: center left;
		}
	}
</style>
