<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<a href="https://storage.googleapis.com/portfolio-katharina/CV_web_2_65cea0ed22/CV_web_2_65cea0ed22.pdf" target="_blank" rel="noopener noreferrer">CV</a>
</div>

<style>
	.content {
		width: 100%;
		/* max-width: var(--column-width); */
		/* margin: var(--column-margin-top) auto 0 auto; */
	}
</style>
