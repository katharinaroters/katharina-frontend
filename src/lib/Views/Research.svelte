<script>
	import Arrow from '$lib/Arrow.svelte';

	export let content;
	import showdown from 'showdown';
	import { onMount } from 'svelte';
	const converter = new showdown.Converter();
	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const handleNextClick = () => {
		carousel.goToNext();
	};
	const handlePrevClick = () => {
		carousel.goToPrev();
	};
</script>

{#if content.text}
	<section class="text">
		<div>
			{@html converter.makeHtml(content.text)}
		</div>
		<div class="carousel-wr">
			<svelte:component
				this={Carousel}
				bind:this={carousel}
				autoplay={false}
				arrows={true}
				dots={false}
				let:showNextPage
				let:showPrevPage
			>
				<div slot="prev">
					<div class="arrow" on:click={handlePrevClick}>
						<Arrow color="#323232" />
					</div>
				</div>
				<div slot="next">
					<div class="arrow right" on:click={handleNextClick}>
						<Arrow left={false} color="#323232" />
					</div>
				</div>
				{#each content.images as photo}
					<div class="photo">
						<img src={photo.formats?.large?.url} alt="" />
					</div>
				{/each}
			</svelte:component>
		</div>
		<br />
		<div>
			{@html converter.makeHtml(content.sideText)}
		</div>
	</section>
{/if}

<style lang="scss">
	section.text {
		> div {
			max-width: var(--max-width);
		}
		.arrow {
			cursor: pointer;
			position: absolute;
			width: 50%;
			height: 98%;
			z-index: 499;

			left: 0;
			&:hover {
				> :global(div) {
					opacity: 1;
				}
			}
			> :global(div) {
				opacity: 0;
				transition: opacity 0.1s ease-in-out;

				position: absolute;
				z-index: 500;
				top: calc(50% - 0.9vmin);
				left: 10px;
			}
			&.right {
				left: unset;
				right: 0;
				> :global(div) {
					left: unset;
					right: 10px;
				}
			}
		}
		:global(p) {
			margin-top: 0;
		}
		:global(a) {
			text-decoration: underline;
		}
		:global(img) {
			width: 100%;
		}
		.carousel-wr {
			width: 100%;
			height: fit-content;
			img {
				width: calc(100% - 2px);
				object-fit: contain;
				object-position: center;
				border: 0.5px solid #9c9c9c;
			}
		}
	}
</style>
