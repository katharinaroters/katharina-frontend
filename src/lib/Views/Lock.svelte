<script>
	import { onMount } from 'svelte';

	const password = ['S', 't', 'r', 'o', 'n', 'g', 'p', 'a', 's', 's', '5', '5', '6'];
	let isAuth = 'false';
	onMount(() => {
		if (window.localStorage) isAuth = window.localStorage.getItem('isLoggedIn');
	});

	let value = '';
	const submit = () => {
		if (value.trim() === password.join('')) isAuth = 'true';
		if (window.localStorage) window.localStorage.setItem('isLoggedIn', 'true');
	};
</script>

{#if isAuth !== 'true'}
	<div class="bg">
		<div class="content">
			<input bind:value placeholder="Type password" type="password" />
			<button on:click={submit}>Submit</button>
		</div>
	</div>
{/if}

<style>
	.bg {
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: 90000000;
		background: white;
		color: black;
		display: grid;
		justify-content: center;
		align-content: center;
		align-items: center;
		justify-items: center;
	}
</style>
