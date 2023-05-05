import { Actions } from '@cards/Actions';
import { Dwarfs } from '@cards/Dwarfs';
import { AllGold } from '@cards/Rewards';
import { allPaths } from '@cards/Paths';
import { ICardBasic, IMatrix } from '../Types/DexType';
import { findCardActions, Modes } from '../enums';

export const allTheCards: ICardBasic[] = [
  /* dex.N.T, dex.E.T, dex.S.T, dex.W.T, dex.C.T, dex.R.F */
  ...allPaths,
  ...Dwarfs, // Done 11
  ...Actions, // Done 27
  ...AllGold, // Done 28
];

function isStartCard(code: string): boolean {
  return code.length >= 9 && code[8] === Modes.Start;
}

function isFinalCard(code: string): boolean {
  return code.length >= 9 && (code[8] === Modes.Rock || code[8] === Modes.Gold);
}

function shouldStopFindingCards(action: string, cardsFound: number[][]): boolean {
  return (
    (action === findCardActions.Start && cardsFound.length === 1) || (action === findCardActions.Final && cardsFound.length === 3)
  );
}

export function findTheCard(matrix: IMatrix[][], action: string): number[][] {
  const cardsFound: number[][] = [];

  for (const [i, row] of matrix.entries()) {
    if (shouldStopFindingCards(action, cardsFound)) {
      break;
    }

    for (const [j, col] of row.entries()) {
      const { Occupied, Card } = col;

      if (!Occupied) {
        continue;
      }

      const { code } = Card;

      if (action === findCardActions.Start && isStartCard(code)) {
        cardsFound.push([i, j]);
        break;
      } else if (action === findCardActions.Final && isFinalCard(code)) {
        cardsFound.push([i, j]);
        break;
      }
    }
  }

  return cardsFound;
}
