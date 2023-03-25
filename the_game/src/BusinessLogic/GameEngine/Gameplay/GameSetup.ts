// Starting to prepare the round.

// You need to assign a random role to each player. Modes.Miner or Modes.Saboteur.

// You need to assign a random starting player. (Best is the youngest player, if you decide to save the birthday in the db at registration)

// You need to assign the hands to each player. (6 | 5 | 4 cards) and then the rest of the cards to the deck.

// You need to have the deck ready.

// You need to have the discard pile ready.

// You need to have the board ready. The initialMatrix with the four cards in place, start, [gold and 2 rocks] (shuffled).

// Scenarios:
// 1. The player is the miner. He can play a path card or an action card or to discard a card. One of these three options is mandatory.
//

import { howManyCardsEachPlayerCanHave, howManyDwarfs, shuffleCards } from '../../../functions';
import { Miners, Saboteurs } from '../../Cards/Dwarfs';
import { PathsAndActions, SpecialPath } from '../../Cards/Paths';
import { ICardBasic } from '../../../Types/DexType';
import { NoOfPlayers } from '../../Users';

const Dwarfs = howManyDwarfs(NoOfPlayers, Miners, Saboteurs);
const randomDwarfs = shuffleCards(Dwarfs);
const deckOfCardsRandom = shuffleCards(PathsAndActions);
const NoOfCardsInHandPerUser = howManyCardsEachPlayerCanHave(NoOfPlayers);
const graveyard: ICardBasic[] = [];
export const FinalCards = SpecialPath.slice(1);
const randomWinningCards = shuffleCards(FinalCards);
export const GameSetup = {
  randomDwarfs,
  deckOfCardsRandom,
  NoOfCardsInHandPerUser,
  randomWinningCards,
};
