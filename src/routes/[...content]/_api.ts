import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import apiUrl from '../../utils/apiUrl';
import qs from 'qs';
import replaceall from 'replaceall';
import fetcher from '../../utils/fetcher';

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
		populate: '*',
	  }, {
		encodeValuesOnly: true, // prettify URL
	  });
};

const mainPageRes = async () => {
	const res = await fetcher(`/main-page?populate=deep`, {
		method: 'GET',
	});
	console.log(res.data.data)
	return {
		status: res.status,
		body: await res.data.data
	};
};

export async function api(request: Request<Locals>, slug: string) {
	const url = replaceall(';', '/', slug);
	if (url === '/') {
		const res = await mainPageRes();
		return res;
	}

	const res = await fetcher(`/contents?${query(url.substring(1))}`, {
		method: request.method,
	});

	return {
		status: res.status,
		body: await res.data
	};
}
