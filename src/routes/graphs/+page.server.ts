import {
  fetchTemperature,
  fetchHumidity,
  fetchPressure
} from '../../lib/server/graphQueryGenerator';
import type { PageServerLoad } from './$types';
import type IChartFrame from '../../lib/interfaces/IChartFrame';

const DEFAULT_MINUTES = 10080;

export const load: PageServerLoad = async ({ fetch }) => {
  const to = new Date();
  const from = new Date(to.getTime() - DEFAULT_MINUTES * 60 * 1000);
  const size = 40;

  const temperatureData: IChartFrame[] = await fetchTemperature(from, to, size);
  const humidityData: IChartFrame[] = await fetchHumidity(from, to, size);
  const pressureData: IChartFrame[] = await fetchPressure(from, to, size);

  return {
    temperatureData,
    humidityData,
    pressureData,
    DEFAULT_MINUTES
  };
};
