import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// const BREWPI_URL = ''
const BREWPI_URL = 'http://brewpi.schleppe:5000';

export const POST = (async ({ request }) => {
  const { pathname } = new URL(request.url);

  const options = { method: 'POST' };
  return fetch(BREWPI_URL + pathname, options)
    .then((resp) => resp.json())
    .then((response) => json(response));
}) satisfies RequestHandler;
