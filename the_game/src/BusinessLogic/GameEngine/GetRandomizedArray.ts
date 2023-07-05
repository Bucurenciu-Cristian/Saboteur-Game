import { fisherYatesShuffle } from '@src/BusinessLogic/FisherYatesShuffle';

export function getRandomizedArray<T>(array: T[], excludeFirstElement: boolean = false): T[] {
  let newArray = excludeFirstElement ? array.slice(1) : array.slice();
  newArray = fisherYatesShuffle(newArray);
  return newArray;
}
