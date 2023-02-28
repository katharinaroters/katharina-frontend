<script>
	export let left = true,color="#fafafa";
</script>

<div class="arrow" class:left style="color:{color}"/>

<style lang="scss">
	div.arrow {
		width: 1.8vmin;
		height: 1.8vmin;
		box-sizing: border-box;
		transform: translateX(-25%) translateY(-12.5%) rotate(45deg);
		&.left {
			transform: translateX(25%) rotate(225deg);
		}
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			border-width: 0.30vmin 0.30vmin 0 0;
			border-style: solid;
			border-color: currentColor;
			transition: 0.2s ease;
			display: block;
			transform-origin: 100% 0;
		}

		&:after {
			content: '';
			float: left;
			position: relative;
			top: -100%;
			width: 100%;
			height: 100%;
			border-width: 0 0.30vmin 0 0;
			border-style: solid;
			border-color: currentColor;
			transform-origin: 100% 0;
			transition: 0.2s ease;
		}
	}
</style>
