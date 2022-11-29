import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path'


const __dirname = path.resolve()
/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias:{
			$components: path.resolve(__dirname,"./src/lib/components"),
			$server: path.resolve(__dirname,"./src/lib/server"),
		}
	}
};

export default config;
