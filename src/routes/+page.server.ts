import { BREWLOGGER_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';

const sensorsUrl = `${BREWLOGGER_HOST}/api/sensors`;
const relaysUrl = `${BREWLOGGER_HOST}/api/relays`;

async function getSensors() {
  return fetch(sensorsUrl)
    .then((resp) => resp.json())
    .then((response) => {
      return response?.sensors;
    });
}

async function getRelays() {
  return fetch(relaysUrl)
    .then((resp) => resp.json())
    .then((response) => {
      return response?.relays || [];
    });
}

export const load: PageServerLoad = async () => {
  const [sensors, relays] = await Promise.all([getSensors(), getRelays()]);

  const inside = sensors.find((sensor) => sensor.location === 'inside');
  const outside = sensors.find((sensor) => sensor.location === 'outside');

  return {
    inside: inside || null,
    outside: outside || null,
    relays
  };
};
