import { IMatrix } from '@src/Types/DexType';
import { coordinateType } from './Matrix';
import { neighboursCoordonate } from './NeighboursCoordonate';

/**
 * Currently, it is functioning, but I believe there is room for improvement as it may not be the optimal solution.
 * Find the available paths
 * @param matrix
 * @param cardsCoord
 */
export function findAvailablePath(matrix: IMatrix[][], cardsCoord) {
  // Itereaza prin toata matricea si vezi cand dai de Occupied, du-te in vecini care nu sunt ocupati si verifica care cale este libera, daca gasesti, adauga coordonatele in lista.
  const list: coordinateType[] = [];
  const finalCardsRows = cardsCoord.map((item) => item[0]);
  const finalCardsColumns = cardsCoord.map((item) => item[1]);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].Occupied) {
        if (!finalCardsColumns.includes(col) || !finalCardsRows.includes(row)) {
          const VeciniNeocupati = neighboursCoordonate(matrix, row, col, false);
          if (VeciniNeocupati.length > 0) {
            for (const veciniNeocupatiElement of VeciniNeocupati) {
              const { coordinate } = veciniNeocupatiElement;
              list.push(coordinate);
            }
          }
        }
      }
    }
  }
  const uniqueData = list.filter(
    (item, index, array) => index === array.findIndex(({ column, row }) => row === item.row && column === item.column)
  );
  uniqueData.sort((a, b) => a.row - b.row);
  return uniqueData;
}
