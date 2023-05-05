import { IMatrix } from '@src/Types/DexType';
import { coordinateType } from './Matrix';
import { neighboursCoordonate } from './NeighboursCoordonate';

function isOccupied(matrix: IMatrix[][], row: number, col: number): boolean {
  return matrix[row][col].Occupied;
}

function isFinalCard(cardsCoord, row: number, col: number): boolean {
  const finalCardsRows = cardsCoord.map((item) => item[0]);
  const finalCardsColumns = cardsCoord.map((item) => item[1]);
  return !finalCardsColumns.includes(col) || !finalCardsRows.includes(row);
}

function addUnoccupiedNeighbors(matrix: IMatrix[][], row: number, col: number, list: coordinateType[]): void {
  const unoccupiedNeighbors = neighboursCoordonate(matrix, row, col, false);
  for (const neighbor of unoccupiedNeighbors) {
    const { coordinate } = neighbor;
    list.push(coordinate);
  }
}

export function findAvailablePath(matrix: IMatrix[][], cardsCoord): coordinateType[] {
  const list: coordinateType[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (isOccupied(matrix, row, col) && isFinalCard(cardsCoord, row, col)) {
        addUnoccupiedNeighbors(matrix, row, col, list);
      }
    }
  }

  const uniqueData = list.filter(
    (item, index, array) => index === array.findIndex(({ column, row }) => row === item.row && column === item.column)
  );
  uniqueData.sort((a, b) => a.row - b.row);

  return uniqueData;
}
