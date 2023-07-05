import { Modes } from '@src/enums';
import { isCodeAtIndex } from './IsCodeAtIndex';
import { neighboursCards } from './NeighboursCards';

/**
 * Checks if the code at the specified index in the matrix cell has a specific value.
 * @param matrix
 * @param row
 * @param column
 * @param visited
 */
// You've added this to the code:
// This can be a better version:
function isValid(matrix, row, column, visited) {
  return (
    row >= 0 &&
    row < matrix.length &&
    column >= 0 &&
    column < matrix[0].length &&
    !visited[row][column] &&
    isCodeAtIndex(matrix, row, column, 6)
  );
}

/**
 * This is the refactored version of the dfs function. Version 4
 * @param matrix
 * @param row
 * @param column
 * @param visited
 */
function dfsRefactored(matrix, row, column, visited) {
  if (!isValid(matrix, row, column, visited)) {
    return false;
  }

  visited[row][column] = true;
  const { code } = matrix[row][column].Card;

  if (code[8] === Modes.Start) {
    // If we've reached a start card.
    return true;
  }

  const neighbours = neighboursCards(matrix, row, column);

  return neighbours.some(({ coordinate, center, adjacent }) => {
    const { row: newRow, column: newCol } = coordinate;
    if (center === Modes.True && adjacent === Modes.True) {
      return dfsRefactored(matrix, newRow, newCol, visited);
    }
    return false;
  });
}

export function isPathFinishedRefactored(matrix, startRow, startColumn) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const visited = new Array(numRows).fill(false).map(() => new Array(numCols).fill(false));

  // Assuming the starting card is at position (0, 0).
  return dfsRefactored(matrix, startRow, startColumn, visited);
}
