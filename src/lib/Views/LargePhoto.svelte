<script>
	import Arrow from '$lib/Arrow.svelte';
	import Spinner from '$lib/Spinner.svelte';

	import { onDestroy, onMount } from 'svelte';
	
	export let currentImage = null,
		prevImage = null,
		nextImage = null,
		slugId,
		altArrows = false;
	$: currentImg = altArrows ? currentImage : currentImage.attributes.formats.large
</script>

<div class="wrapper">
	<div class:altArrows>
		<div class="image">
			<div class="links">
				{#if prevImage !== null}
					<div class="prev">
						<a href="/viewPhoto/{slugId}/{prevImage.id}"
							><div><Arrow color={altArrows && '#323232'} /></div></a
						>
					</div>
				{/if}
				{#if nextImage !== null}
					<div class="next">
						<a href="/viewPhoto/{slugId}/{nextImage.id}"
							><div><Arrow left={false} color={altArrows && '#323232'} /></div></a
						>
					</div>
				{/if}
			</div>
			<div class="img-wr">
				{#if currentImage !== null}
					<!-- {#key currentImage} -->
						<img class:altArrows src={currentImg.url} width={currentImg.width} height={currentImg.height} alt={currentImage.alternativeText} />
					<!-- {/key} -->
				{:else}
					<Spinner />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		max-height: min-content;
		justify-content: start;
		overflow: hidden;
		> div {
			overflow: hidden;
			// width: 100%;
			height: 100%;
			&.altArrows {
				// height: calc(100% - 2px);
				// border: 0.5px solid #9c9c9c;
			}
		}
	}
	.img-wr {
		height: 100%;
	}
	img {
		&:not([src]) {
			visibility: hidden;
		}
		height: 100%;
		width: fit-content;
		max-width: calc(var(--max-width) - 2px);
		object-fit: contain;
		&.altArrows {
			height: calc(100% - 2px);
			border: 0.5px solid #9c9c9c;
		}
		object-position: top center;
	}
	.image {
		position: relative;
		// width: 100%;
		height: 100%;
	}
	.links {
		z-index: 500;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		> div {
			height: 100%;
			width: 50%;
			a {
				display: inline-block;
				position: relative;
				height: 100%;
				width: 100%;
				&:hover {
					> div {
						opacity: 1;
					}
				}
				> div {
					top: 50%;
					opacity: 0;
					transition-property: opacity;
					transition-duration: 200ms;
					font-size: var(--menu-fs);
					transition-timing-function: ease-in-out;
					transform: translateY(-25%);
					position: absolute;
					color: white;
				}
			}
		}

		.prev {
			left: 0;
			position: absolute;
			a {
				div {
					left: 10px;
				}
			}
		}
		.next {
			right: 0;
			position: absolute;
			a {
				div {
					right: 10px;
				}
			}
		}
	}
</style>
