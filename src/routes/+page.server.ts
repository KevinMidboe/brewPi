import { BREWLOGGER_HOST } from '$env/static/private';
import type { PageServerLoad, RequestEvent } from './$types';
import type { ISensorDTO } from '../lib/interfaces/ISensorDTO';
import { IRelaysDTO } from '../lib/interfaces/IRelaysDTO';
import { IStateDTO } from '../lib/interfaces/IStateDTO';

const sensorsUrl = `${BREWLOGGER_HOST}/api/sensors`;
export const prerender = true; // explicitly pre-render

async function fetchSensors(fetch: Fetch): Promise<ISensorDTO[]> {
  return fetch(sensorsUrl)
    .then((resp) => resp.json())
    .then((data) => data?.sensors || [])
    .catch((error) => {
      console.error('failed to fetch sensors.');
      console.error(error);
      return null;
    });
}

// calls internal sveltekit api endpoint.
// this allows unified response in svelte app, even
// though it requires multiple calls to regulator server
async function fetchState(fetch: Fetch) {
  return fetch('/api/state')
    .then((resp) => resp.json())
    .catch((error) => {
      console.error('failed to fetch state');
      console.error(error);
      return null;
    });
}

type Fetch = typeof fetch;
type HandleFetch = {
  event: RequestEvent;
  request: Request;
  fetch: Fetch;
};

export const load: PageServerLoad = async (input: HandleFetch) => {
  const [stateResponse, sensorsResponse] = await Promise.all([
    fetchState(input.fetch),
    fetchSensors(input.fetch)
  ]);
  const sensors: ISensorDTO[] = sensorsResponse || [];
  const relays: IRelaysDTO[] = stateResponse?.relays || [];
  const regulator: IStateDTO = stateResponse?.regulator;

  const inside = sensors.find((sensor: ISensorDTO) => sensor.location === 'inside');
  const outside = sensors.find((sensor: ISensorDTO) => sensor.location === 'outside');

  return {
    inside: inside || null,
    outside: outside || null,
    state: { regulator, relays }
  };
};
