import { json, RequestEvent } from '@sveltejs/kit';
import { BREWLOGGER_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST = (async (event: RequestEvent) => {
  const { pathname } = new URL(event.request.url);

  const options = { method: 'POST' };
  return fetch(BREWLOGGER_HOST + pathname, options)
    .then((resp) => resp.json())
    .then((response) => json(response));
}) satisfies RequestHandler;
