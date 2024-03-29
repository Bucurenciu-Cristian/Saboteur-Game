import { assign, createMachine } from 'xstate';
import { howManyCardsEachPlayerCanHave, howManyDwarfs } from '@src/functions';
import { Miners, Saboteurs } from '@cards/Dwarfs';
import { PathsAndActions } from '@cards/Paths';
import { InitialMatrix } from '@engine/Matrix';
import { ICardBasic, IMatrix, PlayerCard } from '@src/Types/DexType';
import { fisherYatesShuffle } from '@src/BusinessLogic/FisherYatesShuffle';

interface Player {
  name: string;
  role?: PlayerCard;
  hand?: ICardBasic[];
  blocks?: ICardBasic[];
}

interface Context {
  players: Player[];
  deck: ICardBasic[];
  roleCards: PlayerCard[];
  matrix: IMatrix[][];
  currentPlayer: number;
}

const determineDwarfRoles = assign((context: Context, event) => {
  const NoPlayers = context.players.length;
  const roleCards = howManyDwarfs(NoPlayers, Miners, Saboteurs);
  return {
    ...context,
    roleCards,
  };
});

const shuffleAndDealDwarfCards = assign((context: Context, event) => {
  const shuffledCards = fisherYatesShuffle(context.roleCards);
  const playersWithRole = context.players.map((player, index) => ({
    ...player,
    role: shuffledCards[index],
    playerIdGame: index,
  }));
  return {
    ...context,
    players: playersWithRole,
  };
});

const shuffleDeck = assign((context: Context, event) => {
  const deck = [...PathsAndActions];
  // const matrix = [...InitialMatrix];
  const matrix = JSON.parse(JSON.stringify(InitialMatrix));

  console.log('matrix', matrix[3][2]);
  const shuffledCards = fisherYatesShuffle(deck);
  return {
    ...context,
    deck: shuffledCards,
    matrix,
  };
});

const shuffleAndDealPathAndActionCards = assign((context: Context, event) => {
  const howManyCardsInHand = howManyCardsEachPlayerCanHave(context.players.length);
  const giveMeCards = (howManyCards: number, cards: any[]) => {
    const cardsToGive = [];
    for (let i = 0; i < howManyCards; i++) {
      cardsToGive.push(cards.pop());
    }
    return cardsToGive;
  };
  const playersWithCards = context.players.map((player) => ({
    ...player,
    hand: giveMeCards(howManyCardsInHand, context.deck),
    blocks: [],
  }));

  console.log('Preparation complete');
  return {
    ...context,
    players: playersWithCards,
    currentPlayer: 0,
  };
});

// const hasEnoughPlayers: (context, event) => boolean = (context, event) => context.players.length >= 3;

const preparationMachine = createMachine<Context>(
  {
    predictableActionArguments: true,
    id: 'saboteurPreparation',
    context: {
      players: [],
      deck: [],
      roleCards: [],
      matrix: [],
      currentPlayer: -1,
    },
    initial: 'determineDwarfRoles',
    states: {
      determineDwarfRoles: {
        after: {
          100: {
            target: 'shuffleAndDealDwarfCards',
            actions: 'determineDwarfRoles',
          },
        },
      },
      shuffleAndDealDwarfCards: {
        after: {
          100: {
            target: 'shuffleDeck',
            actions: 'shuffleAndDealDwarfCards',
          },
        },
      },
      shuffleDeck: {
        after: {
          100: {
            target: 'shuffleAndDealPathAndActionCards',
            actions: 'shuffleDeck',
          },
        },
      },
      shuffleAndDealPathAndActionCards: {
        after: {
          100: {
            target: 'preparationComplete',
            actions: 'shuffleAndDealPathAndActionCards',
          },
        },
      },
      preparationComplete: {
        data: {
          matrix: (context: Context) => context.matrix,
          players: (context: Context) => context.players,
          deck: (context: Context) => context.deck,
          currentPlayer: (context: Context) => context.currentPlayer,
          discardPile: () => [],
        },
        type: 'final',
      },
    },
  },
  {
    actions: {
      determineDwarfRoles,
      shuffleAndDealDwarfCards,
      shuffleDeck,
      shuffleAndDealPathAndActionCards,
    },
    guards: {},
  }
);

export default preparationMachine;
