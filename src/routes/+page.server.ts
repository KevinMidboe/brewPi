import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

const host = env.BREWLOGGER_HOST;
const sensorsUrl = `${host}/api/sensors`;
const relaysUrl = `${host}/api/relays`;

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
