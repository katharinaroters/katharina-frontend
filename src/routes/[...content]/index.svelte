<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import replaceall from 'replaceall';
	export const load: Load = async ({ page, fetch }) => {
		const res = await fetch(`/${replaceall('/', ';', page.path)}.json`);

		if (res.ok) {
			const content = await res.json();

			return {
				props: { content }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script>
	export let content;

	import { page, navigating } from '$app/stores';
	import Spinner from '$lib/Spinner.svelte';
	import Featured from '$lib/Views/Featured.svelte';
	import Main from '$lib/Views/Main.svelte';
	import PhotoGrid from '$lib/Views/PhotoGrid.svelte';
	import Research from '$lib/Views/Research.svelte';
	import Book from '$lib/Views/Book.svelte';
	import CategoryPreview from '$lib/Views/CategoryPreview.svelte';
	import Pdf from '$lib/Views/Pdf.svelte';
</script>
{#if !content.length && !content.id}
<div class="under-cosntruct">
	Under construction

</div>
{/if}
{#if $navigating === null}
	{#if $page.path === '/'}
		<Main bind:content={content.attributes} />
	{:else}
		{#if content[0]?.contentType === 'photos'}
			<PhotoGrid content={content[0]} />
		{/if}
		{#if content[0]?.contentType === 'featuring'}
			<Featured content={content[0]} />
		{/if}
		{#if content[0]?.contentType === 'research'}
			<Research content={content[0]} />
		{/if}
		{#if content[0]?.contentType === 'book'}
			<Book content={content[0]} />
		{/if}
		<!-- {#if content[0]?.contentType === 'pdf'}
			<Pdf content={content[0]} />
		{/if} -->
		{#if content[0]?.contentType === 'categoryList'}
			<CategoryPreview url={$page.path} content={content[0]} />
		{/if}
	{/if}
{:else}
	<Spinner />
{/if}

<style>
	.under-cosntruct{
		color: var(--heading-color);
	}
</style>