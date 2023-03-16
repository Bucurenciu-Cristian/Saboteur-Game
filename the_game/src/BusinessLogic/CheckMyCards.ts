import {
  centerColumn,
  centerRows,
  checkTheCurrentCardInTable,
  findAllEndCardsAlternative,
  InitialMatrix
} from "./GameEngine/Matrix";
import {allTheCards, findTheCard} from "./Logic";
import {TypeGuardOnCards} from "./TypeGuardOnCards";
import {findCardActions, NeighboursActions} from "../constants";
import {stringify} from "../../utils/Helpers";

export function checkMyCards() {
  console.time('CheckingTheCards'); // start the timer
  allTheCards.forEach((obj) => {
    TypeGuardOnCards(obj);
  });
  console.timeEnd('CheckingTheCards'); // end the timer
  /*
    console.info(1, normalPath[0].code);
    const code = normalPath[0].code?.join("");
    normalPath[0].code = changeOrientation(code);
    console.info(2, normalPath[0].code);
  */
  checkTheCurrentCardInTable(centerRows, centerColumn, InitialMatrix);
  console.time('myBlock'); // start the timer
  {
    const startCoordonate = findTheCard(InitialMatrix, findCardActions.Start);
    const finalCardsCoordonate = findTheCard(InitialMatrix, findCardActions.Final);
    finalCardsCoordonate.forEach(([row, column]) => {
      if (checkTheCurrentCardInTable(row, column, InitialMatrix, NeighboursActions.ONE)) {
        /*//I have already the visited part in the InitialMatrix in each of the Squares.
        // const visited: boolean[][] = Array.from({length: InitialMatrix.length}, () => new Array(InitialMatrix[0].length).fill(false));
        // const goldCoord: Coordinate = {row: StartRow, col: lastColumn};
        // const startCode: CharTuple | string = SpecialPath[0].code;

        // if (dfs(InitialMatrix, visited, goldCoord, startCode)) {
        //     console.log("Found the Start card!");
        // } else {
        //     console.log("Could not find the Start card.");
        // }*/
      }
    });
    startCoordonate.forEach(([row, column]) => {
      console.log('Start card found at', row, column)
      const x = findAllEndCardsAlternative(InitialMatrix, row, column);
      console.log('End card found at', x);
    });
  }
  console.timeEnd('myBlock'); // end the timer
}
