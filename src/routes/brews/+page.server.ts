import brews from '../../brews.json'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return { brews };
};
