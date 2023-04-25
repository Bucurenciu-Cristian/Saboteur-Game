import { fisherYatesShuffle } from '../../Types/Xstate/Back-end/FisherYatesShuffle';

export function getRandomizedArray<T>(array: T[], excludeFirstElement: boolean = false): T[] {
  // Create a copy of the original array and remove the first element if excludeFirstElement is true
  let newArray = excludeFirstElement ? array.slice(1) : array.slice();
  newArray = fisherYatesShuffle(newArray);
  // console.log(JSON.stringify({ newArray }));
  // Return the shuffled array
  return newArray;
}
