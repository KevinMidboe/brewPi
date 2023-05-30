import { json, RequestEvent } from '@sveltejs/kit';
import {
  fetchTemperature,
  fetchHumidity,
  fetchPressure
} from '../../../../lib/server/graphQueryGenerator';
import type { RequestHandler } from './$types';

const UNITS = ['temperature', 'humidity', 'pressure'];
const UNITS_STRING = UNITS.join(', ');

export const POST = (async (event: RequestEvent) => {
  const { request, params } = event;

  const { unit } = params;
  if (!unit || UNITS.indexOf(unit) == -1) {
    return json({
      success: false,
      message: `Unit ${unit} not found. Choose from: ${UNITS_STRING}`
    });
  }

  const bodyData = await request.json();
  let data;
  let { from, to } = bodyData;
  const { size } = bodyData;
  from = new Date(from);
  to = new Date(to);

  if (unit === 'temperature') {
    data = await fetchTemperature(from, to, size);
  } else if (unit === 'humidity') {
    data = await fetchHumidity(from, to, size);
  } else if (unit === 'pressure') {
    data = await fetchPressure(from, to, size);
  }

  return json({ success: true, data });
}) satisfies RequestHandler;
