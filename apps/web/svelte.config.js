import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$actions: 'src/lib/actions',
			$components: 'src/lib/components',
			$icons: 'src/lib/icons',
			$modals: 'src/lib/modals',
			$stores: 'src/lib/stores',
			$utils: 'src/lib/utils'
		}
	},

	vitePlugin: {
		inspector: {
			holdMode: true,
			toggleKeyCombo: 'control-shift'
		}
	}
};

export default config;
