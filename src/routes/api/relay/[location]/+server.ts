import { json, RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const BREWPI_URL = env.BREWLOGGER_HOST;

export const POST = (async (event: RequestEvent) => {
  const { pathname } = new URL(event.request.url);

  const options = { method: 'POST' };
  return fetch(BREWPI_URL + pathname, options)
    .then((resp) => resp.json())
    .then((response) => json(response));
}) satisfies RequestHandler;
