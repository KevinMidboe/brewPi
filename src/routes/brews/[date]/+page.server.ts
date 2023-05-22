import { error } from '@sveltejs/kit';
import brews from '../../../brews.json';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
  const { date } = params;
  const brew = brews.find((b) => b?.date === date);

  if (!brew) {
    throw error(404, 'Brew not found');
  }

  return { brew };
}) satisfies PageLoad;
