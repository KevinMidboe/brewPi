import { fetchTemperature, fetchHumidity, fetchPressure } from '$lib/graphQueryGenerator';
import type { PageServerLoad } from './$types';
import type IChartFrame from '$lib/interfaces/IChartFrame';

let DEFAULT_MINUTES = 10080;

export const load: PageServerLoad = async ({ fetch }) => {
  const temperatureData: IChartFrame[] = await getTemp(DEFAULT_MINUTES, fetch);
  const humidityData: IChartFrame[] = await getHumidity(DEFAULT_MINUTES, fetch);
  const pressureData: IChartFrame[] = await getPressure(DEFAULT_MINUTES, fetch);

  return {
    temperatureData,
    humidityData,
    pressureData,
    DEFAULT_MINUTES
  };
};

function getSensor(func: Function, minutes: number, fetch: Function) {
  const from: Date = new Date();
  const to = new Date(from.getTime() - minutes * 60 * 1000);
  const size = 40;

  return func(from, to, size, fetch);
}

function getTemp(minutes: number, fetch: Function): IChartFrame[] {
  return getSensor(fetchTemperature, minutes, fetch);
}

function getHumidity(minutes: number, fetch: Function): IChartFrame[] {
  return getSensor(fetchHumidity, minutes, fetch);
}

function getPressure(minutes: number, fetch: Function): IChartFrame[] {
  return getSensor(fetchPressure, minutes, fetch);
}
