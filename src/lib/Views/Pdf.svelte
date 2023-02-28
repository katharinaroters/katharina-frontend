<script context="module">
	// export const ssr = false;
</script>

<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	export let content;
	let div;
	// content.featuredPhoto[0].url
	onMount(async () => {
		if (!browser) return false;
		var thePdf = null;
		const url =
			'https://storage.googleapis.com/portfolio-katharina/Hungarian_Cubes_BOOK_597846a73e/Hungarian_Cubes_BOOK_597846a73e.pdf';
		// content.featuredPhoto[0].url;
		// Loaded via <script> tag, create shortcut to access PDF.js exports.
		const pdfjsLib = await import('pdfjs-dist/build/pdf.min');
		// const { PDFPageView } = await import('pdfjs-dist/web/pdf_viewer');

		// The workerSrc property shall be specified.
		pdfjsLib.GlobalWorkerOptions.workerSrc =
			'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/build/pdf.worker.min.js';

		pdfjsLib.getDocument(url).promise.then(function (pdf) {
			thePdf = pdf;

			for (let page = 1; page <= pdf.numPages; page++) {
				let canvas = document.createElement('canvas');
				canvas.className = 'pdf-page-canvas';
				div.appendChild(canvas);
				renderPage(page, canvas);
			}
		});

		function renderPage(pageNumber, canvas) {
			thePdf.getPage(pageNumber).then(function (page) {
				let viewport = page.getViewport({ scale: 1 });
				canvas.height = viewport.height*4;
				canvas.width = viewport.width*4
				canvas.style.width = "400%"
				canvas.style.height = "100%"

				page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
			});
		}
	});
</script>

<div bind:this={div} />

<style>
	canvas,
	div {
		width: 100%;
	}
</style>
