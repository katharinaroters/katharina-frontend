import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import apiUrl from '../../utils/apiUrl';
import qs from 'qs';
import replaceall from 'replaceall';

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

const query = (path: string): string => {
	  return qs.stringify({
		filters: {
		  slug: {
			slug:{
				$eq: path,
			}
		  },
		},
		populate: 'slug',
	  }, {
		encodeValuesOnly: true, // prettify URL
	  });
};

const mainPageRes = async () => {
	const res = await fetch(`${base}/main-page`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});
	return {
		status: res.status,
		body: await res.json()
	};
};

export async function api(request: Request<Locals>, slug: string) {
	const url = replaceall(';', '/', slug);
	if (url === '/') {
		const res = await mainPageRes();
		return res;
	}

	const res = await fetch(`${base}/contents?${query(url.substring(1))}`, {
		method: request.method,
		headers: {
			"Authorization": 'bearer 2cdfa2b063355bf7a4ccca5f93ec2c6f13e3e3d40c6fc454235b5fdffbb4a57fabaea1a00f4e3de8d82cdd9f73650ba9cb283aa29962378cbf61fb55d2215a8065c5f33752b249317ea2f40f21d78802a8b702aa46d657e34153c8f24878bcb1f69122324d7d38eeef9302b49142db1693d9bfb5ca44a0b13cdc9dfe4fbbcdcf',
			'content-type': 'application/json'
		}
	});

	return {
		status: res.status,
		body: await res.json()
	};
}
