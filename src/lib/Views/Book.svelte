<script>
	export let content = {};
</script>

<section>
	<div class="book"><img src={content.attributes.featuredPhoto.data[0].attributes.formats.big} alt="" /></div>
</section>

<style lang="scss">
	section {
		width: 100%;
		.book {
			width: 90%;
			margin: 0 auto;
		}
	}
</style>
