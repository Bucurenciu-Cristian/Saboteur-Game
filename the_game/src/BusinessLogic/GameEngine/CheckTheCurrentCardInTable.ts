import { IMatrix } from '@src/Types/DexType';
import { NeighboursActions } from '@src/enums';
import { introduceSquare } from '@engine/Matrix';
import { neighboursCards } from './NeighboursCards';

/**
 * Check if the current card is connected to another card
 * @param row
 * @param column
 * @param matrix
 * @param action
 * @param checkOccupied
 */

// eslint-disable-next-line consistent-return
export function checkTheCurrentCardInTable({
  matrix,
  row,
  column,
  action = NeighboursActions.ALL,
  card = undefined,
  simulation = false,
}: {
  matrix: IMatrix[][];
  row: number;
  column: number;
  action?: string;
  card: any;
  simulation: boolean;
}) {
  /* B P N E S W C R
   //0 1 2 3 4 5 6 7
    */
  if (card) {
    matrix[row][column] = introduceSquare(card);
  }
  const { Occupied } = matrix[row][column];
  if (!Occupied) {
    return false; // skip this position if it's not occupied
  }
  const directions = neighboursCards(matrix, row, column);
  const predicate = ({ center, adjacent }) => (center === 'T' && adjacent === 'T') || (center === 'F' && adjacent === 'F');
  const predicateV2 = ({ center, adjacent }) => center === 'T' && adjacent === 'T';
  if (action === NeighboursActions.ALL) {
    const validCombinations = directions.filter(predicate);

    const hasAtLeastOneTrue = validCombinations.some(predicateV2);
    // and no pairs were removed during filtering
    const result = hasAtLeastOneTrue && validCombinations.length === directions.length;

    // Remove the card from the matrix if the result is false
    if (!result) {
      matrix[row][column] = { Card: '#', Occupied: false };
    }
    if (simulation) {
      matrix[row][column] = { Card: '#', Occupied: false };
    }

    return result;
  }
  if (action === NeighboursActions.ONE) return directions.some(predicateV2);
  if (action === NeighboursActions.DIRECTIONS) return directions;
}
