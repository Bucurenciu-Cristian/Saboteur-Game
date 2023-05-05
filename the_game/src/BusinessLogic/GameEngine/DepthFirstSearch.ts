import { IMatrix } from '@src/Types/DexType';
import { FOT } from '@cards/Actions';
import { Modes } from '@src/enums';
import { isCodeAtIndex } from './IsCodeAtIndex';
import { neighboursCards } from './NeighboursCards';

export function dfs(matrix: IMatrix[][], row: number, column: number, visited: boolean[][]): boolean {
  if (row < 0 || row >= matrix.length || column < 0 || column >= matrix[0].length) {
    return false;
  }

  if (visited[row][column]) {
    return false;
  }
  visited[row][column] = true;
  const { code } = matrix[row][column].Card;

  if (!isCodeAtIndex(matrix, row, column, 6)) {
    return false;
  }
  if (code[8] === Modes.Start) {
    // If we've reached a finish card.
    return true;
  }

  const neighbours = neighboursCards(matrix, row, column);

  for (const neighbour of neighbours) {
    const { coordinate } = neighbour;
    const { row: newRow, column: newCol } = coordinate;
    const { center, adjacent } = neighbour;
    if (center === FOT.T && adjacent === FOT.T) {
      if (dfs(matrix, newRow, newCol, visited)) {
        return true;
      }
    }
  }

  return false;
}

export function isPathToFinish(matrix: IMatrix[][], startRow: number, startColumn: number): boolean {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const visited = new Array(numRows).fill(false).map(() => new Array(numCols).fill(false));

  // Assuming the starting card is at position (0, 0).
  return dfs(matrix, startRow, startColumn, visited);
}

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
    // If we've reached a finish card.
    return true;
  }

  const neighbours = neighboursCards(matrix, row, column);

  return neighbours.some(({ coordinate, center, adjacent }) => {
    const { row: newRow, column: newCol } = coordinate;
    if (center === FOT.T && adjacent === FOT.T) {
      return dfsRefactored(matrix, newRow, newCol, visited);
    }
    return false;
  });
}

function isPathFinishedRefactored(matrix, startRow, startColumn) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const visited = new Array(numRows).fill(false).map(() => new Array(numCols).fill(false));

  // Assuming the starting card is at position (0, 0).
  return dfsRefactored(matrix, startRow, startColumn, visited);
}
