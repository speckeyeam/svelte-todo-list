//import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path'
import adapter from '@sveltejs/adapter-vercel';

const __dirname = path.resolve()
/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
            // default options are shown
            out: 'build',
            precompress: false,
            envPrefix: '',
            polyfill: true
        }),
		alias:{
			$components: path.resolve(__dirname,"./src/lib/components"),
			$server: path.resolve(__dirname,"./src/lib/server"),
			$stores: path.resolve(__dirname,"./src/lib/stores"),
		}
	}
};

export default config;
