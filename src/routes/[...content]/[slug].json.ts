import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

export const get: RequestHandler<Locals> = async (request) => {
	const { slug } = request.params;
	const response = await api(request, slug);
	if (response.status === 404) {
		throw new Error('404');
	}
	return response;
};
