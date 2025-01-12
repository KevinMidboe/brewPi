import { json, RequestEvent } from '@sveltejs/kit';
import { BREWLOGGER_HOST } from '$env/static/private';
import type { RequestHandler } from './$types';
import { IRelaysDTO } from '../../../lib/interfaces/IRelaysDTO';

async function fetchRegulator(): Promise<Response | IRelaysDTO[]> {
  return fetch(BREWLOGGER_HOST + '/api/regulator').then((resp) => resp.json());
}

async function fetchRelays(): Promise<Response | IRelaysDTO[]> {
  return fetch(BREWLOGGER_HOST + '/api/relays')
    .then((resp) => resp.json())
    .then((data) => data?.relays || []);
}

export const GET = (async () => {
  const [regulatorState, relaysState] = await Promise.all([fetchRegulator(), fetchRelays()]);
  return json({ regulator: regulatorState, relays: relaysState });
}) satisfies RequestHandler;
