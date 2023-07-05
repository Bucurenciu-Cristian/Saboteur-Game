import { IMatrix } from '@src/Types/DexType';
import { Modes } from '@src/enums';

/**
 * Checks if the code at the specified index in the matrix cell has a specific value.
 *
 * The code array follows this structure: <br>
 * B P N E S W C R <br>
 * 0 1 2 3 4 5 6 7
 *
 * @param {IMatrix[][]} matrix - The matrix containing the data.
 * @param {number} row - The row number in the matrix.
 * @param {number} col - The column number in the matrix.
 * @param {number} codeIndex - The index in the code array to check.
 * @returns {boolean} True if the code at the specified index has the desired value, false otherwise.
 */
export function isCodeAtIndex(matrix: IMatrix[][], row: number, col: number, codeIndex: number): boolean {
  const { Occupied } = matrix[row][col];
  if (Occupied) {
    const { code } = matrix[row][col].Card;
    if (Array.isArray(code)) {
      return code[codeIndex] === Modes.True;
    }
  }
  console.log("You'll not get here");
  return false;
}
