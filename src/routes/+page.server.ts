import { getLatestInsideReadings, getLatestOutsideReadings } from '$lib/graphQueryGenerator';
import type { PageServerLoad } from './$types';

let DEFAULT_MINUTES = 14400;
const host = 'http://brewpi.schleppe:5000';
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
  console.log('got sensors and relays');
  console.log(sensors, relays);

  const inside = sensors.find((sensor) => sensor.location === 'inside');
  const outside = sensors.find((sensor) => sensor.location === 'outside');

  return {
    inside: inside || null,
    outside: outside || null,
    relays
  };
};
