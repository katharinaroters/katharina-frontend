import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import apiUrl from '../../utils/apiUrl';
import qs from 'qs';

/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = apiUrl;

const query = (slugId: number): string => {
	return qs.stringify({
		_where: { 'slug.id': slugId }
	});
};

export async function api(request: Request<Locals>, slugId: number) {
	const res = await fetch(`${base}/contents?${query(slugId)}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json'
		}
	});
	return {
		status: res.status,
		body: await res.json()
	};
}
