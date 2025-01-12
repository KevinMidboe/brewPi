import { error } from '@sveltejs/kit';
import brews from '../../../brews.json';
import { fetchHumidity, fetchTemperature } from '../../../lib/server/graphQueryGenerator';
import type { PageLoad } from './$types';

async function fetchGraphData(brew) {
  const { date } = brew;
  const start = new Date(date * 1000 - 86400000);
  const end = new Date(date * 1000 + 4838400000);
  const size = 200;

  const [temperature, humidity] = await Promise.all([
    fetchTemperature(start, end, size),
    fetchHumidity(start, end, size)
  ]);

  return { temperature, humidity };
}

export const load = (async ({ params }) => {
  const { date } = params;
  const brew = brews.brews.find((b) => b?.date === date);

  if (!brew) {
    throw error(404, 'Brew not found');
  }

  const graphData = await fetchGraphData(brew);

  return { brew, graphData };
}) satisfies PageLoad;
