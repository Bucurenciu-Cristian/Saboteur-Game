import { assign, createMachine } from 'xstate';
import { howManyCardsEachPlayerCanHave, howManyDwarfs } from '../../../functions';
import { Miners, Saboteurs } from '../../../BusinessLogic/Cards/Dwarfs';
import { PathsAndActions } from '../../../BusinessLogic/Cards/Paths';
import { InitialMatrix } from '../../../BusinessLogic/GameEngine/Matrix';
import { ICardBasic, IMatrix, PlayerCard } from '../../DexType';

interface Player {
  name: string;
  role?: PlayerCard;
  Hand?: ICardBasic[];
}

interface Context {
  players: Player[];
  deck: ICardBasic[];
  roleCards: PlayerCard[];
  matrix: IMatrix[][];
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
  const shuffledCards = context.roleCards.sort(() => Math.random() - 0.5);
  const playersWithRole = context.players.map((player, index) => ({
    name: player.name,
    role: shuffledCards[index],
  }));

  return {
    ...context,
    players: playersWithRole,
  };
});

const placeStartAndFinishCards = assign((context: Context, event) => {
  const shuffledCards = context.deck.sort(() => Math.random() - 0.5);
  return {
    ...context,
    deck: shuffledCards,
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
    Hand: giveMeCards(howManyCardsInHand, context.deck),
  }));
  console.log('Preparation complete');
  return {
    ...context,
    players: playersWithCards,
  };
});

// const hasEnoughPlayers: (context, event) => boolean = (context, event) => context.players.length >= 3;

const preparationMachine = createMachine<Context>(
  {
    predictableActionArguments: true,
    id: 'saboteurPreparation',
    context: {
      players: [{ name: 'Player 1' }, { name: 'Player 2' }, { name: 'Player 3' }],
      deck: PathsAndActions,
      roleCards: [],
      matrix: InitialMatrix,
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
            target: 'placeStartAndFinishCards',
            actions: 'shuffleAndDealDwarfCards',
          },
        },
      },
      placeStartAndFinishCards: {
        after: {
          100: {
            target: 'shuffleAndDealPathAndActionCards',
            actions: 'placeStartAndFinishCards',
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
        },
        type: 'final',
      },
    },
  },
  {
    actions: {
      determineDwarfRoles,
      shuffleAndDealDwarfCards,
      placeStartAndFinishCards,
      shuffleAndDealPathAndActionCards,
    },
    guards: {
      // hasEnoughPlayers,
    },
  }
);

export default preparationMachine;
