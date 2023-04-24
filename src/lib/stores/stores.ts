import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createWritableStore = () => {
	const { subscribe, set } = writable(browser ? localStorage.isLoggedIn || '' : '');

	return {
		subscribe,
		set,
		toggle: (value: string) => {
			if (browser) {
				localStorage.isLoggedIn = value;
				set(value);
			}
		}
	};
};

export const isLoggedIn = createWritableStore();
