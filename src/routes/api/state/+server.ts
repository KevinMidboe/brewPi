import { json, RequestEvent } from '@sveltejs/kit';
import { BREWLOGGER_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET = (async (event: RequestEvent) => {
  return fetch(BREWLOGGER_HOST + '/api/regulator')
    .then((resp) => resp.json())
    .then((response) => json(response));
}) satisfies RequestHandler;
