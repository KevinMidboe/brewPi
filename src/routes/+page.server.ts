import { BREWLOGGER_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { ISensorDTO } from '../lib/interfaces/ISensorDTO'
import { IRelaysDTO } from '../lib/interfaces/IRelaysDTO';
import { IStateDTO } from '../lib/interfaces/IStateDTO';

const sensorsUrl = `${BREWLOGGER_HOST}/api/sensors`;
const relaysUrl = `${BREWLOGGER_HOST}/api/relays`;
const stateUrl = `${BREWLOGGER_HOST}/api/regulator`;

async function getFromEndpoint(endpoint: string)  {
  return fetch(endpoint)
    .then((resp) => resp.json())
    .catch((error) => {
      console.error('Failed to fetch endpoint:', endpoint);
      console.error(error);
      return null
    });
}

export const load: PageServerLoad = async () => {
  const [sensorsResp, relaysResp, stateResp] = await Promise.all([getFromEndpoint(sensorsUrl), getFromEndpoint(relaysUrl), getFromEndpoint(stateUrl)]);
  const sensors: ISensorDTO[] = sensorsResp?.sensors || []
  const relays: IRelaysDTO[] = relaysResp?.relays || []
  const state: IStateDTO = stateResp

  const inside = sensors.find((sensor: ISensorDTO) => sensor.location === 'inside');
  const outside = sensors.find((sensor: ISensorDTO) => sensor.location === 'outside');

  return {
    inside: inside || null,
    outside: outside || null,
    relays,
    state
  };
};
