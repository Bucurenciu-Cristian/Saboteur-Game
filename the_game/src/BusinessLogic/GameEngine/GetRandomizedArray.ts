export function getRandomizedArray<T>(array: T[], excludeFirstElement: boolean = false): T[] {
  // Create a copy of the original array and remove the first element if excludeFirstElement is true
  const newArray = excludeFirstElement ? array.slice(1) : array.slice();

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  // Return the shuffled array
  return newArray;
}
