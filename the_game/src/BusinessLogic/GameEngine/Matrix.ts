import { Matrix, padding } from '@src/variables';
import { ICardBasic, IMatrix } from '@src/Types/DexType';
import { NESWC, normalPath, SpecialPath, StartCard } from '@cards/Paths';
import { fisherYatesShuffle } from '@src/Types/Xstate/Back-end/FisherYatesShuffle';
import { getRandomizedArray } from './GetRandomizedArray';
import { checkTheCurrentCardInTable } from './CheckTheCurrentCardInTable';

const { rows: row, columns: column } = Matrix;
export let InitialMatrix: IMatrix[][] = Array(row)
  .fill(null)
  .map(() =>
    Array(column).fill({
      Card: '#',
      Occupied: false,
    })
  );

export const StartRow = padding ? row - Math.floor(row / 2) - 1 : row - Math.floor(row / 2) - 2;
export const StartColumn = column - (padding ? column - 1 : column - 2);
export const lastColumn = column - (padding ? 2 : 1);

function GiveAndCheckCardTable(matrix: IMatrix[][], row: number, column: number) {
  GiveMeRandomsCardsAroundACard(row, column);
  const beta = checkTheCurrentCardInTable(matrix, row, column);
}

/**
 * DEMO, not Working, the same in every machine.
 */
// InitialMatrix = BasicFullPath(InitialMatrix);
// GiveAndCheckCardTable(InitialMatrix, StartRow - 2, lastColumn - 5);
// GiveAndCheckCardTable(InitialMatrix, StartRow - 2, lastColumn - 2);
// GiveAndCheckCardTable(InitialMatrix, StartRow + 2, lastColumn - 5);
// GiveAndCheckCardTable(InitialMatrix, StartRow + 2, lastColumn - 2);
// GiveAndCheckCardTable(InitialMatrix, StartRow + 2, 1);
// GiveAndCheckCardTable(InitialMatrix, StartRow - 2, 1);

const randomizedFinalCards = getRandomizedArray(SpecialPath, true);

function introduceSquare(card: ICardBasic) {
  return { Card: card, Occupied: true };
}

function InitializeTheMatrixBasics(matrix: IMatrix[][]) {
  matrix[StartRow][StartColumn] = introduceSquare(StartCard);
  matrix[StartRow - 2][lastColumn] = introduceSquare(randomizedFinalCards[1]);
  matrix[StartRow][lastColumn] = introduceSquare(randomizedFinalCards[2]);
  matrix[StartRow + 2][lastColumn] = introduceSquare(randomizedFinalCards[0]);
  return matrix;
}

InitialMatrix = InitializeTheMatrixBasics(InitialMatrix);

function BasicFullPath(matrix: IMatrix[][]) {
  matrix[StartRow][lastColumn - 1] = introduceSquare(NESWC[2]);
  matrix[StartRow][lastColumn - 2] = introduceSquare(NESWC[2]);
  matrix[StartRow][lastColumn - 3] = introduceSquare(NESWC[2]);
  matrix[StartRow][lastColumn - 4] = introduceSquare(NESWC[2]);
  matrix[StartRow][lastColumn - 5] = introduceSquare(NESWC[2]);
  matrix[StartRow][lastColumn - 6] = introduceSquare(NESWC[3]);
  matrix[StartRow][lastColumn - 7] = introduceSquare(NESWC[3]);
  matrix[StartRow][lastColumn - 9] = introduceSquare(NESWC[3]);
  return matrix;
}

function GiveMeRandomsCardsAroundACard(centerRows: number, centerColumn: number) {
  // Testing the Cards connection
  const shuffledNormalPath = fisherYatesShuffle(normalPath);
  const randomCards = shuffledNormalPath.slice(0, 5);

  InitialMatrix[centerRows][centerColumn] = { Card: randomCards[0], Occupied: true };

  // Check if West direction is within bounds
  const West = centerColumn - 1;
  if (West >= 0) {
    InitialMatrix[centerRows][West] = { Card: randomCards[1], Occupied: true };
  }

  // Check if East direction is within bounds
  const East = centerColumn + 1;
  if (East < InitialMatrix[0].length) {
    InitialMatrix[centerRows][East] = { Card: randomCards[2], Occupied: true };
  }

  // Check if North direction is within bounds
  const North = centerRows - 1;
  if (North >= 0) {
    InitialMatrix[North][centerColumn] = { Card: randomCards[3], Occupied: true };
  }

  // Check if South direction is within bounds
  const South = centerRows + 1;
  if (South < InitialMatrix.length) {
    InitialMatrix[South][centerColumn] = { Card: randomCards[4], Occupied: true };
  }
}

export type coordinateType = { row: number; column: number };
/*

export function extendMatrix(matrix: IMatrix[][], direction: conDirections): IMatrix[][] {
  const numRows = direction === conDirections.NORTH || direction === conDirections.SOUTH ? 1 : matrix.length;
  const numCols = direction === conDirections.WEST || direction === conDirections.EAST ? 1 : matrix[0].length;
  const extendedMatrix: IMatrix[][] = [];
  const blankSquare = {
    Card: {
      src: rewardBack,
      code: '0',
    },
    Occupied: false,
  };
  for (let row = 0; row < numRows; row++) {
    extendedMatrix.push([]);
    for (let col = 0; col < numCols; col++) {
      let matrixRow = row;
      let matrixCol = col;
      if (direction === conDirections.NORTH) {
        matrixRow -= 1;
      } else if (direction === conDirections.SOUTH) {
        matrixRow = row - (numRows - matrix.length);
      } else if (direction === conDirections.WEST) {
        matrixCol -= 1;
      } else if (direction === conDirections.EAST) {
        matrixCol = col - (numCols - matrix[0].length);
      }
      if (matrixRow >= 0 && matrixRow < matrix.length && matrixCol >= 0 && matrixCol < matrix[0].length) {
        // Copy existing value to new matrix
        extendedMatrix[row][col] = matrix[matrixRow][matrixCol];
      } else {
        // Fill new cell with default value of 0
        extendedMatrix[row][col] = blankSquare;
      }
    }
    if (direction === conDirections.NORTH) {
      extendedMatrix[row].unshift(blankSquare);
    } else if (direction === conDirections.SOUTH) {
      extendedMatrix[row].push(blankSquare);
    }
  }
  if (direction === conDirections.WEST) {
    extendedMatrix.forEach((row) => row.unshift(blankSquare));
  } else if (direction === conDirections.EAST) {
    extendedMatrix.forEach((row) => row.push(blankSquare));
  }
  return extendedMatrix;
}
*/
