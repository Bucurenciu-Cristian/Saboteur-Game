import { IMatrix } from '@src/Types/DexType';
import { Modes, NeighboursActions } from '@src/enums';
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
  card?: any;
  simulation?: boolean;
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

  const predicateV2 = ({ center, adjacent }) => center === Modes.True && adjacent === Modes.True;
  if (action === NeighboursActions.ALL) {
    const predicate = ({ center, adjacent }) =>
      (center === Modes.True && adjacent === Modes.True) || (center === Modes.False && adjacent === Modes.False);
    const validCombinations = directions.filter(predicate);

    const hasAtLeastOneTrue = validCombinations.some(predicateV2);
    // and no pairs were removed during filtering
    const result = hasAtLeastOneTrue && validCombinations.length === directions.length;

    // Remove the card from the matrix if the result is false or sim is true
    if (!result || simulation) {
      matrix[row][column] = { Card: '#', Occupied: false };
    }
    return result;
  }
  if (action === NeighboursActions.ONE) {
    // console.log('Te salut din acest if', directions.some(predicateV2), directions);
    return directions.some(predicateV2);
  }
}
