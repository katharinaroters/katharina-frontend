<script context="module">
	import { browser } from '$app/env';
	import { currentSlugContent } from '$store';
	export async function load({ page, fetch }) {
		const { slugId, photoId } = page.params;
		if (browser) {
			let slugLoaded = false;
			let currentContent = null;
			currentSlugContent.subscribe((item) => {
				if (item?.attributes.slug && item?.attributes.slug?.data.id == slugId) {
					slugLoaded = true;
				} else slugLoaded = false;

				if (slugLoaded) currentContent = item;
			});
			if (currentContent !== null)
				return {
					props: {
						content: [currentContent],
						photoId,
						slugId
					}
				};
		}
		const res = await fetch(`/viewPhoto/${slugId}.json`);
		if (res.ok) {
			const content = await res.json();
			return {
				props: {
					content,
					photoId,
					slugId
				}
			};
		}
		return {
			status: res.status,
			error: new Error(`Could not load photo`)
		};
	}
</script>

<script>
	import { navigating } from '$app/stores';
	import Spinner from '$lib/Spinner.svelte';
	import BigCarousel from '$lib/Views/BigCarousel.svelte';
	import LargePhoto from '$lib/Views/LargePhoto.svelte';
	import { navToLeftOpened, noScroll } from '../../../../store';
	import { onDestroy, onMount } from 'svelte';

	export let content = [],
		photoId,
		slugId;

	if (!$currentSlugContent?.attributes?.slug?.data || $currentSlugContent?.attributes.slug?.data.id !== slugId)
		currentSlugContent.set(content[0]);

	let images = $currentSlugContent?.attributes.images;
	let currentImage = null;
	$: prevImage = null;
	$: currentIndex = null;
	let nextImage = null;
	$: {
		locateImages(photoId);
	}
	const locateImages = (photo_id) => {
		if (images && images.length) {
			for (let index = 0; index < images.length; index++) {
				const element = images[index];
				if (parseInt(element.id) === parseInt(photo_id)) {
					currentImage = element;
					currentIndex = index;

					if (images.length !== index + 1) nextImage = images[index + 1];
					else nextImage = null;
					if (index - 1 !== -1) prevImage = images[index - 1];
					else prevImage = null;

					break;
				} else currentImage = null;
			}
		}
	};
	$: isBook = $currentSlugContent.attributes.contentType == 'book';
	navToLeftOpened.set('photography');
	onMount((_) => {
		noScroll.set(true);
	});
	onDestroy((_) => {
		noScroll.set(false);
		if (!$navigating?.to?.path?.includes('viewPhoto')) navToLeftOpened.set('');
	});
</script>

{#if isBook}
	<div class="wrapper">
		<div class="photo" class:hasText={$currentSlugContent.attributes.contentType == 'book'}>
			<BigCarousel
				{images}
				{slugId}
				bind:currentIndex
				bind:currentImage
				bind:nextImage
				bind:prevImage
			/>
		</div>
	</div>
{:else if images && $navigating === null}
	<div class="wrapper">
		<div class="photo" class:hasText={$currentSlugContent.attributes.contentType == 'book'}>
			<LargePhoto
				bind:altArrows={isBook}
				bind:currentImage
				bind:nextImage
				bind:prevImage
				{slugId}
			/>
		</div>
		<!-- {#if prevImage === null && $currentSlugContent.attributes.contentType == 'book'}
							<div>
								{@html converter.makeHtml($currentSlugContent.text)}
							</div>
						{/if} -->
	</div>
{:else}
	<Spinner />
{/if}

<style lang="scss">
	.wrapper {
		height: 100%;
		max-width: var(--max-width);
		.photo {
			height: 100%;
			&.hasText {
				height: min-content;
			}
		}
	}
</style>
