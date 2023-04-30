import { CardsType } from './Types/CardsType';
import { PlayerCard } from './Types/DexType';

export const howManyCardsEachPlayerCanHave = (NoPlayers: number) => {
  switch (NoPlayers) {
    case 3:
    case 4:
    case 5:
      return 6;
    case 6:
    case 7:
      return 5;
    case 8:
    case 9:
    case 10:
      return 4;
    default:
      return 0;
  }
};
export const howManyDwarfs = (NoPlayers: number, Miners: PlayerCard[], Saboteurs: PlayerCard[]) => {
  switch (NoPlayers) {
    case 3:
      return [...Miners.slice(0, 3), ...Saboteurs.slice(0, 1)];
    case 4:
      return [...Miners.slice(0, 4), ...Saboteurs.slice(0, 1)];
    case 5:
      return [...Miners.slice(0, 4), ...Saboteurs.slice(0, 2)];
    case 6:
      return [...Miners.slice(0, 5), ...Saboteurs.slice(0, 2)];
    case 7:
      return [...Miners.slice(0, 5), ...Saboteurs.slice(0, 3)];
    case 8:
      return [...Miners.slice(0, 6), ...Saboteurs.slice(0, 3)];
    case 9:
      return [...Miners, ...Saboteurs.slice(0, 3)];
    case 10:
      return [...Miners, ...Saboteurs];
    default:
      console.error('IMPOSSIBLE');
      console.error('NoPlayers is not between 3 and 10');
      return [...Miners.slice(0, 1), ...Saboteurs.slice(0, 1)];
  }
};
export const helpWithTheRender = (prevImages: CardsType[], nextImages: CardsType[]) => {
  if (prevImages.length !== nextImages.length) {
    return false;
  }
  for (let i = 0; i < prevImages.length; i++) {
    if (prevImages[i] !== nextImages[i]) {
      return false;
    }
  }
  return true;
};
