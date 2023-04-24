import { sveltekit } from '@sveltejs/kit/vite';
import injectSocketIO from './socket-handler';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()]
};

export default config;
