import { Actions } from './Cards/Actions';
import { Dwarfs } from './Cards/Dwarfs';
import { AllGold } from './Cards/Rewards';
import { allPaths } from './Cards/Paths';
import { ICardBasic, IMatrix } from '../Types/DexType';
import { findCardActions } from '../enums';

export const allTheCards: ICardBasic[] = [
  /* dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F */
  ...allPaths,
  ...Dwarfs, // Done 11
  ...Actions, // Done 27
  ...AllGold, // Done 28
];

export function isTheSquareOccupied(matrix: IMatrix[][], row: number, col: number): boolean {
  return matrix[row][col].Occupied;
}

export function findTheCard(matrix: IMatrix[][], action: string): number[][] {
  const cardsFound: number[][] = [];
  for (const [i, row] of matrix.entries()) {
    if (action === findCardActions.Start) {
      if (cardsFound.length === 1) {
        break;
      }
    } else if (action === findCardActions.Final) {
      if (cardsFound.length === 3) {
        break;
      }
    }
    for (const [j, col] of row.entries()) {
      const { Occupied } = col;
      if (!Occupied) {
        continue;
      }
      const { Card } = col;
      const { code } = Card;
      if (action === findCardActions.Start) {
        if (code.length < 9) {
          continue;
        } else if (cardsFound.length > 0) {
          break;
        }
        if (code[8] === 'S') {
          // console.log('Found the start card', i, j);
          cardsFound.push([i, j]);
          break;
        }
      } else if (action === findCardActions.Final) {
        if (code.length < 9) {
          continue;
        }
        if (cardsFound.length >= 3) {
          break;
        }
        if (code[8] === 'R' || code[8] === 'G') {
          // console.log('Found the final card', i, j);
          cardsFound.push([i, j]);
          break;
        }
      }
    }
  }
  return cardsFound;
}
