<script>
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import searchSlugIdByPath from '../../utils/pathSearch';
	import { menuItems, leftText, currentSlugContent } from '$store';

	export let content = {};
	if (content !== null && content?.slug) currentSlugContent.set(content);
	const slugId = searchSlugIdByPath($page.path, $menuItems);
	const isAlmostSquare = (photo) =>
		photo.height == photo.width ||
		Math.abs(parseInt(photo.formats.small.height) - parseInt(photo.formats.small.width)) < 35;
	const isVer = (photo) => photo.height > photo.width && !isAlmostSquare(photo);
	const isHor = (photo) => photo.height < photo.width && !isAlmostSquare(photo);
	$: {
		leftText.set(content.sideText);
	}

	onDestroy((_) => {
		leftText.set(null);
	});
</script>

{#if content.images?.length}
	<section>
		{#each content.images as photo}
			<div>
				<a href="/viewPhoto/{slugId}/{photo.id}"
					><img
						class:sqr={isAlmostSquare(photo)}
						class:ver={isVer(photo)}
						class:hor={isHor(photo)}
						src={photo.formats?.small?.url}
						alt=""
					/></a
				>
			</div>
		{/each}
	</section>
{/if}

<style lang="scss">
	@use 'sass:math';
	section {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(4, auto);
		align-items: center;
		justify-content: start;
		align-content: center;
		justify-items: start;
		padding-bottom: 80px;
		> div {
			a {
				display: block;
				// height: 100%;
				// width: 100%;
				img {
					&.hor {
						width: var(--img-size);
						height: calc(var(--img-size) * 2 / 3);
					}
					&.sqr {
						width: var(--img-size);
						height: var(--img-size);
						// object-fit: contain;
						// object-position: right;
					}
					&.ver {
						height: var(--img-size);
						width: calc(var(--img-size) * 2 / 3);
					}
					margin: 0;

					display: block;
					object-fit: cover;
				}
			}
		}
	}
</style>
