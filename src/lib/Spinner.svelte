<script>
	import { BarLoader } from 'svelte-loading-spinners';
</script>

<div class="wrapper">
	<div class="loader">
		<BarLoader color="#000" />
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		justify-content: center;
		justify-items: center;
		align-content: center;
	}
	.loader {
		position: relative;
		top: -25px;
	}
</style>
