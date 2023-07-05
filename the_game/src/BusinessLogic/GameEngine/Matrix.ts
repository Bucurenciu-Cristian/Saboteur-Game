import { Matrix, padding } from '@src/variables';
import { ICardBasic, IMatrix } from '@src/Types/DexType';
import { normalPath, SpecialPath, StartCard } from '@cards/Paths';
import { fisherYatesShuffle } from '@src/BusinessLogic/FisherYatesShuffle';
import { getRandomizedArray } from './GetRandomizedArray';

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

const randomizedFinalCards = getRandomizedArray(SpecialPath, true);

export function introduceSquare(card: ICardBasic) {
  return { Card: card, Occupied: true };
}

function InitializeTheMatrixBasics(matrix: IMatrix[][]) {
  matrix[StartRow][StartColumn] = introduceSquare(StartCard);
  matrix[StartRow - 2][lastColumn] = introduceSquare(randomizedFinalCards[1]);
  matrix[StartRow][lastColumn] = introduceSquare(randomizedFinalCards[2]);
  matrix[StartRow + 2][lastColumn] = introduceSquare(randomizedFinalCards[0]);
  /* matrix[StartRow - 2][lastColumn - 2] = introduceSquare(NESWC[0]);
  matrix[StartRow][lastColumn - 2] = introduceSquare(NESWC[1]);
  matrix[StartRow + 2][lastColumn - 2] = introduceSquare(NESWC[2]);
  matrix[StartRow - 2][lastColumn - 4] = introduceSquare(NESWC[0]);
  matrix[StartRow][lastColumn - 4] = introduceSquare(NESWC[0]);
  matrix[StartRow + 2][lastColumn - 4] = introduceSquare(NESWC[0]);
  */
  return matrix;
}

InitialMatrix = InitializeTheMatrixBasics(InitialMatrix);

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
