import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-netlify';
import { resolve } from 'path';
import adapter from '@sveltejs/adapter-vercel';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		sass: true,
		typescript: true
	}),
	extensions: ['.svelte', '.html'],
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$store: resolve('./src/store/index.js')
				}
			}
		}
	}
};

export default config;
