<script context="module">
	import { browser } from '$app/env';
	import { currentSlugContent } from '$store';
	export async function load({ page, fetch }) {
		const { slugId, photoId } = page.params;
		if (browser) {
			let slugLoaded = false;
			let currentContent = null;
			currentSlugContent.subscribe((item) => {
				if (item?.slug && item?.slug?.id == slugId) {
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