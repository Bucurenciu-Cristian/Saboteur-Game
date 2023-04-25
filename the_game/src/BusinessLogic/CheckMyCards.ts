import { allTheCards } from './Logic';
import { TypeGuardOnCards } from './TypeGuardOnCards';
import { ICardBasic } from '../Types/DexType';

export function checkMyCards() {
  console.time('CheckingTheCards'); // start the timer
  allTheCards.forEach((obj) => {
    TypeGuardOnCards(obj);
  });
  console.timeEnd('CheckingTheCards'); // end the timer
  /*
  console.time('StartAndFinish'); // start the timer
  {
      const startCoordonate = findTheCard(InitialMatrix, findCardActions.Start);
      const finalCardsCoordonate = findTheCard(InitialMatrix, findCardActions.Final);
      finalCardsCoordonate.forEach(([row, column]) => {
          if (checkTheCurrentCardInTable(InitialMatrix, row, column, NeighboursActions.ONE)) {
              console.log("Start DFS");
              const x = isPathToFinish(InitialMatrix, row, column);
              //TODO Handle the result of the DFS
              if (x) console.log("Path to finish found");
              else console.log("Path to finish not found");
              console.log("END DFS");
          }
      });
      startCoordonate.forEach(([row, column]) => {
          //TODO: If you want to do something from the start, here you can do it.
      });

      //You'll do this after every iteration of the game. At the end of each user's turn.
      const availablePaths = findAvailablePath(InitialMatrix);
      console.log(availablePaths);
  }
  console.timeEnd('StartAndFinish'); // end the timer

  const [found, coordinates] = findOccupiedEdge(InitialMatrix);
  if (found && coordinates !== false && coordinates !== undefined && coordinates !== null && coordinates !== true) {
      console.log('Found the occupied edge at', coordinates);

  }
  */
  console.time('GameSetup');
  {
  }
  console.timeEnd('GameSetup');
}

const giveMeTheCode = (cards: ICardBasic[]) => cards.map((card) => card.code);
