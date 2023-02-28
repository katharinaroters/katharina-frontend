import { writable } from 'svelte/store';

export const menuItems = writable([]);
export const leftText = writable('');
export const navToLeftOpened = writable('');
export const currentSlugContent = writable({});
export const noScroll = writable(false);
export default { menuItems, leftText, currentSlugContent, navToLeftOpened };
